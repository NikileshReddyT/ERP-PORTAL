package com.jfsd.erp.model;

import jakarta.persistence.*;
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
@Entity
@Table(name = "assessments")
public class Assessment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AssessmentType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @NotNull
    private Double maxScore;

    @NotNull
    private Double weightage;

    @NotNull
    private LocalDateTime startDateTime;

    @NotNull
    private LocalDateTime endDateTime;

    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    private Boolean isPublished;

    @Column(columnDefinition = "TEXT")
    private String instructions;

    public enum AssessmentType {
        EXAM,
        QUIZ,
        ASSIGNMENT,
        PROJECT,
        PRESENTATION,
        LAB_WORK,
        MID_TERM,
        FINAL_TERM
    }

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        if (isPublished == null) {
            isPublished = false;
        }
    }
}
