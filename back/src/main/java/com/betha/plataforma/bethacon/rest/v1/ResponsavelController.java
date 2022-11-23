package com.betha.plataforma.bethacon.rest.v1;

import com.betha.plataforma.bethacon.model.Responsavel;
import com.betha.plataforma.bethacon.repository.ResponsavelRepository;
import com.betha.plataforma.bethacon.service.ResponsavelService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:4200", "https://demobethacon.plataforma.betha.cloud/"})
public class ResponsavelController {
    private final ResponsavelRepository repository;

    private final ResponsavelService service;

    public ResponsavelController(ResponsavelRepository repository, ResponsavelService service) {
        this.repository = repository;
        this.service = service;
    }

    @PostMapping(value = {"/responsavel"})
    public ResponseEntity cadastra(@RequestBody @Validated Responsavel responsavel) {
        if (this.service.isResponsavelValido(responsavel)) {
            return ResponseEntity.ok(this.service.salva(responsavel));
        }
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body("Já existe um responsável com o CPF informado!");
    }

    @GetMapping(value = {"/responsavel"})
    public ResponseEntity<List<Responsavel>> buscaTodos() {
        return ResponseEntity.ok(this.repository.findAll());
    }

    @GetMapping(value = {"/responsavel/{cpf}"})
    public ResponseEntity<Responsavel> buscaTodos(@PathVariable("cpf") String cpf) {
        Responsavel byNome = this.repository.findByCpf(cpf);
        if (byNome == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(byNome);
    }


    @PutMapping(value = {"/responsavel/{id}"})
    public ResponseEntity<Responsavel> altera(@PathVariable("id") String id, @RequestBody @Validated Responsavel dto) {
        Optional<Responsavel> responsavel = this.repository.findById(id);
        if (!responsavel.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        dto.setId(responsavel.get().getId());
        dto.setDataCriacao(responsavel.get().getDataCriacao());
        return ResponseEntity.ok(this.service.altera(Responsavel.of(dto)));
    }

    @DeleteMapping(value = {"/responsavel/{id}"})
    public ResponseEntity<Responsavel> remove(@PathVariable String id) {
        this.repository.deleteById(id);
        return ResponseEntity.accepted().build();
    }
}
