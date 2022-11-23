package com.betha.plataforma.bethacon.auth;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CallbackFilter implements Filter {

    private final BethaAuthenticationHandler authenticationHandler;

    public CallbackFilter(final BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    @Override
    public void doFilter(final ServletRequest servletRequest,
                         final ServletResponse servletResponse,
                         final FilterChain filterChain) throws IOException {

        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        final String code = request.getParameter("code");

        if (code == null) {
            response.sendRedirect("login");
            return;
        }

        authenticationHandler.exchangeAndSaveAuthorizationCode(code, request);

        response.sendRedirect("/conta-usuario");
    }
}
