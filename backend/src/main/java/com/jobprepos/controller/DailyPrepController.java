package com.jobprepos.controller;

import com.jobprepos.dto.DailyLogDto;
import com.jobprepos.dto.DashboardSummaryDto;
import com.jobprepos.service.DailyPrepService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/daily")
@RequiredArgsConstructor
public class DailyPrepController {

    private final DailyPrepService dailyPrepService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardSummaryDto> getDashboardSummary() {
        return ResponseEntity.ok(dailyPrepService.getDashboardSummary());
    }

    @PostMapping
    public ResponseEntity<DailyLogDto> saveOrUpdateDailyLog(@Valid @RequestBody DailyLogDto dto) {
        return ResponseEntity.ok(dailyPrepService.saveOrUpdateDailyLog(dto));
    }

    @GetMapping("/{date}")
    public ResponseEntity<DailyLogDto> getDailyLogByDate(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(dailyPrepService.getDailyLogByDate(date));
    }

    @GetMapping("/history")
    public ResponseEntity<List<DailyLogDto>> getDailyHistory() {
        return ResponseEntity.ok(dailyPrepService.getDailyHistory());
    }
}
