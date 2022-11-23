package com.betha.plataforma.bethacon.provider;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@FeignClient(name = "usuario", url = "https://plataforma-usuarios.betha.cloud/usuarios/v0.1/api/usuarios/")
public interface UsuarioApi {
    @RequestMapping(method = RequestMethod.GET, path = "{usuarioId}/verified")
    Map<String, Boolean> isUsuarioVerificado(@RequestHeader Map<String, String> headerMap,
                                       @PathVariable("usuarioId") final String usuarioId);
}