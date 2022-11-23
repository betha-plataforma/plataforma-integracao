package com.betha.plataforma.bethacon.auth;

import com.betha.plataforma.bethacon.provider.OauthApi;
import feign.FeignException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Optional;

@Component
public class BethaAuthenticationHandler {

    private final OauthChallengeUtils oauthChallengeUtils;
    private final OauthApi oauthApi;

    private final String urlOauth;
    private final String clientId;
    private final String clientSecret;
    private final String redirectUri;
    private final String scopes;

    private static final String TOKEN_SESSION_ATTRIBUTE = "authorization_token";

    private static final String AUTHORIZE_URL_TEMPLATE =
        "%s/authorize?response_type=code&client_id=%s&redirect_uri=%s&scope=%s&code_challenge=%s&code_challenge_method=S256";

    private static final String EXCHANGE_CODE_PARAMS_TEMPLATE =
        "grant_type=authorization_code&client_id=%s&redirect_uri=%s&code_verifier=%s&scope=%s&code=%s&client_secret=%s";

    private static final String REFRESH_TOKEN_PARAMS_TEMPLATE =
        "grant_type=refresh_token&client_id=%s&redirect_uri=%s&refresh_token=%s&client_secret=%s";

    public BethaAuthenticationHandler(final OauthChallengeUtils oauthChallengeUtils,
                                      final OauthApi oauthApi,
                                      final @Value("${betha.services.oauth}") String urlOauth,
                                      final @Value("${betha.auth.oauth.client.id}") String clientId,
                                      final @Value("${betha.auth.oauth.client.secret_id}") String clientSecret,
                                      final @Value("${betha.auth.oauth.client.redirect}") String redirectUri,
                                      final @Value("${betha.auth.oauth.client.scopes}") String scopes) {

        this.oauthChallengeUtils = oauthChallengeUtils;
        this.oauthApi = oauthApi;
        this.urlOauth = urlOauth;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.scopes = scopes;
    }

    public void redirectLogin(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        final String challengeVerifier = oauthChallengeUtils.createAndSaveChallengeVerifier(request);

        final String redirect = String.format(
            AUTHORIZE_URL_TEMPLATE,
            urlOauth,
            clientId,
            redirectUri,
            scopes,
            challengeVerifier);

        response.sendRedirect(redirect);
    }

    public void exchangeAndSaveAuthorizationCode(final String code, final HttpServletRequest request) {

        final String parameters = String.format(
            EXCHANGE_CODE_PARAMS_TEMPLATE,
            clientId,
            redirectUri,
            oauthChallengeUtils.getVerifierFromSession(request),
            scopes,
            code,
            clientSecret);

        final OauthToken token = oauthApi.exchangeAuthorizationCode(parameters);
        storeInSession(token, request);
    }

    public Optional<OauthToken> getTokenFromSession(final HttpSession nullableSession) {
        return Optional.ofNullable(nullableSession)
            .map(session -> (OauthToken) session.getAttribute(TOKEN_SESSION_ATTRIBUTE));
    }

    public OauthToken getPresentTokenFromSession(final HttpSession session) {
        return getTokenFromSession(session).orElse(null);
    }

    public void refreshAndSaveAccessToken(final OauthToken token, final HttpServletRequest request)
        throws RefreshTokenException {

        final String parameters = String.format(
            REFRESH_TOKEN_PARAMS_TEMPLATE,
            clientId,
            redirectUri,
            token.getRefreshToken(),
            clientSecret);

        try {
            final OauthToken refreshedToken = oauthApi.refreshToken(parameters);
            storeInSession(refreshedToken, request);

        } catch (FeignException.FeignClientException e) {
            throw new RefreshTokenException();
        }
    }

    private static void storeInSession(final OauthToken token, final HttpServletRequest request) {
        request.getSession(true).setAttribute(TOKEN_SESSION_ATTRIBUTE, token);
    }
}
