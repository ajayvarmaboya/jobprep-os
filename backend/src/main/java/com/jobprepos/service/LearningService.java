package com.jobprepos.service;

import com.jobprepos.dto.LearningTopicDto;
import com.jobprepos.entity.LearningTopicEntity;
import com.jobprepos.entity.UserEntity;
import com.jobprepos.repository.LearningTopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LearningService {

    private final LearningTopicRepository learningTopicRepository;
    private final DailyPrepService dailyPrepService;

    @Transactional(readOnly = true)
    public Map<String, List<LearningTopicDto>> getTechTree() {
        UserEntity user = dailyPrepService.getOrCreateDemoUser();
        List<LearningTopicEntity> topics = learningTopicRepository.findByUserId(user.getId());

        if (topics.isEmpty()) {
            topics = seedDefaultTopics(user.getId());
        }

        return topics.stream()
                .map(this::mapToDto)
                .collect(Collectors.groupingBy(LearningTopicDto::getTechName));
    }

    @Transactional
    public LearningTopicDto updateTopicStatus(LearningTopicDto dto) {
        UserEntity user = dailyPrepService.getOrCreateDemoUser();

        LearningTopicEntity entity = learningTopicRepository
                .findByUserIdAndTechNameAndTopicName(user.getId(), dto.getTechName(), dto.getTopicName())
                .orElseGet(() -> LearningTopicEntity.builder()
                        .userId(user.getId())
                        .techName(dto.getTechName())
                        .topicName(dto.getTopicName())
                        .build());

        entity.setStatus(dto.getStatus() != null ? dto.getStatus() : "IN_PROGRESS");
        return mapToDto(learningTopicRepository.save(entity));
    }

    private List<LearningTopicEntity> seedDefaultTopics(UUID userId) {
        Map<String, List<String>> defaults = Map.of(
            "Java", List.of("OOP Fundamentals", "Collections Framework", "Exception Handling", "Streams & Lambdas", "Multithreading & Concurrency", "JVM Internals"),
            "DSA", List.of("Arrays & Strings", "Two Pointers", "Sliding Window", "Linked List", "Trees & BST", "Graphs (BFS/DFS)", "Dynamic Programming"),
            "Spring Boot", List.of("Dependency Injection & IoC", "REST Controllers", "Spring Data JPA", "Spring Security", "Microservices Architecture"),
            "AWS", List.of("S3 Object Storage", "Cognito Auth", "DynamoDB NoSQL", "ECS Fargate", "Lambda & EventBridge", "CloudWatch Observability"),
            "SQL", List.of("Joins & Aggregations", "Indexes & B-Trees", "Subqueries & Window Functions", "Query Tuning"),
            "React", List.of("JSX & Components", "State & Hooks (useState, useEffect)", "Context API", "React Router", "Performance Optimization"),
            "AI/ML", List.of("Python Fundamentals", "NumPy & Pandas", "Data Visualization", "Scikit-Learn Basics", "RAG & LLM Fundamentals")
        );

        List<LearningTopicEntity> seeded = new ArrayList<>();
        defaults.forEach((tech, topics) -> {
            for (String topic : topics) {
                LearningTopicEntity entity = LearningTopicEntity.builder()
                        .userId(userId)
                        .techName(tech)
                        .topicName(topic)
                        .status("NOT_STARTED")
                        .build();
                seeded.add(learningTopicRepository.save(entity));
            }
        });
        return seeded;
    }

    private LearningTopicDto mapToDto(LearningTopicEntity entity) {
        return LearningTopicDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .techName(entity.getTechName())
                .topicName(entity.getTopicName())
                .status(entity.getStatus())
                .lastReviewedAt(entity.getLastReviewedAt())
                .build();
    }
}
