package com.betha.plataforma.bethacon.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class RequestService {
    @Value("Bearer xxxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx")
    private String accessToken;

    //O userAccess será dinâmico, podendo ser armazenado no banco, conforme cada cliente
    @Value("xxxxxxxxxxxxxxxxx")
    private String userAccess;

    private final ObjectMapper mapper;

    public RequestService(ObjectMapper mapper) {
        this.mapper = mapper;
    }

    public Map<String, String> getMapHeaders() {
        Map<String, String> mapHeaders = new HashMap<>();
        mapHeaders.put("Authorization", accessToken);
        mapHeaders.put("user-access", userAccess);

        return mapHeaders;
    }

    public Object serializaStringJson(String json) throws IOException {
        return mapper.readValue(json, Object.class);
    }
}