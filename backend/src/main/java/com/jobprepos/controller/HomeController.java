package com.jobprepos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.OffsetDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class HomeController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> home() {
        Map<String, Object> status = new LinkedHashMap<>();
        status.put("service", "JobPrep OS Cloud REST API Service");
        status.put("status", "UP");
        status.put("version", "1.0.0-SNAPSHOT");
        status.put("timestamp", OffsetDateTime.now());
        status.put("documentation", "/api/v1/daily/dashboard");
        return ResponseEntity.ok(status);
    }
}
