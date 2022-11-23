package com.betha.plataforma.bethacon.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "responsavel")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Responsavel {
    private String id;

    private String nome;

    private String cpf;

    private Date dataCriacao;

    private Date dataAlteracao;

    public Responsavel(String id, String nome, String cpf, Date dataCriacao, Date dataAlteracao) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataCriacao = dataCriacao;
        this.dataAlteracao = dataAlteracao;
    }

    public static Responsavel of(final Responsavel dto) {
        return new Responsavel(dto.getId(), dto.getNome(), dto.getCpf(), dto.getDataCriacao(), new Date());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Date getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(Date dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Date getDataAlteracao() {
        return dataAlteracao;
    }

    public void setDataAlteracao(Date dataAlteracao) {
        this.dataAlteracao = dataAlteracao;
    }

    @Override
    public String toString() {
        return "Responsavel{" +
                "id='" + id + '\'' +
                ", nome='" + nome + '\'' +
                ", cpf='" + cpf + '\'' +
                ", dataCriacao=" + dataCriacao +
                ", dataAlteracao=" + dataAlteracao +
                '}';
    }
}
