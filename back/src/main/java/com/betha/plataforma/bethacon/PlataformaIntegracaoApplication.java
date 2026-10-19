package com.betha.plataforma.bethacon;

import com.betha.plataforma.bethacon.infra.SSLUtils;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import javax.annotation.PostConstruct;

// A autenticação é feita pelo OAuth da Betha; não há usuários locais.
@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@EnableFeignClients
@EnableMongoRepositories
public class PlataformaIntegracaoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlataformaIntegracaoApplication.class, args);
	}

	@PostConstruct
	void init() {
		SSLUtils.trustAllHostnames();
		SSLUtils.trustAllHttpsCertificates();
	}
}
