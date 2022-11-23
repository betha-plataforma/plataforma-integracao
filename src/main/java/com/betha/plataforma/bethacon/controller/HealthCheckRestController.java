package com.betha.plataforma.bethacon.controller;

import org.springframework.boot.actuate.health.HealthComponent;
import org.springframework.boot.actuate.health.HealthEndpoint;
import org.springframework.boot.actuate.health.Status;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class HealthCheckRestController {

    private final HealthEndpoint healthEndpoint;

    public HealthCheckRestController(HealthEndpoint healthEndpoint) {
        this.healthEndpoint = healthEndpoint;
    }

    @GetMapping("/health/alive")
    public ResponseEntity<?> healthAlive() {
        return ResponseEntity.ok("{ \"status\": \"OK\" }");
    }

    @GetMapping("/health/check")
    public ResponseEntity<?> healthCheck() {
        HealthComponent health = healthEndpoint.health();

        return ResponseEntity.status(health.getStatus() == Status.DOWN ? HttpStatus.SERVICE_UNAVAILABLE : HttpStatus.OK)
                .body(health);
    }


}

