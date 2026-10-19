package com.betha.plataforma.bethacon.access;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.OauthToken;
import com.betha.plataforma.bethacon.model.BethaAccess;
import com.betha.plataforma.bethacon.provider.BethaPlatformClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Autorização baseada no page-mapping publicado na Plataforma (page-mapping/page-mapping.json).
 * As capabilities servem apenas de feedback visual ao frontend: a decisão definitiva é tomada em
 * {@link #requireAllowed(HttpServletRequest)} antes de cada endpoint protegido.
 */
@Service
public class AuthorizationService {

    private static final String RESPONSAVEL_RESOURCE = "/api/v1/responsavel";
    private static final String RESPONSAVEL_ITEM_RESOURCE = RESPONSAVEL_RESOURCE + "/1";

    private final BethaAuthenticationHandler authenticationHandler;
    private final BethaPlatformClient platformClient;
    private final ContextService contextService;
    private final String managerUrl;

    public AuthorizationService(final BethaAuthenticationHandler authenticationHandler,
                                final BethaPlatformClient platformClient,
                                final ContextService contextService,
                                final @Value("${betha.services.manager}") String managerUrl) {
        this.authenticationHandler = authenticationHandler;
        this.platformClient = platformClient;
        this.contextService = contextService;
        this.managerUrl = managerUrl.endsWith("/") ? managerUrl.substring(0, managerUrl.length() - 1) : managerUrl;
    }

    /**
     * Antes da permissão do page-mapping, exige o aceite do termo e verifica a sessão na Plataforma. Assim,
     * timeout por inatividade, desconexão administrativa, sessão única e restrições de horário/IP bloqueiam a
     * operação no próprio backend, e não apenas na interface.
     */
    public void requireAllowed(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final BethaAccess access = contextService.requireAccepted(request.getSession(false));
        platformClient.verifySession(token, access.getLicenseId());
        platformClient.requireAllowed(token, access.getLicenseId(), request.getRequestURI(), request.getMethod());
    }

    public Map<String, Object> capabilities(final OauthToken token, final BethaAccess access) {
        final Map<String, Object> capabilities = new LinkedHashMap<>();
        capabilities.put("responsavel", responsavelCapabilities(token, access));
        capabilities.put("imovel", readCapability(token, access, "/api/v1/imovel"));
        capabilities.put("contribuinte", readCapability(token, access, "/api/v1/contribuinte"));
        return capabilities;
    }

    public String managerUrl(final BethaAccess access) {
        if (access == null || !access.isAdmin()) {
            return null;
        }
        return managerUrl + "/#/entidades/" + access.getContext() + "/sistemas/" + contextService.getSystemId();
    }

    private Map<String, Boolean> responsavelCapabilities(final OauthToken token, final BethaAccess access) {
        final Map<String, Boolean> permissions = new LinkedHashMap<>();
        permissions.put("read", allowed(token, access, RESPONSAVEL_RESOURCE, "GET"));
        permissions.put("create", allowed(token, access, RESPONSAVEL_RESOURCE, "POST"));
        permissions.put("edit", allowed(token, access, RESPONSAVEL_ITEM_RESOURCE, "PUT"));
        permissions.put("delete", allowed(token, access, RESPONSAVEL_ITEM_RESOURCE, "DELETE"));
        return permissions;
    }

    private Map<String, Boolean> readCapability(final OauthToken token,
                                                final BethaAccess access,
                                                final String resource) {
        final Map<String, Boolean> permission = new LinkedHashMap<>();
        permission.put("read", allowed(token, access, resource, "GET"));
        return permission;
    }

    private boolean allowed(final OauthToken token,
                            final BethaAccess access,
                            final String resource,
                            final String method) {
        return platformClient.isAllowed(token, access.getLicenseId(), resource, method);
    }
}
