package com.betha.plataforma.bethacon.model.cadastrounico;

import com.betha.jsonpatch.JsonPatchOperation;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;
import java.util.Map;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RecepcaoComando {
    private String changesetId;
    private Metadata metadata;
    private DadosComando data;
    private List<JsonPatchOperation> diff;

    public RecepcaoComando(String changesetId, Metadata metadata, DadosComando data, List<JsonPatchOperation> diff) {
        this.changesetId = changesetId;
        this.metadata = metadata;
        this.data = data;
        this.diff = diff;
    }

    public String getChangesetId() {
        return changesetId;
    }

    public void setChangesetId(String changesetId) {
        this.changesetId = changesetId;
    }

    public Metadata getMetadata() {
        return metadata;
    }

    public void setMetadata(Metadata metadata) {
        this.metadata = metadata;
    }

    public DadosComando getData() {
        return data;
    }

    public void setData(DadosComando data) {
        this.data = data;
    }

    public List<JsonPatchOperation> getDiff() {
        return diff;
    }

    public void setDiff(List<JsonPatchOperation> diff) {
        this.diff = diff;
    }

    @Override
    public String toString() {
        return "RecepcaoComando{" +
                "changesetId='" + changesetId + '\'' +
                ", metadata=" + metadata +
                ", data=" + data +
                ", diff=" + diff +
                '}';
    }

    class Metadata {
        private String database;
        private String user;
        private Map<String, Object> templateRecord;
        private Map<String, Object> resource;
        private Map<String, Object> source;

        public Metadata(String database, String user, Map<String, Object> templateRecord, Map<String, Object> resource, Map<String, Object> source) {
            this.database = database;
            this.user = user;
            this.templateRecord = templateRecord;
            this.resource = resource;
            this.source = source;
        }

        public String getDatabase() {
            return database;
        }

        public void setDatabase(String database) {
            this.database = database;
        }

        public String getUser() {
            return user;
        }

        public void setUser(String user) {
            this.user = user;
        }

        public Map<String, Object> getTemplateRecord() {
            return templateRecord;
        }

        public void setTemplateRecord(Map<String, Object> templateRecord) {
            this.templateRecord = templateRecord;
        }

        public Map<String, Object> getResource() {
            return resource;
        }

        public void setResource(Map<String, Object> resource) {
            this.resource = resource;
        }

        public Map<String, Object> getSource() {
            return source;
        }

        public void setSource(Map<String, Object> source) {
            this.source = source;
        }

        @Override
        public String toString() {
            return "Metadata{" +
                    "database='" + database + '\'' +
                    ", user='" + user + '\'' +
                    ", templateRecord=" + templateRecord +
                    ", resource=" + resource +
                    ", source=" + source +
                    '}';
        }
    }
}
