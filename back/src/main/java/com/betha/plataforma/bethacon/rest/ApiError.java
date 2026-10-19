package com.betha.plataforma.bethacon.rest;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.JsonNode;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiError {

    private final String code;
    private final String message;
    private final String restrictionType;
    private final JsonNode detail;

    public ApiError(final String code, final String message, final String restrictionType) {
        this(code, message, restrictionType, null);
    }

    public ApiError(final String code, final String message, final String restrictionType, final JsonNode detail) {
        this.code = code;
        this.message = message;
        this.restrictionType = restrictionType;
        this.detail = detail;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }

    public String getRestrictionType() {
        return restrictionType;
    }

    public JsonNode getDetail() {
        return detail;
    }
}
