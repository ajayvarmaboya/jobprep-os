package com.jobprepos.repository;

import com.jobprepos.entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, UUID> {

    List<JobApplicationEntity> findByUserIdOrderByAppliedDateDesc(UUID userId);

    List<JobApplicationEntity> findByUserIdAndStatus(UUID userId, String status);

    @Query("SELECT a.status AS status, COUNT(a) AS count " +
           "FROM JobApplicationEntity a WHERE a.userId = :userId GROUP BY a.status")
    List<Object[]> findStatusStatsByUserId(@Param("userId") UUID userId);
}
