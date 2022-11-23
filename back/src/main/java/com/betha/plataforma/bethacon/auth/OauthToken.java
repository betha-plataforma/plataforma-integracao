package com.betha.plataforma.bethacon.auth;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OauthToken implements Serializable {

    public static final OauthToken EMPTY = new OauthToken();

    private static final long EXPIRATION_TIME_IN_HOURS = 1;

    private long expires;

    private String scope;

    private String user;

    private boolean expired;

    @JsonAlias(value = "access_token")
    private String accessToken;

    @JsonAlias(value = "token_type")
    private String tokenType;

    @JsonAlias(value = "refresh_token")
    private String refreshToken;

    @JsonAlias(value = "expires_in")
    private long expiresIn;

    public long getExpires() {
        return expires;
    }

    public void setExpires(long expires) {
        this.expires = expires;
    }

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

    public boolean isExpired() {
        return expired;
    }

    public void setExpired(boolean expired) {
        this.expired = expired;
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
        return expired(getExpires());
    }

    public static boolean expired(long mills) {
        return ChronoUnit.HOURS.between(LocalDateTime.ofInstant(Instant.ofEpochMilli(mills),
                ZoneId.systemDefault()), LocalDateTime.now()) >= EXPIRATION_TIME_IN_HOURS;
    }

    boolean isValid() {
        return getUser() != null && getAccessToken() != null && getRefreshToken() != null && getScope() != null;
    }

}
