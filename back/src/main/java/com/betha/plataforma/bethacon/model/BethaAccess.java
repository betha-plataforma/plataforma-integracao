package com.betha.plataforma.bethacon.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Acesso do usuário retornado por {@code suite/users/@me/access}. O {@code licenseId} é o valor enviado
 * no header {@code User-Access} das chamadas feitas em nome do usuário no contexto selecionado.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class BethaAccess implements Serializable {

    private static final long serialVersionUID = 1L;

    private String id;
    private String licenseId;
    private String user;
    private String context;
    private int system;
    private boolean admin;
    private boolean technical;
    private boolean connected;
    private boolean accepted;
    private Map<String, String> values = new LinkedHashMap<>();

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLicenseId() {
        return licenseId;
    }

    public void setLicenseId(String licenseId) {
        this.licenseId = licenseId;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public int getSystem() {
        return system;
    }

    public void setSystem(int system) {
        this.system = system;
    }

    public boolean isAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = admin;
    }

    public boolean isTechnical() {
        return technical;
    }

    public void setTechnical(boolean technical) {
        this.technical = technical;
    }

    public boolean isConnected() {
        return connected;
    }

    public void setConnected(boolean connected) {
        this.connected = connected;
    }

    public boolean isAccepted() {
        return accepted;
    }

    public void setAccepted(boolean accepted) {
        this.accepted = accepted;
    }

    public Map<String, String> getValues() {
        return values;
    }

    public void setValues(Map<String, String> values) {
        this.values = values == null ? new LinkedHashMap<>() : values;
    }
}
