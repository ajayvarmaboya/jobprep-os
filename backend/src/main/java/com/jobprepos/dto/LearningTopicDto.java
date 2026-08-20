package com.jobprepos.dto;

import lombok.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LearningTopicDto {
    private UUID id;
    private UUID userId;
    private String techName;
    private String topicName;
    private String status; // NOT_STARTED, IN_PROGRESS, COMPLETED, NEEDS_REVISION
    private OffsetDateTime lastReviewedAt;
}
