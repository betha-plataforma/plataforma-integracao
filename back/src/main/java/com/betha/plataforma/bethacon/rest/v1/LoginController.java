package com.betha.plataforma.bethacon.rest.v1;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:4200", "https://demobethacon.plataforma.betha.cloud/"})
public class LoginController {

    private final BethaAuthenticationHandler authenticationHandler;

    public LoginController(BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    @PostMapping(value = {"/login/betha"})
    public void redirecionarLoginBetha(final HttpServletRequest request, final HttpServletResponse response)
            throws IOException {
        authenticationHandler.redirectLogin(request, response);
    }
}
