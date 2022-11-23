package com.betha.plataforma.bethacon.repository;

import com.betha.plataforma.bethacon.model.Responsavel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResponsavelRepository extends MongoRepository<Responsavel, String> {
    Responsavel findByCpf(String cpf);
}
