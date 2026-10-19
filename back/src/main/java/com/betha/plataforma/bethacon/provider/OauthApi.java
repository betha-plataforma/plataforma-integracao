package com.betha.plataforma.bethacon.provider;

import com.betha.plataforma.bethacon.auth.OauthToken;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

/**
 * Os parâmetros precisam ser declarados como {@code Map<String, ?>}: é o único tipo que o FormEncoder
 * (feign-form 3.8) codifica como formulário. Outros tipos, como MultiValueMap, são serializados como POJO
 * e o OAuth recebe o corpo sem os parâmetros (unsupported_grant_type).
 */
@FeignClient(name = "oauth", url = "${betha.services.oauth}")
public interface OauthApi {

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken exchangeAuthorizationCode(@RequestBody Map<String, ?> parameters);

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken refreshToken(@RequestBody Map<String, ?> parameters);
}
