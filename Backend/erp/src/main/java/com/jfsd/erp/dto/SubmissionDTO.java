package com.jfsd.erp.dto;

import com.jfsd.erp.model.Submission;
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
public class SubmissionDTO {
    private Long id;

    @NotNull
    private Long assessmentId;
    private String assessmentTitle;
    private String assessmentType;

    @NotNull
    private Long studentId;
    private String studentName;

    private String content;
    private String attachmentUrl;
    private LocalDateTime submittedAt;
    private String comments;
    private Double score;
    private Submission.SubmissionStatus status;
    private LocalDateTime gradedAt;
    private Long gradedById;
    private String gradedByName;
    private String feedback;
    private Boolean isLate;
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class GradeDTO {
    private Long submissionId;
    private Double score;
    private String feedback;
    private Submission.SubmissionStatus status;
}
