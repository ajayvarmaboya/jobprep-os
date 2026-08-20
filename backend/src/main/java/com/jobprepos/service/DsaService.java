package com.jobprepos.service;

import com.jobprepos.dto.DsaProblemDto;
import com.jobprepos.entity.DsaProblemEntity;
import com.jobprepos.entity.UserEntity;
import com.jobprepos.exception.ResourceNotFoundException;
import com.jobprepos.repository.DsaProblemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DsaService {

    private final DsaProblemRepository dsaProblemRepository;
    private final DailyPrepService dailyPrepService;

    @Transactional(readOnly = true)
    public List<DsaProblemDto> getAllProblems(String pattern, String difficulty, Boolean needsRevision) {
        UserEntity user = dailyPrepService.getOrCreateDemoUser();
        List<DsaProblemEntity> problems = dsaProblemRepository.findByUserIdOrderBySolvedDateDesc(user.getId());

        return problems.stream()
                .filter(p -> pattern == null || pattern.equalsIgnoreCase(p.getPattern()))
                .filter(p -> difficulty == null || difficulty.equalsIgnoreCase(p.getDifficulty()))
                .filter(p -> needsRevision == null || needsRevision.equals(p.getNeedsRevision()))
                .map(this::mapToDto)
                .toList();
    }

    @Transactional
    public DsaProblemDto createProblem(DsaProblemDto dto) {
        UserEntity user = dailyPrepService.getOrCreateDemoUser();

        DsaProblemEntity entity = DsaProblemEntity.builder()
                .userId(user.getId())
                .problemTitle(dto.getProblemTitle())
                .platform(dto.getPlatform() != null ? dto.getPlatform() : "LeetCode")
                .difficulty(dto.getDifficulty() != null ? dto.getDifficulty() : "MEDIUM")
                .pattern(dto.getPattern() != null ? dto.getPattern() : "Arrays")
                .timeTakenMinutes(dto.getTimeTakenMinutes() != null ? dto.getTimeTakenMinutes() : 30)
                .hintsUsed(dto.getHintsUsed() != null ? dto.getHintsUsed() : false)
                .solvedIndependently(dto.getSolvedIndependently() != null ? dto.getSolvedIndependently() : true)
                .needsRevision(dto.getNeedsRevision() != null ? dto.getNeedsRevision() : false)
                .solutionUrl(dto.getSolutionUrl())
                .notes(dto.getNotes())
                .solvedDate(dto.getSolvedDate() != null ? dto.getSolvedDate() : LocalDate.now())
                .build();

        return mapToDto(dsaProblemRepository.save(entity));
    }

    @Transactional
    public DsaProblemDto updateProblem(UUID id, DsaProblemDto dto) {
        DsaProblemEntity entity = dsaProblemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("DSA Problem not found with ID: " + id));

        entity.setProblemTitle(dto.getProblemTitle() != null ? dto.getProblemTitle() : entity.getProblemTitle());
        entity.setPlatform(dto.getPlatform() != null ? dto.getPlatform() : entity.getPlatform());
        entity.setDifficulty(dto.getDifficulty() != null ? dto.getDifficulty() : entity.getDifficulty());
        entity.setPattern(dto.getPattern() != null ? dto.getPattern() : entity.getPattern());
        entity.setTimeTakenMinutes(dto.getTimeTakenMinutes() != null ? dto.getTimeTakenMinutes() : entity.getTimeTakenMinutes());
        entity.setHintsUsed(dto.getHintsUsed() != null ? dto.getHintsUsed() : entity.getHintsUsed());
        entity.setSolvedIndependently(dto.getSolvedIndependently() != null ? dto.getSolvedIndependently() : entity.getSolvedIndependently());
        entity.setNeedsRevision(dto.getNeedsRevision() != null ? dto.getNeedsRevision() : entity.getNeedsRevision());
        entity.setNotes(dto.getNotes() != null ? dto.getNotes() : entity.getNotes());

        return mapToDto(dsaProblemRepository.save(entity));
    }

    @Transactional
    public void deleteProblem(UUID id) {
        if (!dsaProblemRepository.existsById(id)) {
            throw new ResourceNotFoundException("DSA Problem not found with ID: " + id);
        }
        dsaProblemRepository.deleteById(id);
    }

    private DsaProblemDto mapToDto(DsaProblemEntity entity) {
        return DsaProblemDto.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .problemTitle(entity.getProblemTitle())
                .platform(entity.getPlatform())
                .difficulty(entity.getDifficulty())
                .pattern(entity.getPattern())
                .timeTakenMinutes(entity.getTimeTakenMinutes())
                .hintsUsed(entity.getHintsUsed())
                .solvedIndependently(entity.getSolvedIndependently())
                .needsRevision(entity.getNeedsRevision())
                .solutionUrl(entity.getSolutionUrl())
                .notes(entity.getNotes())
                .solvedDate(entity.getSolvedDate())
                .build();
    }
}
