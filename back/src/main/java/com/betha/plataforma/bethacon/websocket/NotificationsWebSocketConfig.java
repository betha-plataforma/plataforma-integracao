package com.betha.plataforma.bethacon.websocket;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

@Configuration
@EnableWebSocket
public class NotificationsWebSocketConfig implements WebSocketConfigurer {

    private final NotificationsRelayHandler relayHandler;
    private final AuthenticatedSessionHandshakeInterceptor handshakeInterceptor;
    private final String appOrigin;

    public NotificationsWebSocketConfig(final NotificationsRelayHandler relayHandler,
                                        final AuthenticatedSessionHandshakeInterceptor handshakeInterceptor,
                                        final @Value("${betha.auth.oauth.client.redirect}") String appUrl) {
        this.relayHandler = relayHandler;
        this.handshakeInterceptor = handshakeInterceptor;
        this.appOrigin = origin(appUrl);
    }

    @Override
    public void registerWebSocketHandlers(final WebSocketHandlerRegistry registry) {
        registry.addHandler(relayHandler, "/api/betha/notificacoes/ws")
            .addInterceptors(handshakeInterceptor)
            // Somente a origem do frontend pode abrir o canal com o cookie de sessão.
            .setAllowedOrigins(appOrigin);
    }

    private static String origin(final String url) {
        final UriComponents uri = UriComponentsBuilder.fromHttpUrl(url).build();
        return uri.getScheme() + "://" + uri.getHost() + (uri.getPort() == -1 ? "" : ":" + uri.getPort());
    }
}
