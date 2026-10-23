package com.betha.plataforma.bethacon.provider;

import com.fasterxml.jackson.databind.JsonNode;

public class BethaApiException extends RuntimeException {

    private final int status;
    private final String code;
    private final String restrictionType;
    private final JsonNode detail;

    public BethaApiException(final int status,
                             final String code,
                             final String message,
                             final String restrictionType) {
        this(status, code, message, restrictionType, null);
    }

    public BethaApiException(final int status,
                             final String code,
                             final String message,
                             final String restrictionType,
                             final JsonNode detail) {
        super(message);
        this.status = status;
        this.code = code;
        this.restrictionType = restrictionType;
        this.detail = detail;
    }

    public int getStatus() {
        return status;
    }

    public String getCode() {
        return code;
    }

    public String getRestrictionType() {
        return restrictionType;
    }

    /**
     * Detalhe da restrição retornado pela Plataforma (ex.: {@code metadata} da verificação de identidade).
     */
    public JsonNode getDetail() {
        return detail;
    }
}
