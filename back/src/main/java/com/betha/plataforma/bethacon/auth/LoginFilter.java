package com.betha.plataforma.bethacon.auth;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

public class LoginFilter implements Filter {

    private final BethaAuthenticationHandler authenticationHandler;

    public LoginFilter(final BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    @Override
    public void doFilter(final ServletRequest servletRequest,
                         final ServletResponse servletResponse,
                         final FilterChain filterChain)
        throws IOException, ServletException {


        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        final HttpSession session = request.getSession();

        final OauthToken token = authenticationHandler.getTokenFromSession(session).orElse(OauthToken.EMPTY);

        if (!token.isValid()) {
            response.sendRedirect("login");
            return;
        }

        if (token.expired()) {
            try {
                authenticationHandler.refreshAndSaveAccessToken(token, request);
            } catch (final RefreshTokenException e) {
                response.sendRedirect("login");
            }
        }

        filterChain.doFilter(servletRequest, servletResponse);
    }
}
