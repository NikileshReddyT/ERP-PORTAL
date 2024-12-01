package com.jfsd.erp.dto;

import com.jfsd.erp.model.Attendance;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDTO {
    private Long id;
    
    @NotNull
    private Long studentId;
    private String studentName;
    
    @NotNull
    private Long courseId;
    private String courseName;
    private String courseCode;
    
    @NotNull
    private LocalDate attendanceDate;
    
    @NotNull
    private Attendance.AttendanceStatus status;
    
    private LocalDateTime markedAt;
    private Long markedById;
    private String markedByName;
    private String remarks;
}

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
class AttendanceStatisticsDTO {
    private Long totalClasses;
    private Long present;
    private Long absent;
    private Long late;
    private Long excused;
    private Double attendancePercentage;
}
