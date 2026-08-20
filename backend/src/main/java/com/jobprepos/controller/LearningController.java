package com.jobprepos.controller;

import com.jobprepos.dto.LearningTopicDto;
import com.jobprepos.service.LearningService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/learning")
@RequiredArgsConstructor
public class LearningController {

    private final LearningService learningService;

    @GetMapping
    public ResponseEntity<Map<String, List<LearningTopicDto>>> getTechTree() {
        return ResponseEntity.ok(learningService.getTechTree());
    }

    @PutMapping("/topic")
    public ResponseEntity<LearningTopicDto> updateTopicStatus(@RequestBody LearningTopicDto dto) {
        return ResponseEntity.ok(learningService.updateTopicStatus(dto));
    }
}
