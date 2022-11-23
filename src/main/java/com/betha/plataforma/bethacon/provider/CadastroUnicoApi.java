package com.betha.plataforma.bethacon.provider;

import com.betha.plataforma.bethacon.model.Responsavel;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;

import static org.springframework.web.bind.annotation.RequestMethod.PUT;

@FeignClient(name = "cadastro-unico", url = "https://plataforma-cadastro-unico.betha.cloud/api/v2/")
public interface CadastroUnicoApi {
    @RequestMapping(value = "/command", method = PUT, consumes = MediaType.APPLICATION_JSON_VALUE)
    Responsavel enviaCommand(final String dto);
}
