package com.betha.plataforma.bethacon.rest;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.OauthToken;
import com.betha.plataforma.bethacon.provider.BethaPlatformClient;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Proxy usado pelo bth-notificacoes (propriedade notificacoesApi). O componente envia um token fictício;
 * a chamada é repassada à API de notificações com o token da sessão. Somente as rotas usadas pelo
 * componente são aceitas.
 */
@RestController
@RequestMapping(NotificationsProxyController.BASE_PATH)
public class NotificationsProxyController {

    static final String BASE_PATH = "/api/betha/notificacoes";

    private final BethaAuthenticationHandler authenticationHandler;
    private final BethaPlatformClient platformClient;

    public NotificationsProxyController(final BethaAuthenticationHandler authenticationHandler,
                                        final BethaPlatformClient platformClient) {
        this.authenticationHandler = authenticationHandler;
        this.platformClient = platformClient;
    }

    @GetMapping({"/api/messages", "/api/messages/unreads/all", "/api/messages/reads", "/api/messages/in-progress"})
    public ResponseEntity<byte[]> list(final HttpServletRequest request) {
        return forward(HttpMethod.GET, request);
    }

    @PutMapping({"/api/messages/{id:[A-Za-z0-9_-]+}/read", "/api/messages/{id:[A-Za-z0-9_-]+}/unread"})
    public ResponseEntity<byte[]> mark(final HttpServletRequest request) {
        return forward(HttpMethod.PUT, request);
    }

    @DeleteMapping({"/api/messages/in-progress/unread", "/api/messages/unread"})
    public ResponseEntity<byte[]> clearUnread(final HttpServletRequest request) {
        return forward(HttpMethod.DELETE, request);
    }

    private ResponseEntity<byte[]> forward(final HttpMethod method, final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final String path = request.getRequestURI().substring(request.getContextPath().length() + BASE_PATH.length());
        final String query = request.getQueryString();
        return platformClient.forwardNotifications(token, method, query == null ? path : path + "?" + query);
    }
}
