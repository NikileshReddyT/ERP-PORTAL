package com.jfsd.erp.service;

import com.jfsd.erp.dto.SubmissionDTO;
import com.jfsd.erp.model.Assessment;
import com.jfsd.erp.model.Submission;
import com.jfsd.erp.model.User;
import com.jfsd.erp.repository.AssessmentRepository;
import com.jfsd.erp.repository.SubmissionRepository;
import com.jfsd.erp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubmissionService {
    private final SubmissionRepository submissionRepository;
    private final AssessmentRepository assessmentRepository;
    private final UserRepository userRepository;

    @Transactional
    public SubmissionDTO createSubmission(SubmissionDTO submissionDTO, Long studentId) {
        Assessment assessment = assessmentRepository.findById(submissionDTO.getAssessmentId())
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        if (!assessment.getIsPublished()) {
            throw new RuntimeException("Cannot submit to unpublished assessment");
        }

        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        submissionRepository.findByAssessmentAndStudent(assessment, student)
                .ifPresent(s -> {
                    throw new RuntimeException("Submission already exists");
                });

        LocalDateTime now = LocalDateTime.now();
        Submission.SubmissionStatus status = now.isAfter(assessment.getEndDateTime()) 
            ? Submission.SubmissionStatus.LATE_SUBMITTED 
            : Submission.SubmissionStatus.SUBMITTED;

        Submission submission = Submission.builder()
                .assessment(assessment)
                .student(student)
                .content(submissionDTO.getContent())
                .attachmentUrl(submissionDTO.getAttachmentUrl())
                .submittedAt(now)
                .comments(submissionDTO.getComments())
                .status(status)
                .build();

        Submission savedSubmission = submissionRepository.save(submission);
        return mapToDTO(savedSubmission);
    }

    @Transactional
    public SubmissionDTO updateSubmission(Long id, SubmissionDTO submissionDTO) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        if (submission.getStatus() != Submission.SubmissionStatus.DRAFT) {
            throw new RuntimeException("Cannot update submitted submission");
        }

        submission.setContent(submissionDTO.getContent());
        submission.setAttachmentUrl(submissionDTO.getAttachmentUrl());
        submission.setComments(submissionDTO.getComments());

        Submission updatedSubmission = submissionRepository.save(submission);
        return mapToDTO(updatedSubmission);
    }

    @Transactional
    public SubmissionDTO gradeSubmission(Long id, Double score, String feedback, Long gradedById) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        User gradedBy = userRepository.findById(gradedById)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        if (score > submission.getAssessment().getMaxScore()) {
            throw new RuntimeException("Score cannot exceed maximum score");
        }

        submission.setScore(score);
        submission.setFeedback(feedback);
        submission.setGradedBy(gradedBy);
        submission.setGradedAt(LocalDateTime.now());
        submission.setStatus(Submission.SubmissionStatus.GRADED);

        Submission gradedSubmission = submissionRepository.save(submission);
        return mapToDTO(gradedSubmission);
    }

    @Transactional(readOnly = true)
    public SubmissionDTO getSubmission(Long id) {
        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));
        return mapToDTO(submission);
    }

    @Transactional(readOnly = true)
    public List<SubmissionDTO> getAssessmentSubmissions(Long assessmentId) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        return submissionRepository.findByAssessment(assessment)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<SubmissionDTO> getStudentSubmissions(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return submissionRepository.findByStudent(student)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Double getAssessmentAverageScore(Long assessmentId) {
        Assessment assessment = assessmentRepository.findById(assessmentId)
                .orElseThrow(() -> new RuntimeException("Assessment not found"));

        return submissionRepository.getAverageScoreForAssessment(assessment);
    }

    private SubmissionDTO mapToDTO(Submission submission) {
        return SubmissionDTO.builder()
                .id(submission.getId())
                .assessmentId(submission.getAssessment().getId())
                .assessmentTitle(submission.getAssessment().getTitle())
                .assessmentType(submission.getAssessment().getType().name())
                .studentId(submission.getStudent().getId())
                .studentName(submission.getStudent().getFirstName() + " " + submission.getStudent().getLastName())
                .content(submission.getContent())
                .attachmentUrl(submission.getAttachmentUrl())
                .submittedAt(submission.getSubmittedAt())
                .comments(submission.getComments())
                .score(submission.getScore())
                .status(submission.getStatus())
                .gradedAt(submission.getGradedAt())
                .gradedById(submission.getGradedBy() != null ? submission.getGradedBy().getId() : null)
                .gradedByName(submission.getGradedBy() != null ? 
                    submission.getGradedBy().getFirstName() + " " + submission.getGradedBy().getLastName() : null)
                .feedback(submission.getFeedback())
                .isLate(submission.getStatus() == Submission.SubmissionStatus.LATE_SUBMITTED)
                .build();
    }
}
