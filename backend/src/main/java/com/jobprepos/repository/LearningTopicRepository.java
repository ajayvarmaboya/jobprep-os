package com.jobprepos.repository;

import com.jobprepos.entity.LearningTopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LearningTopicRepository extends JpaRepository<LearningTopicEntity, UUID> {

    List<LearningTopicEntity> findByUserId(UUID userId);

    List<LearningTopicEntity> findByUserIdAndTechName(UUID userId, String techName);

    Optional<LearningTopicEntity> findByUserIdAndTechNameAndTopicName(UUID userId, String techName, String topicName);

    @Query("SELECT t.techName AS techName, t.status AS status, COUNT(t) AS count " +
           "FROM LearningTopicEntity t WHERE t.userId = :userId GROUP BY t.techName, t.status")
    List<Object[]> findTechProgressStatsByUserId(@Param("userId") UUID userId);
}
