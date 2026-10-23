package com.betha.plataforma.bethacon.rest;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.OauthToken;
import com.betha.plataforma.bethacon.model.Usuario;
import com.betha.plataforma.bethacon.provider.BethaPlatformClient;
import org.springframework.http.CacheControl;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
public class UserController {

    private final BethaAuthenticationHandler authenticationHandler;
    private final BethaPlatformClient platformClient;

    public UserController(final BethaAuthenticationHandler authenticationHandler,
                          final BethaPlatformClient platformClient) {
        this.authenticationHandler = authenticationHandler;
        this.platformClient = platformClient;
    }

    /**
     * Foto do usuário para o bth-conta-usuario, obtida com o token da sessão.
     */
    @GetMapping("/api/user/photo")
    public ResponseEntity<byte[]> photo(final HttpServletRequest request) {
        final OauthToken token = authenticationHandler.requireValidToken(request);
        final Usuario user = platformClient.getCurrentUser(token);
        if (user.getFoto() == null || user.getFoto().trim().isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        final ResponseEntity<byte[]> remote = platformClient.getUserPhoto(token, user.getFoto());
        final HttpHeaders headers = new HttpHeaders();
        headers.setCacheControl(CacheControl.noStore());
        if (remote.getHeaders().getContentType() != null) {
            headers.setContentType(remote.getHeaders().getContentType());
        }
        return new ResponseEntity<>(remote.getBody(), headers, HttpStatus.OK);
    }
}
