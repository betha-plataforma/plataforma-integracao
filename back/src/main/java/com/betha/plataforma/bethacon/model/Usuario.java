package com.betha.plataforma.bethacon.model;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Usuario {

    private String id;

    private String user;

    @JsonAlias("name")
    private String nome;

    private String email;

    private String cpf;

    @JsonAlias("cellPhone")
    private String celular;

    @JsonAlias("photo")
    private String foto;

    public Usuario() {
    }

    public Usuario(String nome, String email, String cpf, String celular, String foto) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.celular = celular;
        this.foto = foto;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getFoto() {
        return foto;
    }

    public void setFoto(String foto) {
        this.foto = foto;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id='" + id + '\'' +
                ", user='" + user + '\'' +
                ", nome='" + nome + '\'' +
                ", email='" + email + '\'' +
                ", cpf='" + cpf + '\'' +
                ", celular='" + celular + '\'' +
                ", foto='" + foto + '\'' +
                '}';
    }
}
