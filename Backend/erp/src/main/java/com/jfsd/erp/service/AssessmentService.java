package com.jfsd.erp.service;

import com.jfsd.erp.dto.AssessmentDTO;
import com.jfsd.erp.model.Assessment;
import com.jfsd.erp.model.Course;
import com.jfsd.erp.model.User;
import com.jfsd.erp.repository.AssessmentRepository;
import com.jfsd.erp.repository.CourseRepository;
import com.jfsd.erp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AssessmentService {
    private final AssessmentRepository assessmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Transactional
    public AssessmentDTO createAssessment(AssessmentDTO assessmentDTO, Long createdById) {
        Course course = courseRepository.findById(assessmentDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User createdBy = userRepository.findById(createdById)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Assessment assessment = Assessment.builder()
                .title(assessmentDTO.getTitle())
                .description(assessmentDTO.getDescription())
                .type(assessmentDTO.getType())
                .course(course)
                .maxScore(assessmentDTO.getMaxScore())
                .weightage(assessmentDTO.getWeightage())
                .startDateTime(assessmentDTO.getStartDateTime())
                .endDateTime(assessmentDTO.getEndDateTime())
                .createdBy(createdBy)
                .isPublished(false)
                .instructions(assessmentDTO.getInstructions())
                .build();

        Assessment savedAssessment = assessmentRepository.save(assessment);
        return mapToDTO(savedAssessment);
    }

    @Transactional
    public AssessmentDTO updateAssessment(Long id, AssessmentDTO assessmentDTO) {
        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        if (assessment.getIsPublished()) {
            throw new RuntimeException("Cannot update published assessment");
        }

        assessment.setTitle(assessmentDTO.getTitle());
        assessment.setDescription(assessmentDTO.getDescription());
        assessment.setType(assessmentDTO.getType());
        assessment.setMaxScore(assessmentDTO.getMaxScore());
        assessment.setWeightage(assessmentDTO.getWeightage());
        assessment.setStartDateTime(assessmentDTO.getStartDateTime());
        assessment.setEndDateTime(assessmentDTO.getEndDateTime());
        assessment.setInstructions(assessmentDTO.getInstructions());

        Assessment updatedAssessment = assessmentRepository.save(assessment);
        return mapToDTO(updatedAssessment);
    }

    @Transactional
    public AssessmentDTO publishAssessment(Long id) {
        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        assessment.setIsPublished(true);
        Assessment publishedAssessment = assessmentRepository.save(assessment);
        return mapToDTO(publishedAssessment);
    }

    @Transactional(readOnly = true)
    public AssessmentDTO getAssessment(Long id) {
        Assessment assessment = assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));
        return mapToDTO(assessment);
    }

    @Transactional(readOnly = true)
    public Page<AssessmentDTO> getCourseAssessments(Long courseId, Pageable pageable) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return assessmentRepository.findByCourseAndIsPublishedTrue(course, pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public List<AssessmentDTO> getUpcomingAssessments(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return assessmentRepository.findUpcomingAssessments(course, LocalDateTime.now())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AssessmentDTO> getOngoingAssessments(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return assessmentRepository.findOngoingAssessments(course, LocalDateTime.now())
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AssessmentDTO> getAssessmentsByType(Long courseId, Assessment.AssessmentType type) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return assessmentRepository.findByCourseAndTypeAndIsPublishedTrue(course, type)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private AssessmentDTO mapToDTO(Assessment assessment) {
        return AssessmentDTO.builder()
                .id(assessment.getId())
                .title(assessment.getTitle())
                .description(assessment.getDescription())
                .type(assessment.getType())
                .courseId(assessment.getCourse().getId())
                .courseName(assessment.getCourse().getName())
                .courseCode(assessment.getCourse().getCourseCode())
                .maxScore(assessment.getMaxScore())
                .weightage(assessment.getWeightage())
                .startDateTime(assessment.getStartDateTime())
                .endDateTime(assessment.getEndDateTime())
                .createdAt(assessment.getCreatedAt())
                .createdById(assessment.getCreatedBy().getId())
                .createdByName(assessment.getCreatedBy().getFirstName() + " " + assessment.getCreatedBy().getLastName())
                .isPublished(assessment.getIsPublished())
                .instructions(assessment.getInstructions())
                .build();
    }
}
