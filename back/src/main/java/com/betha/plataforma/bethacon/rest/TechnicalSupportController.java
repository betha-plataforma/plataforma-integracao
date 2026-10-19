package com.betha.plataforma.bethacon.rest;

import com.betha.plataforma.bethacon.access.ContextService;
import com.betha.plataforma.bethacon.access.TechnicalAccessRequiredException;
import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.OauthToken;
import com.betha.plataforma.bethacon.model.BethaAccess;
import com.betha.plataforma.bethacon.provider.BethaPlatformClient;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Consulta de suporte: lista quem possui acesso ao contexto atual. Liberada somente para acessos
 * técnicos ou administradores; não concede, altera nem remove acessos.
 */
@RestController
@RequestMapping("/api/support")
public class TechnicalSupportController {

    private final BethaAuthenticationHandler authenticationHandler;
    private final BethaPlatformClient platformClient;
    private final ContextService contextService;

    public TechnicalSupportController(final BethaAuthenticationHandler authenticationHandler,
                                      final BethaPlatformClient platformClient,
                                      final ContextService contextService) {
        this.authenticationHandler = authenticationHandler;
        this.platformClient = platformClient;
        this.contextService = contextService;
    }

    @GetMapping("/accesses")
    public JsonNode listContextAccesses(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess access = contextService.requireSelected(request.getSession(false));
        if (!access.isTechnical() && !access.isAdmin()) {
            throw new TechnicalAccessRequiredException();
        }
        return platformClient.listContextAccesses(token, access.getLicenseId());
    }
}
