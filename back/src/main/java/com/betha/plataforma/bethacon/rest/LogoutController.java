package com.betha.plataforma.bethacon.rest;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Map;

@RestController
public class LogoutController {

    private final BethaAuthenticationHandler authenticationHandler;
    private final String loginUrl;
    private final String continueUrl;

    public LogoutController(final BethaAuthenticationHandler authenticationHandler,
                            final @Value("${betha.services.login}") String loginUrl,
                            final @Value("${betha.auth.oauth.client.logout-continue}") String continueUrl) {
        this.authenticationHandler = authenticationHandler;
        this.loginUrl = loginUrl;
        this.continueUrl = continueUrl;
    }

    /**
     * Encerra a sessão local e devolve a URL de logout da Betha, para encerrar também a sessão na Plataforma.
     */
    @PostMapping("/api/logout")
    public Map<String, String> logout(final HttpServletRequest request) {
        authenticationHandler.invalidateSession(request);
        final String redirect = UriComponentsBuilder.fromHttpUrl(loginUrl + "/logout")
            .queryParam("continue", continueUrl)
            .build()
            .encode()
            .toUriString();
        return Collections.singletonMap("redirectUrl", redirect);
    }
}
