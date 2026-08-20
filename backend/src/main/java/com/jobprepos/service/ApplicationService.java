package com.jobprepos.service;

import com.jobprepos.dto.JobApplicationDto;
import com.jobprepos.entity.JobApplicationEntity;
import com.jobprepos.entity.UserEntity;
import com.jobprepos.exception.ResourceNotFoundException;
import com.jobprepos.repository.JobApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final DailyPrepService dailyPrepService;

    @Transactional(readOnly = true)
    public List<JobApplicationDto> getAllApplications() {
        UserEntity user = dailyPrepService.getOrCreateDemoUser();
        return jobApplicationRepository.findByUserIdOrderByAppliedDateDesc(user.getId())
                .stream().map(this::mapToDto).toList();
    }

    @Transactional
    public JobApplicationDto createApplication(JobApplicationDto dto) {
        UserEntity user = dailyPrepService.getOrCreateDemoUser();

        JobApplicationEntity entity = JobApplicationEntity.builder()
                .userId(user.getId())
                .companyName(dto.getCompanyName())
                .roleTitle(dto.getRoleTitle())
                .jobLocation(dto.getJobLocation() != null ? dto.getJobLocation() : "Remote / Hybrid")
                .jobUrl(dto.getJobUrl())
                .status(dto.getStatus() != null ? dto.getStatus() : "APPLIED")
                .appliedDate(dto.getAppliedDate() != null ? dto.getAppliedDate() : LocalDate.now())
                .assessmentDate(dto.getAssessmentDate())
                .interviewDate(dto.getInterviewDate())
                .resumeVersion(dto.getResumeVersion() != null ? dto.getResumeVersion() : "v1.0-SDE")
                .notes(dto.getNotes())
                .build();

        return mapToDto(jobApplicationRepository.save(entity));
    }

    @Transactional
    public JobApplicationDto updateApplicationStatus(UUID id, String status) {
        JobApplicationEntity entity = jobApplicationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Job Application not found with ID: " + id));

        entity.setStatus(status);
        return mapToDto(jobApplicationRepository.save(entity));
    }

    @Transactional
    public String generatePresignedResumeUploadUrl(UUID appId, String fileName) {
        // System design note: In AWS production, this invokes S3 Presigned URL generator using AWS SDK v2
        // e.g. AmazonS3Presigner.generatePresignedUploadUrl(...)
        String s3Key = "resumes/user-demo-123/" + appId + "_" + fileName;
        JobApplicationEntity entity = jobApplicationRepository.findById(appId)
                .orElseThrow(() -> new ResourceNotFoundException("Job Application not found with ID: " + idForError(appId)));
        
        entity.setResumeS3Key(s3Key);
        jobApplicationRepository.save(entity);

        return "https://jobprep-os-bucket.s3.amazonaws.com/" + s3Key + "?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Expires=900";
    }

    private String idForError(UUID appId) { return appId != null ? appId.toString() : "null"; }

    private JobApplicationDto mapToDto(JobApplicationEntity entity) {
        return JobApplicationDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .companyName(entity.getCompanyName())
                .roleTitle(entity.getRoleTitle())
                .jobLocation(entity.getJobLocation())
                .jobUrl(entity.getJobUrl())
                .status(entity.getStatus())
                .appliedDate(entity.getAppliedDate())
                .assessmentDate(entity.getAssessmentDate())
                .interviewDate(entity.getInterviewDate())
                .resumeVersion(entity.getResumeVersion())
                .resumeS3Key(entity.getResumeS3Key())
                .notes(entity.getNotes())
                .build();
    }
}
