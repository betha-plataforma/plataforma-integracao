package com.betha.plataforma.bethacon.model.cadastrounico;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface ComandoCadastroUnico<T> {
    void comandoEnvio(T object) throws JsonProcessingException;
}
