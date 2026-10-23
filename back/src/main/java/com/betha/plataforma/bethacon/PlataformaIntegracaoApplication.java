package com.betha.plataforma.bethacon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.UserDetailsServiceAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication(exclude = UserDetailsServiceAutoConfiguration.class)
@EnableFeignClients
@EnableMongoRepositories
public class PlataformaIntegracaoApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlataformaIntegracaoApplication.class, args);
	}
}
