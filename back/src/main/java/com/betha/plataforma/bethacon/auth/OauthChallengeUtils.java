package com.betha.plataforma.bethacon.auth;

import com.google.common.hash.Hashing;
import com.google.common.io.BaseEncoding;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.nio.charset.StandardCharsets;
import java.util.Optional;
import java.util.UUID;

@Component
public class OauthChallengeUtils {

    public String createAndSaveChallengeVerifier(final HttpServletRequest request) {
        final String verifier = generateVerifier();

        final HttpSession session = request.getSession(true);
        session.setAttribute("verifier", verifier);

        return createChallenge(verifier);
    }

    public String getVerifierFromSession(final HttpServletRequest request) {
        return Optional.ofNullable(request.getSession()).map(session -> (String) session.getAttribute("verifier"))
                .orElse(null);
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


}
