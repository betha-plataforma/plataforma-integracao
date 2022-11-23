package com.betha.plataforma.bethacon.provider;

import com.betha.plataforma.bethacon.auth.OauthToken;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@FeignClient(name = "oauth", url = "https://oauth.cloud.betha.com.br/auth/oauth2")
public interface OauthApi {

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken exchangeAuthorizationCode(final String parameters);

    @RequestMapping(value = "/token", method = POST, consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    OauthToken refreshToken(final String parameters);
}
