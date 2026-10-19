package com.betha.plataforma.bethacon.auth;

import com.betha.plataforma.bethacon.provider.OauthApi;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

@Component
public class BethaAuthenticationHandler {

    private final OauthChallengeUtils oauthChallengeUtils;
    private final OauthApi oauthApi;

    private final String urlOauth;
    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String callback;
    private final String scopes;

    private static final String TOKEN_SESSION_ATTRIBUTE = "authorization_token";

    public BethaAuthenticationHandler(final OauthChallengeUtils oauthChallengeUtils,
                                      final OauthApi oauthApi,
                                      final @Value("${betha.services.oauth}") String urlOauth,
                                      final @Value("${betha.auth.oauth.client.id}") String clientId,
                                      final @Value("${betha.auth.oauth.client.secret}") String clientSecret,
                                      final @Value("${betha.auth.oauth.client.redirect}") String redirectUri,
                                      final @Value("${betha.auth.oauth.client.callback}") String callback,
                                      final @Value("${betha.auth.oauth.client.scopes}") String scopes) {

        this.oauthChallengeUtils = oauthChallengeUtils;
        this.oauthApi = oauthApi;
        this.urlOauth = urlOauth;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.callback = callback;
        this.scopes = scopes;
    }

    public void redirectLogin(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        final String challengeVerifier = oauthChallengeUtils.createAndSaveChallengeVerifier(request);
        final String state = oauthChallengeUtils.createAndSaveState(request);

        final String redirect = UriComponentsBuilder.fromHttpUrl(urlOauth + "/authorize")
            .queryParam("response_type", "code")
            .queryParam("client_id", clientId)
            .queryParam("redirect_uri", callback)
            .queryParam("scope", scopes)
            .queryParam("code_challenge", challengeVerifier)
            .queryParam("code_challenge_method", "S256")
            .queryParam("state", state)
            .build()
            .encode()
            .toUriString();

        response.sendRedirect(redirect);
    }

    public void redirectApp(final HttpServletResponse response) throws IOException {
        response.sendRedirect(redirectUri);
    }

    public void exchangeAndSaveAuthorizationCode(final String code,
                                                 final String state,
                                                 final HttpServletRequest request) {
        if (!oauthChallengeUtils.consumeAndValidateState(request, state)) {
            throw new InvalidOauthStateException();
        }

        final String verifier = oauthChallengeUtils.getVerifierFromSession(request);
        if (verifier == null) {
            throw new InvalidOauthStateException();
        }

        final Map<String, String> parameters = new LinkedHashMap<>();
        parameters.put("grant_type", "authorization_code");
        parameters.put("client_id", clientId);
        if (hasText(clientSecret)) {
            parameters.put("client_secret", clientSecret);
        }
        parameters.put("redirect_uri", callback);
        parameters.put("code_verifier", verifier);
        parameters.put("code", code);

        final OauthToken token = oauthApi.exchangeAuthorizationCode(parameters);
        oauthChallengeUtils.clearVerifier(request);
        // Evita fixação de sessão: o identificador usado antes do login não continua válido depois dele.
        request.changeSessionId();
        storeInSession(token, request);
    }

    public Optional<OauthToken> getTokenFromSession(final HttpSession nullableSession) {
        return Optional.ofNullable(nullableSession)
            .map(session -> (OauthToken) session.getAttribute(TOKEN_SESSION_ATTRIBUTE));
    }

    public Optional<OauthToken> getValidToken(final HttpServletRequest request) {
        final HttpSession session = request.getSession(false);
        final Optional<OauthToken> optionalToken = getTokenFromSession(session);
        if (!optionalToken.isPresent() || !optionalToken.get().isValid()) {
            return Optional.empty();
        }

        if (optionalToken.get().expired()) {
            // Requisições paralelas da mesma sessão (verify, activity, componentes) não podem renovar ao mesmo
            // tempo com o mesmo refresh token; a primeira renova e as demais reutilizam o token novo.
            synchronized (WebUtils.getSessionMutex(session)) {
                final OauthToken current = getTokenFromSession(request.getSession(false)).orElse(null);
                if (current == null || !current.isValid()) {
                    return Optional.empty();
                }
                if (current.expired()) {
                    try {
                        refreshAndSaveAccessToken(current, request);
                    } catch (RefreshTokenException e) {
                        invalidateSession(request);
                        return Optional.empty();
                    }
                }
            }
        }
        return getTokenFromSession(request.getSession(false));
    }

    public OauthToken requireValidToken(final HttpServletRequest request) {
        return getValidToken(request).orElseThrow(UnauthenticatedException::new);
    }

    public void refreshAndSaveAccessToken(final OauthToken token, final HttpServletRequest request)
        throws RefreshTokenException {

        final Map<String, String> parameters = new LinkedHashMap<>();
        parameters.put("grant_type", "refresh_token");
        parameters.put("client_id", clientId);
        parameters.put("redirect_uri", callback);
        parameters.put("refresh_token", token.getRefreshToken());
        if (hasText(clientSecret)) {
            parameters.put("client_secret", clientSecret);
        }

        try {
            final OauthToken refreshedToken = oauthApi.refreshToken(parameters);
            if (refreshedToken.getRefreshToken() == null) {
                refreshedToken.setRefreshToken(token.getRefreshToken());
            }
            if (refreshedToken.getUser() == null) {
                refreshedToken.setUser(token.getUser());
            }
            if (refreshedToken.getScope() == null) {
                refreshedToken.setScope(token.getScope());
            }
            storeInSession(refreshedToken, request);

        } catch (FeignException.FeignClientException e) {
            throw new RefreshTokenException();
        }
    }

    public void invalidateSession(final HttpServletRequest request) {
        final HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
    }

    private static void storeInSession(final OauthToken token, final HttpServletRequest request) {
        token.markIssuedNow();
        request.getSession(true).setAttribute(TOKEN_SESSION_ATTRIBUTE, token);
    }

    private static boolean hasText(final String value) {
        return value != null && !value.trim().isEmpty();
    }
}
