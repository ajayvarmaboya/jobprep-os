package com.jobprepos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "dsa_problems", indexes = {
    @Index(name = "idx_dsa_user_pattern", columnList = "user_id, pattern"),
    @Index(name = "idx_dsa_user_difficulty", columnList = "user_id, difficulty")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DsaProblemEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "problem_title", nullable = false)
    private String problemTitle;

    @Column(nullable = false)
    private String platform; // LeetCode, GFG, HackerRank, CodeChef

    @Column(nullable = false)
    private String difficulty; // EASY, MEDIUM, HARD

    @Column(nullable = false)
    private String pattern; // Two Pointers, Dynamic Programming, Trees...

    @Column(name = "time_taken_minutes")
    @Builder.Default
    private Integer timeTakenMinutes = 0;

    @Column(name = "hints_used")
    @Builder.Default
    private Boolean hintsUsed = false;

    @Column(name = "solved_independently")
    @Builder.Default
    private Boolean solvedIndependently = true;

    @Column(name = "needs_revision")
    @Builder.Default
    private Boolean needsRevision = false;

    @Column(name = "solution_url", columnDefinition = "TEXT")
    private String solutionUrl;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Column(name = "solved_date", nullable = false)
    @Builder.Default
    private LocalDate solvedDate = LocalDate.now();

    @Column(name = "created_at", updatable = false)
    private OffsetDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = OffsetDateTime.now();
    }
}
