package com.jobprepos.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DsaProblemDto {
    private UUID id;
    private UUID userId;

    @NotBlank(message = "Problem title is required")
    private String problemTitle;

    @NotBlank(message = "Platform is required")
    private String platform;

    @NotBlank(message = "Difficulty is required")
    private String difficulty;

    @NotBlank(message = "Pattern is required")
    private String pattern;

    private Integer timeTakenMinutes;
    private Boolean hintsUsed;
    private Boolean solvedIndependently;
    private Boolean needsRevision;
    private String solutionUrl;
    private String notes;
    private LocalDate solvedDate;
}
