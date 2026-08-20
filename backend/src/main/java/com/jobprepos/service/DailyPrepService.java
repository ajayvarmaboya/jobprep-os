package com.jobprepos.service;

import com.jobprepos.dto.DailyLogDto;
import com.jobprepos.dto.DashboardSummaryDto;
import com.jobprepos.entity.DailyLogEntity;
import com.jobprepos.entity.UserEntity;
import com.jobprepos.exception.ResourceNotFoundException;
import com.jobprepos.repository.DailyLogRepository;
import com.jobprepos.repository.DsaProblemRepository;
import com.jobprepos.repository.JobApplicationRepository;
import com.jobprepos.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DailyPrepService {

    private final DailyLogRepository dailyLogRepository;
    private final UserRepository userRepository;
    private final DsaProblemRepository dsaProblemRepository;
    private final JobApplicationRepository jobApplicationRepository;

    public UserEntity getOrCreateDemoUser() {
        return userRepository.findByCognitoSub("demo-user-123")
                .orElseGet(() -> userRepository.save(UserEntity.builder()
                        .cognitoSub("demo-user-123")
                        .email("ajay.prep@example.com")
                        .fullName("Ajay")
                        .targetRole("Software Development Engineer")
                        .prepStartDate(LocalDate.now().minusDays(19))
                        .currentStreak(8)
                        .build()));
    }

    @Transactional(readOnly = true)
    public DashboardSummaryDto getDashboardSummary() {
        UserEntity user = getOrCreateDemoUser();
        LocalDate today = LocalDate.now();

        List<DailyLogEntity> logs = dailyLogRepository.findByUserIdOrderByLogDateDesc(user.getId());
        long completedDays = logs.stream().filter(l -> "DONE".equalsIgnoreCase(l.getCompletionStatus())).count();

        BigDecimal totalHours = logs.stream()
                .map(DailyLogEntity::getTotalStudyHours)
                .filter(Objects::nonNull)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        int dsaCount = (int) dsaProblemRepository.count();
        int jobCount = (int) jobApplicationRepository.count();

        long daysBetween = java.time.temporal.ChronoUnit.DAYS.between(user.getPrepStartDate(), today);
        int currentDay = Math.min(60, Math.max(1, (int) daysBetween + 1));

        Optional<DailyLogEntity> todayLogOpt = dailyLogRepository.findByUserIdAndLogDate(user.getId(), today);
        DailyLogDto todayLogDto = todayLogOpt.map(this::mapToDto).orElse(null);

        String scheduleType = currentDay % 2 == 1 ? "Core CS + Coding" : "Web Dev + Backend + AI/ML";

        return DashboardSummaryDto.builder()
                .currentDay(currentDay)
                .completedDaysCount((int) completedDays)
                .completionPercentage(Math.round((completedDays / 60.0) * 1000.0) / 10.0)
                .totalStudyHours(totalHours)
                .totalDsaProblemsSolved(dsaCount)
                .totalJobsApplied(jobCount)
                .currentStreakDays(user.getCurrentStreak())
                .todayScheduleType(scheduleType)
                .todayLog(todayLogDto)
                .recentActivityLogs(logs.stream().limit(7).map(this::mapToDto).toList())
                .build();
    }

    @Transactional
    public DailyLogDto saveOrUpdateDailyLog(DailyLogDto dto) {
        UserEntity user = getOrCreateDemoUser();
        LocalDate targetDate = dto.getLogDate() != null ? dto.getLogDate() : LocalDate.now();

        DailyLogEntity entity = dailyLogRepository.findByUserIdAndLogDate(user.getId(), targetDate)
                .orElseGet(() -> DailyLogEntity.builder()
                        .userId(user.getId())
                        .logDate(targetDate)
                        .dayNumber(dto.getDayNumber() != null ? dto.getDayNumber() : 1)
                        .build());

        entity.setDayNumber(dto.getDayNumber() != null ? dto.getDayNumber() : entity.getDayNumber());
        entity.setCompletionStatus(dto.getCompletionStatus() != null ? dto.getCompletionStatus() : "PARTIAL");
        
        BigDecimal total = BigDecimal.ZERO;
        if (dto.getJavaHours() != null) { entity.setJavaHours(dto.getJavaHours()); total = total.add(dto.getJavaHours()); }
        if (dto.getDsaHours() != null) { entity.setDsaHours(dto.getDsaHours()); total = total.add(dto.getDsaHours()); }
        if (dto.getSpringBootHours() != null) { entity.setSpringBootHours(dto.getSpringBootHours()); total = total.add(dto.getSpringBootHours()); }
        if (dto.getAwsHours() != null) { entity.setAwsHours(dto.getAwsHours()); total = total.add(dto.getAwsHours()); }
        if (dto.getAiMlHours() != null) { entity.setAiMlHours(dto.getAiMlHours()); total = total.add(dto.getAiMlHours()); }
        if (dto.getProjectHours() != null) { entity.setProjectHours(dto.getProjectHours()); total = total.add(dto.getProjectHours()); }
        
        entity.setTotalStudyHours(dto.getTotalStudyHours() != null ? dto.getTotalStudyHours() : total);
        entity.setJobsAppliedCount(dto.getJobsAppliedCount() != null ? dto.getJobsAppliedCount() : 0);
        entity.setReflectionLearned(dto.getReflectionLearned());
        entity.setReflectionDifficulties(dto.getReflectionDifficulties());
        entity.setReflectionTomorrowFocus(dto.getReflectionTomorrowFocus());

        DailyLogEntity saved = dailyLogRepository.save(entity);
        return mapToDto(saved);
    }

    @Transactional(readOnly = true)
    public DailyLogDto getDailyLogByDate(LocalDate date) {
        UserEntity user = getOrCreateDemoUser();
        DailyLogEntity entity = dailyLogRepository.findByUserIdAndLogDate(user.getId(), date)
                .orElseThrow(() -> new ResourceNotFoundException("No daily log found for date: " + date));
        return mapToDto(entity);
    }

    @Transactional(readOnly = true)
    public List<DailyLogDto> getDailyHistory() {
        UserEntity user = getOrCreateDemoUser();
        return dailyLogRepository.findByUserIdOrderByLogDateDesc(user.getId())
                .stream().map(this::mapToDto).toList();
    }

    private DailyLogDto mapToDto(DailyLogEntity entity) {
        return DailyLogDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .logDate(entity.getLogDate())
                .dayNumber(entity.getDayNumber())
                .completionStatus(entity.getCompletionStatus())
                .totalStudyHours(entity.getTotalStudyHours())
                .javaHours(entity.getJavaHours())
                .dsaHours(entity.getDsaHours())
                .springBootHours(entity.getSpringBootHours())
                .awsHours(entity.getAwsHours())
                .aiMlHours(entity.getAiMlHours())
                .projectHours(entity.getProjectHours())
                .jobsAppliedCount(entity.getJobsAppliedCount())
                .reflectionLearned(entity.getReflectionLearned())
                .reflectionDifficulties(entity.getReflectionDifficulties())
                .reflectionTomorrowFocus(entity.getReflectionTomorrowFocus())
                .build();
    }
}
