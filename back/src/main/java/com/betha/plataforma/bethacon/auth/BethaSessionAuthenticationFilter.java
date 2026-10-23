package com.betha.plataforma.bethacon.auth;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Component
public class BethaSessionAuthenticationFilter extends OncePerRequestFilter {

    private final BethaAuthenticationHandler authenticationHandler;

    public BethaSessionAuthenticationFilter(final BethaAuthenticationHandler authenticationHandler) {
        this.authenticationHandler = authenticationHandler;
    }

    @Override
    protected void doFilterInternal(final HttpServletRequest request,
                                    final HttpServletResponse response,
                                    final FilterChain filterChain) throws ServletException, IOException {
        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            authenticationHandler.getValidToken(request).ifPresent(token -> {
                final String principal = token.getUser() == null ? "betha-user" : token.getUser();
                SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken(principal, null, Collections.emptyList()));
            });
        }
        filterChain.doFilter(request, response);
    }
}
