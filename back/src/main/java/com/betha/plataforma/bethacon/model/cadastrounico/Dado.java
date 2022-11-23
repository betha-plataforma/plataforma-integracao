package com.betha.plataforma.bethacon.model.cadastrounico;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Builder;

import java.util.Map;

@Builder
@JsonIgnoreProperties(ignoreUnknown = true)
public class Dado {
    private String template;
    private String aggregate;
    private String id;
    private String user;
    private Map<String, Object> data;

    public Dado(String template, String aggregate, String id, String user, Map<String, Object> data) {
        this.template = template;
        this.aggregate = aggregate;
        this.id = id;
        this.user = user;
        this.data = data;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public String getAggregate() {
        return aggregate;
    }

    public void setAggregate(String aggregate) {
        this.aggregate = aggregate;
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

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    @Override
    public String toString() {
        return "Dado{" +
                "template='" + template + '\'' +
                ", aggregate='" + aggregate + '\'' +
                ", id=" + id +
                ", user='" + user + '\'' +
                ", data=" + data +
                '}';
    }
}
