package com.jfsd.erp.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseStatsDTO {
    private Long courseId;
    private String courseName;
    private Double averageAttendance;
    private Double averageGrade;
    private Integer totalAssessments;
    private Integer completedAssessments;
    private Integer upcomingAssessments;
    private Integer totalStudents;
    private Integer activeStudents;
}
