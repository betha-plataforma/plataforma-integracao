package com.betha.plataforma.bethacon.v1;

import com.betha.plataforma.bethacon.provider.UsuarioApi;
import com.betha.plataforma.bethacon.service.RequestService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:4200", "https://demobethacon.plataforma.betha.cloud/"})
public class UsuarioController {

    private final RequestService requestService;
    private final UsuarioApi usuarioApi;

    public UsuarioController(RequestService requestService, UsuarioApi usuarioApi) {
        this.requestService = requestService;
        this.usuarioApi = usuarioApi;
    }

    @GetMapping(value = {"/usuario/{usuarioId}/verified"})
    public ResponseEntity<Map<String, Boolean>> verificaUsuarioVerificado(@PathVariable("usuarioId") String usuarioId) {
        return ResponseEntity.ok(this.usuarioApi.isUsuarioVerificado(this.requestService.getMapHeaders(), usuarioId));
    }
}
