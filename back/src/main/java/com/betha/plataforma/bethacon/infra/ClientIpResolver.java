package com.betha.plataforma.bethacon.infra;

import com.google.common.net.InetAddresses;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

/**
 * Resolve o IP do usuário que originou a requisição atual, para ser encaminhado à Plataforma Betha no
 * header {@code x-bth-ip-address} (usado nas restrições de acesso por IP/CIDR).
 *
 * <p>O {@code getRemoteAddr()} já considera {@code X-Forwarded-For} quando a requisição vem de um proxy
 * confiável ({@code server.forward-headers-strategy: native}). Headers enviados diretamente pelo navegador
 * não são lidos aqui, para que o usuário não consiga informar outro IP.</p>
 */
public final class ClientIpResolver {

    private ClientIpResolver() {
    }

    public static Optional<String> currentClientIp() {
        final RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (!(attributes instanceof ServletRequestAttributes)) {
            return Optional.empty();
        }
        return resolve(((ServletRequestAttributes) attributes).getRequest());
    }

    public static Optional<String> resolve(final HttpServletRequest request) {
        final String remoteAddress = request.getRemoteAddr();
        if (remoteAddress == null || !InetAddresses.isInetAddress(remoteAddress)) {
            return Optional.empty();
        }
        // Normaliza a representação, inclusive IPv4 mapeado em IPv6 (::ffff:203.0.113.10 -> 203.0.113.10).
        return Optional.of(InetAddresses.toAddrString(InetAddresses.forString(remoteAddress)));
    }
}
