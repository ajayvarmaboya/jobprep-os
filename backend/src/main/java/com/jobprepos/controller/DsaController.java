package com.jobprepos.controller;

import com.jobprepos.dto.DsaProblemDto;
import com.jobprepos.service.DsaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/dsa")
@RequiredArgsConstructor
public class DsaController {

    private final DsaService dsaService;

    @GetMapping
    public ResponseEntity<List<DsaProblemDto>> getAllProblems(
            @RequestParam(required = false) String pattern,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) Boolean needsRevision) {
        return ResponseEntity.ok(dsaService.getAllProblems(pattern, difficulty, needsRevision));
    }

    @PostMapping
    public ResponseEntity<DsaProblemDto> createProblem(@Valid @RequestBody DsaProblemDto dto) {
        return new ResponseEntity<>(dsaService.createProblem(dto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<DsaProblemDto> updateProblem(
            @PathVariable UUID id,
            @RequestBody DsaProblemDto dto) {
        return ResponseEntity.ok(dsaService.updateProblem(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable UUID id) {
        dsaService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }
}
