package com.betha.plataforma.bethacon.websocket;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.OauthToken;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;
import java.util.Optional;

/**
 * Só aceita o handshake de WebSocket quando a sessão HTTP possui um token válido. O token fica nos
 * atributos da conexão (lado servidor) para o relay abrir a conexão com a Plataforma.
 */
@Component
public class AuthenticatedSessionHandshakeInterceptor implements HandshakeInterceptor {

    static final String ACCESS_TOKEN_ATTRIBUTE = "betha.notifications.access-token";

    private final BethaAuthenticationHandler authenticationHandler;

    public AuthenticatedSessionHandshakeInterceptor(final BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    @Override
    public boolean beforeHandshake(final ServerHttpRequest request,
                                   final ServerHttpResponse response,
                                   final WebSocketHandler handler,
                                   final Map<String, Object> attributes) {
        if (!(request instanceof ServletServerHttpRequest)) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return false;
        }
        final Optional<OauthToken> token =
            authenticationHandler.getValidToken(((ServletServerHttpRequest) request).getServletRequest());
        if (!token.isPresent()) {
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return false;
        }
        attributes.put(ACCESS_TOKEN_ATTRIBUTE, token.get().getAccessToken());
        return true;
    }

    @Override
    public void afterHandshake(final ServerHttpRequest request,
                               final ServerHttpResponse response,
                               final WebSocketHandler handler,
                               final Exception exception) {
    }
}
