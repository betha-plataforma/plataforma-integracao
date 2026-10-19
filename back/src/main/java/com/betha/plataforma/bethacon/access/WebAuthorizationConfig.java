package com.betha.plataforma.bethacon.access;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Endpoints autorizados pela Plataforma conforme page-mapping/page-mapping.json. O suporte técnico
 * (/api/support/**) não passa por aqui: é liberado pelos flags technical/admin do acesso selecionado.
 */
@Configuration
public class WebAuthorizationConfig implements WebMvcConfigurer {

    private final AuthorizationInterceptor authorizationInterceptor;

    public WebAuthorizationConfig(final @Lazy AuthorizationInterceptor authorizationInterceptor) {
        this.authorizationInterceptor = authorizationInterceptor;
    }

    @Override
    public void addInterceptors(final InterceptorRegistry registry) {
        registry.addInterceptor(authorizationInterceptor)
            .addPathPatterns(
                "/api/v1/responsavel", "/api/v1/responsavel/**",
                "/api/v1/imovel",
                "/api/v1/contribuinte",
                "/api/v1/usuario/**");
    }
}
