package com.betha.plataforma.bethacon.auth;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OauthToken implements Serializable {

    private static final long serialVersionUID = 1L;
    private static final long EXPIRATION_SKEW_SECONDS = 30;

    private long issuedAt;

    private String scope;

    private String user;

    @JsonAlias(value = "access_token")
    private String accessToken;

    @JsonAlias(value = "token_type")
    private String tokenType;

    @JsonAlias(value = "refresh_token")
    private String refreshToken;

    @JsonAlias(value = "expires_in")
    private long expiresIn;

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public long getExpiresIn() {
        return expiresIn;
    }

    public void setExpiresIn(long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public boolean expired() {
        if (issuedAt <= 0 || expiresIn <= 0) {
            return true;
        }
        final long expiration = issuedAt + Math.max(0, expiresIn - EXPIRATION_SKEW_SECONDS) * 1000;
        return System.currentTimeMillis() >= expiration;
    }

    public void markIssuedNow() {
        this.issuedAt = System.currentTimeMillis();
    }

    public boolean isValid() {
        return getAccessToken() != null && !getAccessToken().trim().isEmpty();
    }
}
