package com.jobprepos.dto;

import lombok.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryDto {
    private Integer currentDay;
    private Integer completedDaysCount;
    private Double completionPercentage;
    private BigDecimal totalStudyHours;
    private Integer totalDsaProblemsSolved;
    private Integer totalJobsApplied;
    private Integer currentStreakDays;
    
    private String todayScheduleType; // Core CS + Coding vs Web Dev + Backend + AI/ML
    private Map<String, Object> todayPlan;
    private DailyLogDto todayLog;

    private List<DailyLogDto> recentActivityLogs;
}
