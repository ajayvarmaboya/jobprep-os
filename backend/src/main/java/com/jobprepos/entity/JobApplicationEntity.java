package com.jobprepos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "job_applications", indexes = {
    @Index(name = "idx_apps_user_status", columnList = "user_id, status")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobApplicationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "role_title", nullable = false)
    private String roleTitle;

    @Column(name = "job_location")
    private String jobLocation;

    @Column(name = "job_url", columnDefinition = "TEXT")
    private String jobUrl;

    @Column(nullable = false)
    @Builder.Default
    private String status = "APPLIED"; // APPLIED, ASSESSMENT, TECHNICAL_INTERVIEW, HR, OFFER, REJECTED, WITHDRAWN

    @Column(name = "applied_date", nullable = false)
    @Builder.Default
    private LocalDate appliedDate = LocalDate.now();

    @Column(name = "assessment_date")
    private LocalDate assessmentDate;

    @Column(name = "interview_date")
    private LocalDate interviewDate;

    @Column(name = "resume_version")
    private String resumeVersion;

    @Column(name = "resume_s3_key")
    private String resumeS3Key;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @Column(name = "updated_at")
    private OffsetDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
        updatedAt = OffsetDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = OffsetDateTime.now();
    }
}
