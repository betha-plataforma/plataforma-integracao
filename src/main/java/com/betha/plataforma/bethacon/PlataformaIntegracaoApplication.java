package com.betha.plataforma.bethacon;

import com.betha.plataforma.bethacon.auth.BethaAuthenticationHandler;
import com.betha.plataforma.bethacon.auth.CallbackFilter;
import com.betha.plataforma.bethacon.auth.LoginFilter;
import com.betha.plataforma.bethacon.infra.SSLUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import javax.annotation.PostConstruct;

@SpringBootApplication
@EnableFeignClients
@EnableMongoRepositories
public class PlataformaIntegracaoApplication {

	private final BethaAuthenticationHandler authenticationHandler;

	public PlataformaIntegracaoApplication(BethaAuthenticationHandler authenticationHandler) {
		this.authenticationHandler = authenticationHandler;
	}

	public static void main(String[] args) {
		SpringApplication.run(PlataformaIntegracaoApplication.class, args);
	}

	@Bean
	public FilterRegistrationBean<LoginFilter> loginFilter() {
		final FilterRegistrationBean<LoginFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new LoginFilter(authenticationHandler));
		registrationBean.addUrlPatterns("/conta-usuario");
		return registrationBean;
	}

	@Bean
	public FilterRegistrationBean<CallbackFilter> callbackFilter() {
		final FilterRegistrationBean<CallbackFilter> registrationBean = new FilterRegistrationBean<>();
		registrationBean.setFilter(new CallbackFilter(authenticationHandler));
		registrationBean.addUrlPatterns("/callback");
		return registrationBean;
	}

	@PostConstruct
	void init() {
		SSLUtils.trustAllHostnames();
		SSLUtils.trustAllHttpsCertificates();
	}
}
