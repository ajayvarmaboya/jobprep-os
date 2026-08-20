package com.jobprepos.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyLogDto {
    private UUID id;
    private UUID userId;
    
    @NotNull(message = "Log date is required")
    private LocalDate logDate;

    @Min(value = 1, message = "Day number must be at least 1")
    @Max(value = 60, message = "Day number cannot exceed 60")
    private Integer dayNumber;

    private String completionStatus; // DONE, PARTIAL, RESET

    private BigDecimal totalStudyHours;
    private BigDecimal javaHours;
    private BigDecimal dsaHours;
    private BigDecimal springBootHours;
    private BigDecimal awsHours;
    private BigDecimal aiMlHours;
    private BigDecimal projectHours;

    private Integer jobsAppliedCount;

    private String reflectionLearned;
    private String reflectionDifficulties;
    private String reflectionTomorrowFocus;
}
