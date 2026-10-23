package com.betha.plataforma.bethacon.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHttpHeaders;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.UriComponentsBuilder;

import javax.websocket.ContainerProvider;
import javax.websocket.WebSocketContainer;
import java.io.IOException;
import java.net.URI;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

@Component
public class NotificationsRelayHandler extends TextWebSocketHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(NotificationsRelayHandler.class);
    private static final int MAX_MESSAGE_SIZE = 512 * 1024;
    private static final int SEND_TIME_LIMIT_MS = 10_000;
    private static final long CONNECT_TIMEOUT_SECONDS = 10;

    private final StandardWebSocketClient client;
    private final String upstreamUrl;
    private final Map<String, WebSocketSession> upstreamSessions = new ConcurrentHashMap<>();

    public NotificationsRelayHandler(final @Value("${betha.services.notifications-ws}") String upstreamUrl) {
        final WebSocketContainer container = ContainerProvider.getWebSocketContainer();
        container.setDefaultMaxTextMessageBufferSize(MAX_MESSAGE_SIZE);
        this.client = new StandardWebSocketClient(container);
        this.upstreamUrl = upstreamUrl;
    }

    @Override
    public void afterConnectionEstablished(final WebSocketSession browserSession) {
        final WebSocketSession browser =
            new ConcurrentWebSocketSessionDecorator(browserSession, SEND_TIME_LIMIT_MS, MAX_MESSAGE_SIZE);
        final String accessToken =
            (String) browserSession.getAttributes().get(AuthenticatedSessionHandshakeInterceptor.ACCESS_TOKEN_ATTRIBUTE);
        final URI uri = UriComponentsBuilder.fromUriString(upstreamUrl)
            .queryParam("access_token", accessToken)
            .build()
            .encode()
            .toUri();

        try {
            final WebSocketSession upstream = client
                .doHandshake(new UpstreamHandler(browser), new WebSocketHttpHeaders(), uri)
                .get(CONNECT_TIMEOUT_SECONDS, TimeUnit.SECONDS);
            upstreamSessions.put(browserSession.getId(), upstream);
            if (!browserSession.isOpen()) {
                closeQuietly(upstreamSessions.remove(browserSession.getId()), CloseStatus.NORMAL);
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            closeQuietly(browserSession, CloseStatus.SERVER_ERROR);
        } catch (ExecutionException | TimeoutException e) {
            LOGGER.warn(
                    "Não foi possível conectar ao canal de notificações da Plataforma ({})",
                    e instanceof TimeoutException ? "tempo esgotado" : "falha no handshake"
            );
            closeQuietly(browserSession, CloseStatus.SERVER_ERROR);
        }
    }

    @Override
    protected void handleTextMessage(final WebSocketSession browserSession, final TextMessage message) throws IOException {
        final WebSocketSession upstream = upstreamSessions.get(browserSession.getId());
        if (upstream != null && upstream.isOpen()) {
            upstream.sendMessage(message);
        }
    }

    @Override
    public void handleTransportError(final WebSocketSession browserSession, final Throwable exception) {
        LOGGER.debug("Falha no WebSocket de notificações do navegador");
        closeQuietly(browserSession, CloseStatus.SERVER_ERROR);
    }

    @Override
    public void afterConnectionClosed(final WebSocketSession browserSession, final CloseStatus status) {
        closeQuietly(upstreamSessions.remove(browserSession.getId()), CloseStatus.NORMAL);
    }

    private static void closeQuietly(final WebSocketSession session, final CloseStatus status) {
        if (session == null || !session.isOpen()) {
            return;
        }
        try {
            session.close(status);
        } catch (IOException e) {
            LOGGER.debug("Falha ao fechar WebSocket de notificações");
        }
    }

    private static final class UpstreamHandler extends TextWebSocketHandler {

        private final WebSocketSession browser;

        private UpstreamHandler(final WebSocketSession browser) {
            this.browser = browser;
        }

        @Override
        protected void handleTextMessage(final WebSocketSession upstream, final TextMessage message) throws IOException {
            if (browser.isOpen()) {
                browser.sendMessage(message);
            }
        }

        @Override
        public void afterConnectionClosed(final WebSocketSession upstream, final CloseStatus status) {
            LOGGER.debug("Canal de notificações da Plataforma encerrado: {}", status);
            closeQuietly(browser, CloseStatus.GOING_AWAY);
        }
    }
}
