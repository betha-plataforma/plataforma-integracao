package com.betha.plataforma.bethacon.v1;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.OauthToken;
import com.betha.plataforma.bethacon.model.Usuario;
import com.betha.plataforma.bethacon.provider.AutorizacaoApi;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:4200", "https://demobethacon.plataforma.betha.cloud/"})
public class AutorizacaoController {

    private final AutorizacaoApi autorizacaoApi;

    private final BethaAuthenticationHandler authenticationHandler;

    public AutorizacaoController(AutorizacaoApi autorizacaoApi, BethaAuthenticationHandler authenticationHandler) {
        this.autorizacaoApi = autorizacaoApi;
        this.authenticationHandler = authenticationHandler;
    }

    @GetMapping({"conta-usuario"})
    public Usuario getUsuario(final HttpSession session) {
        final OauthToken oauthToken = authenticationHandler.getPresentTokenFromSession(session);
        return autorizacaoApi.getInformacoesUsuario(oauthToken.getAccessToken());
    }
}
