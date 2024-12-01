package com.jfsd.erp.service;

import com.jfsd.erp.dto.CourseDTO;
import com.jfsd.erp.dto.CourseStatsDTO;
import com.jfsd.erp.model.Course;
import com.jfsd.erp.model.Role;
import com.jfsd.erp.model.User;
import com.jfsd.erp.repository.AssessmentRepository;
import com.jfsd.erp.repository.AttendanceRepository;
import com.jfsd.erp.repository.CourseRepository;
import com.jfsd.erp.repository.SubmissionRepository;
import com.jfsd.erp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;
    private final AttendanceRepository attendanceRepository;
    private final AssessmentRepository assessmentRepository;
    private final SubmissionRepository submissionRepository;

    @Transactional
    public CourseDTO createCourse(CourseDTO courseDTO) {
        if (courseRepository.existsByCourseCode(courseDTO.getCourseCode())) {
            throw new RuntimeException("Course code already exists");
        }

        User faculty = userRepository.findById(courseDTO.getFacultyId())
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        if (!faculty.getRoles().stream()
                .anyMatch(role -> role.getName() == Role.ERole.ROLE_FACULTY)) {
            throw new RuntimeException("User is not a faculty member");
        }

        Course course = Course.builder()
                .courseCode(courseDTO.getCourseCode())
                .name(courseDTO.getName())
                .description(courseDTO.getDescription())
                .totalSeats(courseDTO.getTotalSeats())
                .currentEnrollment(0)
                .credits(courseDTO.getCredits())
                .faculty(faculty)
                .startTime(courseDTO.getStartTime())
                .endTime(courseDTO.getEndTime())
                .classroom(courseDTO.getClassroom())
                .schedule(courseDTO.getSchedule())
                .semester(courseDTO.getSemester())
                .academicYear(courseDTO.getAcademicYear())
                .isActive(true)
                .build();

        Course savedCourse = courseRepository.save(course);
        return mapToDTO(savedCourse);
    }

    @Transactional(readOnly = true)
    public CourseDTO getCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        return mapToDTO(course);
    }

    @Transactional(readOnly = true)
    public Page<CourseDTO> getAllActiveCourses(Pageable pageable) {
        return courseRepository.findByIsActiveTrue(pageable)
                .map(this::mapToDTO);
    }

    @Transactional(readOnly = true)
    public List<CourseDTO> getAvailableCourses() {
        return courseRepository.findAvailableCourses().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<CourseDTO> getCoursesByFaculty(Long facultyId) {
        User faculty = userRepository.findById(facultyId)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));
        return courseRepository.findByFacultyAndIsActiveTrue(faculty).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public CourseDTO updateCourse(Long id, CourseDTO courseDTO) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        course.setName(courseDTO.getName());
        course.setDescription(courseDTO.getDescription());
        course.setTotalSeats(courseDTO.getTotalSeats());
        course.setCredits(courseDTO.getCredits());
        course.setStartTime(courseDTO.getStartTime());
        course.setEndTime(courseDTO.getEndTime());
        course.setClassroom(courseDTO.getClassroom());
        course.setSchedule(courseDTO.getSchedule());
        course.setSemester(courseDTO.getSemester());
        course.setAcademicYear(courseDTO.getAcademicYear());
        course.setActive(courseDTO.isActive());

        Course updatedCourse = courseRepository.save(course);
        return mapToDTO(updatedCourse);
    }

    @Transactional
    public void deleteCourse(Long id) {
        Course course = courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        course.setActive(false);
        courseRepository.save(course);
    }

    @Transactional(readOnly = true)
    public CourseStatsDTO getCourseStats(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        // Calculate average attendance
        Double averageAttendance = attendanceRepository.calculateAverageAttendanceForCourse(courseId);

        // Get assessment statistics
        List<Assessment> assessments = assessmentRepository.findByCourseId(courseId);
        int totalAssessments = assessments.size();
        int completedAssessments = (int) assessments.stream()
                .filter(a -> a.getEndDateTime().isBefore(LocalDateTime.now()))
                .count();
        int upcomingAssessments = totalAssessments - completedAssessments;

        // Calculate average grade from submissions
        Double averageGrade = submissionRepository.calculateAverageGradeForCourse(courseId);

        // Get student statistics
        int totalStudents = course.getEnrolledStudents().size();
        int activeStudents = (int) course.getEnrolledStudents().stream()
                .filter(User::isActive)
                .count();

        return CourseStatsDTO.builder()
                .courseId(courseId)
                .courseName(course.getName())
                .averageAttendance(averageAttendance)
                .averageGrade(averageGrade)
                .totalAssessments(totalAssessments)
                .completedAssessments(completedAssessments)
                .upcomingAssessments(upcomingAssessments)
                .totalStudents(totalStudents)
                .activeStudents(activeStudents)
                .build();
    }

    @Transactional(readOnly = true)
    public List<CourseStatsDTO> getStudentCourseStats(Long studentId) {
        List<Course> enrolledCourses = courseRepository.findEnrolledCoursesByStudentId(studentId);
        return enrolledCourses.stream()
                .map(course -> {
                    Double averageAttendance = attendanceRepository
                            .calculateStudentAttendanceForCourse(studentId, course.getId());
                    Double averageGrade = submissionRepository
                            .calculateStudentAverageGradeForCourse(studentId, course.getId());
                    List<Assessment> assessments = assessmentRepository.findByCourseId(course.getId());
                    int totalAssessments = assessments.size();
                    int completedAssessments = submissionRepository
                            .countCompletedAssessmentsByStudent(studentId, course.getId());

                    return CourseStatsDTO.builder()
                            .courseId(course.getId())
                            .courseName(course.getName())
                            .averageAttendance(averageAttendance)
                            .averageGrade(averageGrade)
                            .totalAssessments(totalAssessments)
                            .completedAssessments(completedAssessments)
                            .upcomingAssessments(totalAssessments - completedAssessments)
                            .build();
                })
                .collect(Collectors.toList());
    }

    private CourseDTO mapToDTO(Course course) {
        return CourseDTO.builder()
                .id(course.getId())
                .courseCode(course.getCourseCode())
                .name(course.getName())
                .description(course.getDescription())
                .totalSeats(course.getTotalSeats())
                .currentEnrollment(course.getCurrentEnrollment())
                .credits(course.getCredits())
                .facultyId(course.getFaculty().getId())
                .facultyName(course.getFaculty().getFirstName() + " " + course.getFaculty().getLastName())
                .startTime(course.getStartTime())
                .endTime(course.getEndTime())
                .classroom(course.getClassroom())
                .schedule(course.getSchedule())
                .semester(course.getSemester())
                .academicYear(course.getAcademicYear())
                .isActive(course.isActive())
                .hasAvailableSeats(course.hasAvailableSeats())
                .build();
    }
}
