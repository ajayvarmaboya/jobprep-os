package com.jobprepos.controller;

import com.jobprepos.dto.JobApplicationDto;
import com.jobprepos.service.ApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping
    public ResponseEntity<List<JobApplicationDto>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @PostMapping
    public ResponseEntity<JobApplicationDto> createApplication(@Valid @RequestBody JobApplicationDto dto) {
        return new ResponseEntity<>(applicationService.createApplication(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<JobApplicationDto> updateStatus(
            @PathVariable UUID id,
            @RequestParam String status) {
        return ResponseEntity.ok(applicationService.updateApplicationStatus(id, status));
    }

    @PostMapping("/{id}/resume-url")
    public ResponseEntity<Map<String, String>> generatePresignedResumeUploadUrl(
            @PathVariable UUID id,
            @RequestParam String fileName) {
        String url = applicationService.generatePresignedResumeUploadUrl(id, fileName);
        return ResponseEntity.ok(Map.of("uploadUrl", url, "expiresInSeconds", "900"));
    }
}
