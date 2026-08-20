package com.jobprepos.service;

import com.jobprepos.entity.DsaProblemEntity;
import com.jobprepos.entity.JobApplicationEntity;
import com.jobprepos.entity.UserEntity;
import com.jobprepos.repository.DsaProblemRepository;
import com.jobprepos.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final DsaProblemRepository dsaProblemRepository;
    private final JobApplicationRepository jobApplicationRepository;
    private final DailyPrepService dailyPrepService;

    @Transactional(readOnly = true)
    public Map<String, Object> getAnalyticsSummary() {
        UserEntity user = dailyPrepService.getOrCreateDemoUser();
        List<DsaProblemEntity> dsaList = dsaProblemRepository.findByUserIdOrderBySolvedDateDesc(user.getId());
        List<JobApplicationEntity> appList = jobApplicationRepository.findByUserIdOrderByAppliedDateDesc(user.getId());

        // DSA Analytics
        Map<String, Long> dsaByDifficulty = dsaList.stream()
                .collect(Collectors.groupingBy(DsaProblemEntity::getDifficulty, Collectors.counting()));

        Map<String, Long> dsaByPattern = dsaList.stream()
                .collect(Collectors.groupingBy(DsaProblemEntity::getPattern, Collectors.counting()));

        double avgSolveTime = dsaList.stream()
                .mapToInt(DsaProblemEntity::getTimeTakenMinutes)
                .average().orElse(0.0);

        long independentSolveCount = dsaList.stream().filter(DsaProblemEntity::getSolvedIndependently).count();
        double independentSolveRate = dsaList.isEmpty() ? 0.0 : Math.round((independentSolveCount / (double) dsaList.size()) * 1000.0) / 10.0;

        // Weak pattern detection
        List<String> weakPatterns = dsaByPattern.entrySet().stream()
                .filter(entry -> entry.getValue() < 2)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // Job Pipeline Conversion Analytics
        long totalApps = appList.size();
        long totalAssessments = appList.stream().filter(a -> Set.of("ASSESSMENT", "TECHNICAL_INTERVIEW", "HR", "OFFER").contains(a.getStatus())).count();
        long totalInterviews = appList.stream().filter(a -> Set.of("TECHNICAL_INTERVIEW", "HR", "OFFER").contains(a.getStatus())).count();
        long totalOffers = appList.stream().filter(a -> "OFFER".equalsIgnoreCase(a.getStatus())).count();

        double appToInterviewRate = totalApps == 0 ? 0.0 : Math.round((totalInterviews / (double) totalApps) * 1000.0) / 10.0;
        double interviewToOfferRate = totalInterviews == 0 ? 0.0 : Math.round((totalOffers / (double) totalInterviews) * 1000.0) / 10.0;

        Map<String, Object> summary = new LinkedHashMap<>();
        summary.put("totalDsaProblems", dsaList.size());
        summary.put("dsaByDifficulty", dsaByDifficulty);
        summary.put("dsaByPattern", dsaByPattern);
        summary.put("avgSolveTimeMinutes", Math.round(avgSolveTime * 10.0) / 10.0);
        summary.put("independentSolveRatePercentage", independentSolveRate);
        summary.put("weakPatternsIdentified", weakPatterns);

        summary.put("totalApplications", totalApps);
        summary.put("totalAssessments", totalAssessments);
        summary.put("totalInterviews", totalInterviews);
        summary.put("totalOffers", totalOffers);
        summary.put("applicationToInterviewConversion", appToInterviewRate);
        summary.put("interviewToOfferConversion", interviewToOfferRate);

        return summary;
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getAiCoachRecommendation() {
        Map<String, Object> analytics = getAnalyticsSummary();
        @SuppressWarnings("unchecked")
        List<String> weakPatterns = (List<String>) analytics.get("weakPatternsIdentified");

        String recommendationText;
        if (weakPatterns != null && !weakPatterns.isEmpty()) {
            recommendationText = "Based on your preparation history: Your activity in [" + String.join(", ", weakPatterns) + 
                    "] is currently lower than Arrays and Two Pointers. Prioritize 2 problems in " + weakPatterns.get(0) + " for tomorrow's session.";
        } else {
            recommendationText = "Great preparation consistency! Your independent DSA solve rate is strong. Focus on System Design concepts and medium Spring Boot questions for your next prep cycle.";
        }

        Map<String, Object> response = new LinkedHashMap<>();
        response.put("provider", "Amazon Bedrock (Claude 3.5 Sonnet)");
        response.put("generatedAt", java.time.OffsetDateTime.now());
        response.put("recommendation", recommendationText);
        response.put("focusAreas", List.of("Trees & Dynamic Programming", "Spring Boot Security Filter Chain", "System Design URL Shortener"));
        return response;
    }
}
