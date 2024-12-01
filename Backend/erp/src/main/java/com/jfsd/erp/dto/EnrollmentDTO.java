package com.jfsd.erp.dto;

import com.jfsd.erp.model.Enrollment;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EnrollmentDTO {
    private Long id;
    private Long studentId;
    private String studentName;
    private Long courseId;
    private String courseName;
    private String courseCode;
    private LocalDateTime enrollmentDate;
    private Enrollment.EnrollmentStatus status;
    private Integer semester;
    private String academicYear;
}
