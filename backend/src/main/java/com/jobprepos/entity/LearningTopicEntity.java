package com.jobprepos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "learning_topics", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"user_id", "tech_name", "topic_name"})
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningTopicEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "tech_name", nullable = false)
    private String techName; // Java, DSA, SQL, Spring Boot, AWS, System Design, React, AI/ML

    @Column(name = "topic_name", nullable = false)
    private String topicName;

    @Column(nullable = false)
    @Builder.Default
    private String status = "NOT_STARTED"; // NOT_STARTED, IN_PROGRESS, COMPLETED, NEEDS_REVISION

    @Column(name = "last_reviewed_at")
    private OffsetDateTime lastReviewedAt;

    @PrePersist
    @PreUpdate
    protected void onSave() {
        lastReviewedAt = OffsetDateTime.now();
    }
}
