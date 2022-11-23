package com.betha.plataforma.bethacon.service;

import com.betha.plataforma.bethacon.model.cadastrounico.ComandoCadastroUnico;
import com.betha.plataforma.bethacon.model.cadastrounico.Dado;
import com.betha.plataforma.bethacon.model.cadastrounico.EnvioComando;
import com.betha.plataforma.bethacon.repository.ResponsavelRepository;
import com.betha.plataforma.bethacon.model.Responsavel;
import com.betha.plataforma.bethacon.provider.CadastroUnicoApi;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class ResponsavelService implements ComandoCadastroUnico<Responsavel> {

    private final ResponsavelRepository repository;

    private final CadastroUnicoApi cadastroUnicoApi;

    public ResponsavelService(ResponsavelRepository repository, CadastroUnicoApi cadastroUnicoApi) {
        this.repository = repository;
        this.cadastroUnicoApi = cadastroUnicoApi;
    }

    public boolean isResponsavelValido(Responsavel responsavel) {
        return this.repository.findByCpf(responsavel.getCpf()) == null;
    }
    public Responsavel salva(Responsavel responsavel) {
        responsavel.setId(UUID.randomUUID().toString());
        responsavel.setDataCriacao(new Date());
        this.comandoEnvio(responsavel);
        return this.repository.save(responsavel);
    }

    public Responsavel altera(Responsavel responsavel) {
        responsavel.setDataAlteracao(new Date());
        this.comandoEnvio(responsavel);
        return this.repository.save(responsavel);
    }

    @Override
    public void comandoEnvio(Responsavel responsavel) {
        //Envio de comando de alteração para o cadastro único
        Map<String, Object> mapResponsavel = new HashMap<>();
        mapResponsavel.put("nome", responsavel.getNome());
        mapResponsavel.put("cpf", responsavel.getCpf());

        Dado dadoBuild = Dado.builder()
                .aggregate("responsaveis")
                .template("pessoas")
                .id("id")
                .user("user")
                .data(mapResponsavel)
                .build();

        EnvioComando envioComandoBuild = EnvioComando.builder()
                .action(EnvioComando.Action.UPDATE)
                .data(dadoBuild)
                .build();

        this.cadastroUnicoApi.enviaCommand(SerializarObjeto.serializar(envioComandoBuild));
    }
}
