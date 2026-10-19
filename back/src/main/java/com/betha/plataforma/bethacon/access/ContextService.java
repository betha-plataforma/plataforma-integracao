package com.betha.plataforma.bethacon.access;

import com.betha.plataforma.bethacon.model.BethaAccess;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Mantém na sessão o acesso (entidade) selecionado pelo usuário e o exercício recebido na troca de contexto.
 */
@Service
public class ContextService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ContextService.class);
    private static final String SELECTED_ACCESS_ATTRIBUTE = "betha.selected-access";
    private static final String EXERCISE_ATTRIBUTE = "betha.exercise";

    private final int systemId;

    public ContextService(final @Value("${betha.system.id}") int systemId) {
        this.systemId = systemId;
    }

    public List<BethaAccess> forCurrentSystem(final List<BethaAccess> accesses) {
        final List<BethaAccess> filtered = accesses.stream()
            .filter(access -> access.getSystem() == systemId)
            .filter(access -> access.getId() != null && access.getLicenseId() != null)
            .collect(Collectors.toList());

        if (filtered.isEmpty()) {
            final Set<Integer> returnedSystems = new LinkedHashSet<>();
            accesses.forEach(access -> returnedSystems.add(access.getSystem()));
            LOGGER.warn("Nenhum acesso válido para BETHA_SYSTEM_ID={}: recebidos={}, sistemasRecebidos={}",
                systemId, accesses.size(), returnedSystems);
        }
        return filtered;
    }

    public BethaAccess resolveSelected(final HttpSession session, final List<BethaAccess> accesses) {
        final BethaAccess stored = (BethaAccess) session.getAttribute(SELECTED_ACCESS_ATTRIBUTE);
        if (stored != null) {
            final Optional<BethaAccess> refreshed = accesses.stream()
                .filter(access -> stored.getId().equals(access.getId()))
                .findFirst();
            if (refreshed.isPresent()) {
                session.setAttribute(SELECTED_ACCESS_ATTRIBUTE, refreshed.get());
                return refreshed.get();
            }
            session.removeAttribute(SELECTED_ACCESS_ATTRIBUTE);
        }

        if (accesses.size() == 1) {
            session.setAttribute(SELECTED_ACCESS_ATTRIBUTE, accesses.get(0));
            return accesses.get(0);
        }
        return null;
    }

    public BethaAccess select(final HttpSession session,
                              final List<BethaAccess> accesses,
                              final String accessId,
                              final String exercise) {
        final BethaAccess selected = accesses.stream()
            .filter(access -> access.getId().equals(accessId))
            .findFirst()
            .orElseThrow(InvalidContextException::new);
        session.setAttribute(SELECTED_ACCESS_ATTRIBUTE, selected);
        if (exercise == null || exercise.trim().isEmpty()) {
            session.removeAttribute(EXERCISE_ATTRIBUTE);
        } else {
            session.setAttribute(EXERCISE_ATTRIBUTE, exercise.trim());
        }
        return selected;
    }

    public BethaAccess requireSelected(final HttpSession session) {
        if (session == null) {
            throw new ContextRequiredException();
        }
        final BethaAccess selected = (BethaAccess) session.getAttribute(SELECTED_ACCESS_ATTRIBUTE);
        if (selected == null) {
            throw new ContextRequiredException();
        }
        return selected;
    }

    public BethaAccess requireAccepted(final HttpSession session) {
        final BethaAccess selected = requireSelected(session);
        if (!selected.isAccepted()) {
            throw new TermNotAcceptedException();
        }
        return selected;
    }

    public String getExercise(final HttpSession session) {
        return session == null ? null : (String) session.getAttribute(EXERCISE_ATTRIBUTE);
    }

    public int getSystemId() {
        return systemId;
    }
}
