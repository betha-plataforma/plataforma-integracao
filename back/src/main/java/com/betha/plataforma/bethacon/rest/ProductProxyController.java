package com.betha.plataforma.bethacon.rest;

import com.betha.plataforma.bethacon.access.ContextService;
import com.betha.plataforma.bethacon.access.InvalidContextException;
import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.OauthToken;
import com.betha.plataforma.bethacon.model.BethaAccess;
import com.betha.plataforma.bethacon.provider.BethaPlatformClient;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * Proxy usado pelo bth-marca-produto (propriedade userAccountsApi) para listar os sistemas do acesso
 * selecionado sem expor o token ao navegador. O exercício selecionado é repassado aos links dos sistemas.
 */
@RestController
public class ProductProxyController {

    private final BethaAuthenticationHandler authenticationHandler;
    private final BethaPlatformClient platformClient;
    private final ContextService contextService;

    public ProductProxyController(final BethaAuthenticationHandler authenticationHandler,
                                  final BethaPlatformClient platformClient,
                                  final ContextService contextService) {
        this.authenticationHandler = authenticationHandler;
        this.platformClient = platformClient;
        this.contextService = contextService;
    }

    @GetMapping("/api/betha/user-accounts/api/access/{accessId}/systems")
    public JsonNode systems(@PathVariable final String accessId, final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess selected = contextService.requireSelected(request.getSession(false));
        if (!selected.getId().equals(accessId)) {
            throw new InvalidContextException();
        }
        return platformClient.getSystems(token, selected.getLicenseId(), selected.getId(),
            contextService.getExercise(request.getSession(false)));
    }
}
