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
public class JobApplicationDto {
    private UUID id;
    private UUID userId;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Role title is required")
    private String roleTitle;

    private String jobLocation;
    private String jobUrl;
    private String status; // APPLIED, ASSESSMENT, TECHNICAL_INTERVIEW, HR, OFFER, REJECTED, WITHDRAWN
    private LocalDate appliedDate;
    private LocalDate assessmentDate;
    private LocalDate interviewDate;
    private String resumeVersion;
    private String resumeS3Key;
    private String notes;
}
