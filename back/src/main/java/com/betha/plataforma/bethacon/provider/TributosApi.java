package com.betha.plataforma.bethacon.provider;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "tributos", url = "https://tributos.suite.betha.cloud/dados/v1/")
public interface TributosApi {
    @RequestMapping(method = RequestMethod.GET, path = "/contribuintes")
    String findContribuintes(@RequestHeader Map<String, String> headerMap,
                     @RequestParam(value = "offset") int offset,
                     @RequestParam(value = "limit") int limit,
                     @RequestParam(value = "sort") String sort,
                     @RequestParam(value = "filter") String filter);

    @RequestMapping(method = RequestMethod.GET, path = "/imoveis")
    String findImoveis(@RequestHeader Map<String, String> headerMap,
                   @RequestParam(value = "offset") int offset,
                   @RequestParam(value = "limit") int limit,
                   @RequestParam(value = "sort") String sort,
                   @RequestParam(value = "filter") String filter);
}
