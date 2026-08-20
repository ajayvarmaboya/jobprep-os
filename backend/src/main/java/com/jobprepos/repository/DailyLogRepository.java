package com.jobprepos.repository;

import com.jobprepos.entity.DailyLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DailyLogRepository extends JpaRepository<DailyLogEntity, UUID> {
    Optional<DailyLogEntity> findByUserIdAndLogDate(UUID userId, LocalDate logDate);
    Optional<DailyLogEntity> findByUserIdAndDayNumber(UUID userId, Integer dayNumber);
    List<DailyLogEntity> findByUserIdOrderByLogDateDesc(UUID userId);
    List<DailyLogEntity> findByUserIdAndLogDateBetween(UUID userId, LocalDate startDate, LocalDate endDate);
}
