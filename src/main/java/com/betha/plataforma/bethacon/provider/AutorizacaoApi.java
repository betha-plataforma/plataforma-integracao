package com.betha.plataforma.bethacon.provider;

import com.betha.plataforma.bethacon.model.Usuario;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@FeignClient(name = "autorizacao", url = "https://useraccounts.cloud.betha.com.br/user-accounts/v0.1/api")
public interface AutorizacaoApi {

    @RequestMapping(method = RequestMethod.GET, path = "users/@me?access_token={access_token}")
    Usuario getInformacoesUsuario(@PathVariable("access_token") final String accessToken);
}
