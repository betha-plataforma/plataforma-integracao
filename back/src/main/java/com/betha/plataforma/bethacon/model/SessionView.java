package com.betha.plataforma.bethacon.model;

import com.betha.plataforma.bethacon.auth.OauthToken;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Visão da sessão entregue ao frontend. Não contém access token nem refresh token.
 */
public class SessionView {

    private final UserView user;
    private final List<ContextView> contexts;
    private final ContextView selectedContext;
    private final int systemId;
    private final String exercise;
    private final String managerUrl;
    private final Map<String, Object> capabilities;

    public SessionView(final Usuario user,
                       final OauthToken token,
                       final List<BethaAccess> accesses,
                       final BethaAccess selected,
                       final int systemId,
                       final String exercise,
                       final String managerUrl,
                       final Map<String, Object> capabilities) {
        this.user = new UserView(resolveUserId(user, token), user.getNome(), user.getEmail(), "/api/user/photo");
        this.contexts = new ArrayList<>();
        accesses.forEach(access -> this.contexts.add(new ContextView(access)));
        this.selectedContext = selected == null ? null : new ContextView(selected);
        this.systemId = systemId;
        this.exercise = exercise;
        this.managerUrl = managerUrl;
        this.capabilities = capabilities == null ? Collections.emptyMap() : capabilities;
    }

    public UserView getUser() {
        return user;
    }

    public List<ContextView> getContexts() {
        return contexts;
    }

    public ContextView getSelectedContext() {
        return selectedContext;
    }

    public int getSystemId() {
        return systemId;
    }

    public String getExercise() {
        return exercise;
    }

    public String getManagerUrl() {
        return managerUrl;
    }

    public Map<String, Object> getCapabilities() {
        return capabilities;
    }

    private static String resolveUserId(final Usuario user, final OauthToken token) {
        if (user.getUser() != null) {
            return user.getUser();
        }
        if (user.getId() != null) {
            return user.getId();
        }
        return token.getUser();
    }

    public static class UserView {
        private final String id;
        private final String name;
        private final String email;
        private final String photoUrl;

        UserView(final String id, final String name, final String email, final String photoUrl) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.photoUrl = photoUrl;
        }

        public String getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getPhotoUrl() {
            return photoUrl;
        }
    }

    public static class ContextView {
        private final String accessId;
        private final String description;
        private final String complement;
        private final String context;
        private final String database;
        private final String entity;
        private final boolean admin;
        private final boolean technical;
        private final boolean accepted;

        ContextView(final BethaAccess access) {
            this.accessId = access.getId();
            this.database = access.getValues().get("database");
            this.entity = access.getValues().get("entity");
            this.description = entity == null ? "Contexto " + access.getId() : "Entidade " + entity;
            this.complement = database == null ? null : "Database " + database;
            this.context = access.getContext();
            this.admin = access.isAdmin();
            this.technical = access.isTechnical();
            this.accepted = access.isAccepted();
        }

        public String getAccessId() {
            return accessId;
        }

        public String getDescription() {
            return description;
        }

        public String getComplement() {
            return complement;
        }

        public String getContext() {
            return context;
        }

        public String getDatabase() {
            return database;
        }

        public String getEntity() {
            return entity;
        }

        public boolean isAdmin() {
            return admin;
        }

        public boolean isTechnical() {
            return technical;
        }

        public boolean isAccepted() {
            return accepted;
        }
    }
}
