package com.betha.plataforma.bethacon.rest;

import com.betha.plataforma.bethacon.access.ContextRequiredException;
import com.betha.plataforma.bethacon.access.InvalidContextException;
import com.betha.plataforma.bethacon.access.TechnicalAccessRequiredException;
import com.betha.plataforma.bethacon.access.TermNotAcceptedException;
import com.betha.plataforma.bethacon.auth.InvalidOauthStateException;
import com.betha.plataforma.bethacon.auth.UnauthenticatedException;
import com.betha.plataforma.bethacon.provider.BethaApiException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;

/**
 * Trata somente as exceções da integração com a Plataforma Betha, para não alterar as respostas de erro
 * das demais funcionalidades.
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @ExceptionHandler(UnauthenticatedException.class)
    public ResponseEntity<ApiError> unauthenticated() {
        return response(HttpStatus.UNAUTHORIZED, "UNAUTHENTICATED", "Sessão não autenticada", null);
    }

    @ExceptionHandler(ContextRequiredException.class)
    public ResponseEntity<ApiError> contextRequired() {
        return response(HttpStatus.CONFLICT, "CONTEXT_REQUIRED", "Selecione uma entidade para continuar", null);
    }

    @ExceptionHandler(TermNotAcceptedException.class)
    public ResponseEntity<ApiError> termNotAccepted() {
        // Mesmo tipo de restrição usado pela Plataforma, para o frontend exibir o termo.
        return response(HttpStatus.FORBIDDEN, "TERM_NOT_ACCEPTED",
            "Aceite o termo de responsabilidade para continuar", "RESTRICTED_TERM_OF_RESPONSIBILITY");
    }

    @ExceptionHandler(InvalidContextException.class)
    public ResponseEntity<ApiError> invalidContext() {
        return response(HttpStatus.FORBIDDEN, "INVALID_CONTEXT",
            "O acesso selecionado não pertence ao usuário e sistema atuais", null);
    }

    @ExceptionHandler(TechnicalAccessRequiredException.class)
    public ResponseEntity<ApiError> technicalAccessRequired() {
        return response(HttpStatus.FORBIDDEN, "TECHNICAL_ACCESS_REQUIRED",
            "Esta funcionalidade é exclusiva para acessos técnicos ou administradores", null);
    }

    @ExceptionHandler(InvalidOauthStateException.class)
    public ResponseEntity<ApiError> invalidState() {
        return response(HttpStatus.BAD_REQUEST, "INVALID_OAUTH_STATE",
            "O retorno OAuth não corresponde ao login iniciado", null);
    }

    @ExceptionHandler(BethaApiException.class)
    public ResponseEntity<ApiError> bethaError(final BethaApiException exception,
                                               final HttpServletRequest request) {
        final HttpStatus status = HttpStatus.resolve(exception.getStatus());
        // 401 da Plataforma não significa sessão local expirada; vira 502 para o frontend não reiniciar o login.
        final HttpStatus responseStatus = (status == null || status == HttpStatus.UNAUTHORIZED)
            ? HttpStatus.BAD_GATEWAY
            : status;
        LOGGER.warn("Integração Betha falhou em {} {}: HTTP {}, code={}, restrictionType={}, message={}",
            request.getMethod(), request.getRequestURI(), exception.getStatus(), exception.getCode(),
            exception.getRestrictionType(), exception.getMessage());
        return ResponseEntity.status(responseStatus).body(new ApiError(exception.getCode(), exception.getMessage(),
            exception.getRestrictionType(), exception.getDetail()));
    }

    private static ResponseEntity<ApiError> response(final HttpStatus status,
                                                     final String code,
                                                     final String message,
                                                     final String restrictionType) {
        return ResponseEntity.status(status).body(new ApiError(code, message, restrictionType));
    }
}
