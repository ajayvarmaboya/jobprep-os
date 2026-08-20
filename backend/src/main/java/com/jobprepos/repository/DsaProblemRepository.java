package com.jobprepos.repository;

import com.jobprepos.entity.DsaProblemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface DsaProblemRepository extends JpaRepository<DsaProblemEntity, UUID> {

    List<DsaProblemEntity> findByUserIdOrderBySolvedDateDesc(UUID userId);

    List<DsaProblemEntity> findByUserIdAndPattern(UUID userId, String pattern);

    List<DsaProblemEntity> findByUserIdAndDifficulty(UUID userId, String difficulty);

    List<DsaProblemEntity> findByUserIdAndNeedsRevisionTrue(UUID userId);

    @Query("SELECT p.pattern AS pattern, COUNT(p) AS totalSolved, " +
           "SUM(CASE WHEN p.solvedIndependently = true THEN 1 ELSE 0 END) AS independentSolved, " +
           "AVG(p.timeTakenMinutes) AS avgTime " +
           "FROM DsaProblemEntity p WHERE p.userId = :userId GROUP BY p.pattern")
    List<Object[]> findPatternStatsByUserId(@Param("userId") UUID userId);

    @Query("SELECT p.difficulty AS difficulty, COUNT(p) AS count " +
           "FROM DsaProblemEntity p WHERE p.userId = :userId GROUP BY p.difficulty")
    List<Object[]> findDifficultyStatsByUserId(@Param("userId") UUID userId);
}
