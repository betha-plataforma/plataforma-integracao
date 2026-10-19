package com.betha.plataforma.bethacon.auth;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(final HttpSecurity http,
                                                   final BethaSessionAuthenticationFilter authenticationFilter) throws Exception {
        final CookieCsrfTokenRepository csrfRepository = CookieCsrfTokenRepository.withHttpOnlyFalse();
        csrfRepository.setCookiePath("/");

        final AuthenticationEntryPoint unauthorized = (request, response, exception) ->
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Sessão não autenticada");

        http
            .csrf()
                .csrfTokenRepository(csrfRepository)
                // O bth-notificacoes usa fetch próprio e não envia X-XSRF-TOKEN. O cookie de sessão é
                // SameSite=Lax (não vai em PUT/DELETE de outro site) e o componente envia Authorization,
                // o que força preflight CORS em chamadas de outra origem, recusado por este backend.
                .ignoringAntMatchers("/api/betha/notificacoes/**")
            .and()
            .authorizeRequests()
                .antMatchers("/", "/login", "/callback", "/error", "/health/**", "/actuator/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .exceptionHandling().authenticationEntryPoint(unauthorized)
            .and()
            // O logout é feito em /api/logout, que também encerra a sessão na Betha.
            .logout().disable()
            .addFilterBefore(authenticationFilter, AnonymousAuthenticationFilter.class);

        return http.build();
    }

    /**
     * O filtro só deve rodar dentro da cadeia do Spring Security, não também como filtro servlet comum.
     */
    @Bean
    public FilterRegistrationBean<BethaSessionAuthenticationFilter> bethaSessionAuthenticationFilterRegistration(
        final BethaSessionAuthenticationFilter authenticationFilter) {
        final FilterRegistrationBean<BethaSessionAuthenticationFilter> registration =
            new FilterRegistrationBean<>(authenticationFilter);
        registration.setEnabled(false);
        return registration;
    }
}
