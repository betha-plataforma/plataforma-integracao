package com.betha.plataforma.bethacon.auth;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.server.ResponseStatusException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Controller
public class LoginController {

    private final BethaAuthenticationHandler authenticationHandler;

    public LoginController(final BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    @GetMapping({"/", "/login"})
    public void redirecionarLoginBetha(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        authenticationHandler.redirectLogin(request, response);
    }

    @GetMapping("/callback")
    public void redirecionarCallback(final HttpServletRequest request, final HttpServletResponse response) throws IOException {
        final String code = request.getParameter("code");
        final String state = request.getParameter("state");
        if (code == null) {
            throw new ResponseStatusException(BAD_REQUEST, "Código OAuth ausente");
        }

        authenticationHandler.exchangeAndSaveAuthorizationCode(code, state, request);
        authenticationHandler.redirectApp(response);
    }
}
