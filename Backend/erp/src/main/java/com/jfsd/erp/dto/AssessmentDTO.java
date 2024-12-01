package com.jfsd.erp.dto;

import com.jfsd.erp.model.Assessment;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AssessmentDTO {
    private Long id;

    @NotBlank
    private String title;

    private String description;

    @NotNull
    private Assessment.AssessmentType type;

    @NotNull
    private Long courseId;
    private String courseName;
    private String courseCode;

    @NotNull
    private Double maxScore;

    @NotNull
    private Double weightage;

    @NotNull
    private LocalDateTime startDateTime;

    @NotNull
    private LocalDateTime endDateTime;

    private LocalDateTime createdAt;
    private Long createdById;
    private String createdByName;

    private Boolean isPublished;
    private String instructions;
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class AssessmentSummaryDTO {
    private Long totalAssessments;
    private Long pendingAssessments;
    private Long completedAssessments;
    private Double averageScore;
    private Double weightedAverage;
}
