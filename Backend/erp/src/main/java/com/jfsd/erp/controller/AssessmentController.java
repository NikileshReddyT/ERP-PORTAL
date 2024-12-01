package com.jfsd.erp.controller;

import com.jfsd.erp.dto.AssessmentDTO;
import com.jfsd.erp.model.Assessment;
import com.jfsd.erp.service.AssessmentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RestController
@RequestMapping("/assessments")
@RequiredArgsConstructor
public class AssessmentController {
    private final AssessmentService assessmentService;

    @PostMapping
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<AssessmentDTO> createAssessment(
            @Valid @RequestBody AssessmentDTO assessmentDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long facultyId = ((com.jfsd.erp.model.User) userDetails).getId();
        return ResponseEntity.ok(assessmentService.createAssessment(assessmentDTO, facultyId));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<AssessmentDTO> updateAssessment(
            @PathVariable Long id,
            @Valid @RequestBody AssessmentDTO assessmentDTO) {
        return ResponseEntity.ok(assessmentService.updateAssessment(id, assessmentDTO));
    }

    @PutMapping("/{id}/publish")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<AssessmentDTO> publishAssessment(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.publishAssessment(id));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<AssessmentDTO> getAssessment(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.getAssessment(id));
    }

    @GetMapping("/course/{courseId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<Page<AssessmentDTO>> getCourseAssessments(
            @PathVariable Long courseId,
            Pageable pageable) {
        return ResponseEntity.ok(assessmentService.getCourseAssessments(courseId, pageable));
    }

    @GetMapping("/course/{courseId}/upcoming")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<List<AssessmentDTO>> getUpcomingAssessments(@PathVariable Long courseId) {
        return ResponseEntity.ok(assessmentService.getUpcomingAssessments(courseId));
    }

    @GetMapping("/course/{courseId}/ongoing")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<List<AssessmentDTO>> getOngoingAssessments(@PathVariable Long courseId) {
        return ResponseEntity.ok(assessmentService.getOngoingAssessments(courseId));
    }

    @GetMapping("/course/{courseId}/type/{type}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<List<AssessmentDTO>> getAssessmentsByType(
            @PathVariable Long courseId,
            @PathVariable Assessment.AssessmentType type) {
        return ResponseEntity.ok(assessmentService.getAssessmentsByType(courseId, type));
    }
}
