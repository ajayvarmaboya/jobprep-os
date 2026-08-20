package com.jobprepos.controller;

import com.jobprepos.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    @GetMapping("/summary")
    public ResponseEntity<Map<String, Object>> getAnalyticsSummary() {
        return ResponseEntity.ok(analyticsService.getAnalyticsSummary());
    }

    @PostMapping("/ai-coach")
    public ResponseEntity<Map<String, Object>> getAiCoachRecommendation() {
        return ResponseEntity.ok(analyticsService.getAiCoachRecommendation());
    }
}
