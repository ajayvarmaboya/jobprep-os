package com.jobprepos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "daily_logs", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "log_date"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DailyLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "log_date", nullable = false)
    private LocalDate logDate;

    @Column(name = "day_number", nullable = false)
    private Integer dayNumber;

    @Column(name = "completion_status", nullable = false)
    @Builder.Default
    private String completionStatus = "RESET"; // DONE, PARTIAL, RESET

    @Column(name = "total_study_hours", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal totalStudyHours = BigDecimal.ZERO;

    @Column(name = "java_hours", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal javaHours = BigDecimal.ZERO;

    @Column(name = "dsa_hours", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal dsaHours = BigDecimal.ZERO;

    @Column(name = "spring_boot_hours", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal springBootHours = BigDecimal.ZERO;

    @Column(name = "aws_hours", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal awsHours = BigDecimal.ZERO;

    @Column(name = "ai_ml_hours", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal aiMlHours = BigDecimal.ZERO;

    @Column(name = "project_hours", precision = 4, scale = 2)
    @Builder.Default
    private BigDecimal projectHours = BigDecimal.ZERO;

    @Column(name = "jobs_applied_count")
    @Builder.Default
    private Integer jobsAppliedCount = 0;

    @Column(name = "reflection_learned", columnDefinition = "TEXT")
    private String reflectionLearned;

    @Column(name = "reflection_difficulties", columnDefinition = "TEXT")
    private String reflectionDifficulties;

    @Column(name = "reflection_tomorrow_focus", columnDefinition = "TEXT")
    private String reflectionTomorrowFocus;

    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
    }
}
