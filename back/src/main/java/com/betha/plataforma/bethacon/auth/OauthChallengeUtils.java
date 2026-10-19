package com.betha.plataforma.bethacon.auth;

import com.google.common.hash.Hashing;
import com.google.common.io.BaseEncoding;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Optional;
import java.util.UUID;

@Component
public class OauthChallengeUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(OauthChallengeUtils.class);
    private static final String VERIFIER_ATTRIBUTE = "betha.oauth.verifier";
    private static final String STATE_ATTRIBUTE = "betha.oauth.state";
    private static final SecureRandom SECURE_RANDOM = new SecureRandom();

    public String createAndSaveChallengeVerifier(final HttpServletRequest request) {
        final String verifier = generateVerifier();

        final HttpSession session = request.getSession(true);
        session.setAttribute(VERIFIER_ATTRIBUTE, verifier);

        return createChallenge(verifier);
    }

    public String createAndSaveState(final HttpServletRequest request) {
        final byte[] stateBytes = new byte[32];
        SECURE_RANDOM.nextBytes(stateBytes);
        final String state = Base64.getUrlEncoder().withoutPadding().encodeToString(stateBytes);
        final HttpSession session = request.getSession(true);
        final String previousState = (String) session.getAttribute(STATE_ATTRIBUTE);
        if (previousState != null) {
            LOGGER.warn("OAuth reiniciado antes de concluir o login anterior: stateAnterior={}", fingerprint(previousState));
        }
        session.setAttribute(STATE_ATTRIBUTE, state);
        LOGGER.info("OAuth iniciado: state={}", fingerprint(state));
        return state;
    }

    public boolean consumeAndValidateState(final HttpServletRequest request, final String receivedState) {
        final HttpSession session = request.getSession(false);
        if (session == null) {
            LOGGER.warn("Callback OAuth sem sessão: stateRecebido={}", fingerprint(receivedState));
            return false;
        }
        if (receivedState == null) {
            LOGGER.warn("Callback OAuth sem state");
            return false;
        }

        final String expectedState = (String) session.getAttribute(STATE_ATTRIBUTE);
        if (expectedState == null) {
            LOGGER.warn("Callback OAuth sem state pendente na sessão: stateRecebido={}", fingerprint(receivedState));
            return false;
        }

        final boolean matches = MessageDigest.isEqual(
            expectedState.getBytes(StandardCharsets.UTF_8),
            receivedState.getBytes(StandardCharsets.UTF_8));
        if (!matches) {
            LOGGER.warn("State OAuth divergente: esperado={}, recebido={}",
                fingerprint(expectedState), fingerprint(receivedState));
            return false;
        }

        session.removeAttribute(STATE_ATTRIBUTE);
        return true;
    }

    public String getVerifierFromSession(final HttpServletRequest request) {
        return Optional.ofNullable(request.getSession(false))
            .map(session -> (String) session.getAttribute(VERIFIER_ATTRIBUTE))
            .orElse(null);
    }

    public void clearVerifier(final HttpServletRequest request) {
        final HttpSession session = request.getSession(false);
        if (session != null) {
            session.removeAttribute(VERIFIER_ATTRIBUTE);
        }
    }

    private static String generateVerifier() {
        return BaseEncoding.base64Url().omitPadding()
                .encode(UUID.randomUUID().toString().substring(0, 32).getBytes());
    }

    @SuppressWarnings("UnstableApiUsage")
    private static String createChallenge(final String verifier) {
        return BaseEncoding.base64Url().omitPadding()
                .encode(Hashing.sha256().hashString(verifier, StandardCharsets.UTF_8).asBytes());
    }

    private static String fingerprint(final String value) {
        if (value == null || value.trim().isEmpty()) {
            return "<ausente>";
        }
        final String digest = createChallenge(value);
        return digest.substring(0, Math.min(12, digest.length()));
    }
}
