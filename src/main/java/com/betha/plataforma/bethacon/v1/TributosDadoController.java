package com.betha.plataforma.bethacon.v1;

import com.betha.plataforma.bethacon.provider.TributosApi;
import com.betha.plataforma.bethacon.service.RequestService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = {"http://localhost:4200", "https://demobethacon.plataforma.betha.cloud/"})
public class TributosDadoController {

    private final TributosApi tributosApi;

    private final RequestService requestService;


    public TributosDadoController(TributosApi tributosApi, RequestService requestService) {
        this.tributosApi = tributosApi;
        this.requestService = requestService;
    }

    @GetMapping({"contribuinte"})
    public Object findContribuintes(@RequestParam(value = "offset") int offset,
                                    @RequestParam(value = "limit") int limit,
                                    @RequestParam(value = "sort") String sort,
                                    @RequestParam(value = "filter") String filter) throws IOException {
        String jsonString = tributosApi.findContribuintes(this.requestService.getMapHeaders(), offset, limit, sort, filter);
        return this.requestService.serializaStringJson(jsonString);
    }

    @GetMapping({"imovel"})
    public Object findImoveis(@RequestParam(value = "offset") int offset,
                              @RequestParam(value = "limit") int limit,
                              @RequestParam(value = "sort") String sort,
                              @RequestParam(value = "filter") String filter) throws IOException {
        String jsonString = tributosApi.findImoveis(this.requestService.getMapHeaders(), offset, limit, sort, filter);
        return this.requestService.serializaStringJson(jsonString);
    }
}
