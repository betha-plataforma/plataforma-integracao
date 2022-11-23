package com.betha.plataforma.bethacon.v1;

import com.betha.plataforma.bethacon.model.cadastrounico.RecepcaoComando;
import com.betha.plataforma.bethacon.service.ResponsavelService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/comando/webhook")
@CrossOrigin(origins = {"http://localhost:4200", "https://demobethacon.plataforma.betha.cloud/"})
public class CadastroUnicoController {
    private final ResponsavelService service;

    public CadastroUnicoController(ResponsavelService service) {
        this.service = service;
    }


    @PostMapping(value = {"/responsavel"})
    public ResponseEntity<RecepcaoComando> comando(@RequestBody RecepcaoComando comando) {
        //Recebe evento de changes do cadastro unico
        return ResponseEntity.ok(comando);
    }
}