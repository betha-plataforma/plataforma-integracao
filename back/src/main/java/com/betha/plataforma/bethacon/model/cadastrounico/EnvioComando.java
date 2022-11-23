package com.betha.plataforma.bethacon.model.cadastrounico;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class EnvioComando {
    private Action action;

    @JsonAlias("data")
    private Dado data;

    public EnvioComando(Action action, Dado atributos) {
        this.action = action;
        this.data = atributos;
    }

    public Action getAction() {
        return action;
    }

    public Dado getData() {
        return data;
    }

    public enum Action {
        UPDATE,
        UNSUBSCRIBE,
        STATUS_REPORT
    }
}
