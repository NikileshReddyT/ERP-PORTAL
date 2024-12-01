package com.jfsd.erp.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private Long id;
    
    @NotBlank
    private String courseCode;
    
    @NotBlank
    private String name;
    
    private String description;
    
    @NotNull
    private Integer totalSeats;
    
    private Integer currentEnrollment;
    
    @NotNull
    private Integer credits;
    
    private Long facultyId;
    private String facultyName;
    
    private LocalTime startTime;
    private LocalTime endTime;
    private String classroom;
    
    private Set<String> schedule;
    
    @NotNull
    private Integer semester;
    
    @NotNull
    private String academicYear;
    
    private boolean isActive;
    private boolean hasAvailableSeats;
}
