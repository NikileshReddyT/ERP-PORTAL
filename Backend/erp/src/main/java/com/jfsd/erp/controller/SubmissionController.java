package com.jfsd.erp.controller;

import com.jfsd.erp.dto.SubmissionDTO;
import com.jfsd.erp.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RestController
@RequestMapping("/submissions")
@RequiredArgsConstructor
public class SubmissionController {
    private final SubmissionService submissionService;

    @PostMapping
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<SubmissionDTO> createSubmission(
            @Valid @RequestBody SubmissionDTO submissionDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long studentId = ((com.jfsd.erp.model.User) userDetails).getId();
        return ResponseEntity.ok(submissionService.createSubmission(submissionDTO, studentId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<SubmissionDTO> updateSubmission(
            @PathVariable Long id,
            @Valid @RequestBody SubmissionDTO submissionDTO) {
        return ResponseEntity.ok(submissionService.updateSubmission(id, submissionDTO));
    }

    @PutMapping("/{id}/grade")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<SubmissionDTO> gradeSubmission(
            @PathVariable Long id,
            @RequestParam Double score,
            @RequestParam(required = false) String feedback,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long facultyId = ((com.jfsd.erp.model.User) userDetails).getId();
        return ResponseEntity.ok(submissionService.gradeSubmission(id, score, feedback, facultyId));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<SubmissionDTO> getSubmission(@PathVariable Long id) {
        return ResponseEntity.ok(submissionService.getSubmission(id));
    }

    @GetMapping("/assessment/{assessmentId}")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<List<SubmissionDTO>> getAssessmentSubmissions(
            @PathVariable Long assessmentId) {
        return ResponseEntity.ok(submissionService.getAssessmentSubmissions(assessmentId));
    }

    @GetMapping("/student/{studentId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<List<SubmissionDTO>> getStudentSubmissions(
            @PathVariable Long studentId) {
        return ResponseEntity.ok(submissionService.getStudentSubmissions(studentId));
    }

    @GetMapping("/assessment/{assessmentId}/average")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<Double> getAssessmentAverageScore(
            @PathVariable Long assessmentId) {
        return ResponseEntity.ok(submissionService.getAssessmentAverageScore(assessmentId));
    }
}
