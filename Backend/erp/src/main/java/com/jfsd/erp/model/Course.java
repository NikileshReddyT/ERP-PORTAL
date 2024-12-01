package com.jfsd.erp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "courses")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(unique = true)
    private String courseCode;

    @NotBlank
    private String name;

    private String description;

    @NotNull
    private Integer totalSeats;

    private Integer currentEnrollment;

    @NotNull
    private Integer credits;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "faculty_id")
    private User faculty;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    private String classroom;

    @ManyToMany(mappedBy = "enrolledCourses")
    private Set<User> enrolledStudents = new HashSet<>();

    @ElementCollection
    @CollectionTable(name = "course_schedule",
            joinColumns = @JoinColumn(name = "course_id"))
    @Column(name = "day_of_week")
    private Set<String> schedule = new HashSet<>();

    @Column(name = "semester")
    private Integer semester;

    @Column(name = "academic_year")
    private String academicYear;

    @Column(name = "is_active")
    private boolean isActive = true;

    public boolean hasAvailableSeats() {
        return currentEnrollment < totalSeats;
    }
}
