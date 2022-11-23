package com.betha.plataforma.bethacon.model;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface ResponsavelCadastroUnico {
    void comandoResponsavel(Responsavel responsavel) throws JsonProcessingException;
}
