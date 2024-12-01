package com.jfsd.erp.service;

import com.jfsd.erp.dto.EnrollmentDTO;
import com.jfsd.erp.model.Course;
import com.jfsd.erp.model.Enrollment;
import com.jfsd.erp.model.Role;
import com.jfsd.erp.model.User;
import com.jfsd.erp.repository.CourseRepository;
import com.jfsd.erp.repository.EnrollmentRepository;
import com.jfsd.erp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnrollmentService {
    private final EnrollmentRepository enrollmentRepository;
    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Transactional
    public EnrollmentDTO enrollInCourse(Long studentId, Long courseId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        if (!student.getRoles().stream()
                .anyMatch(role -> role.getName() == Role.ERole.ROLE_STUDENT)) {
            throw new RuntimeException("User is not a student");
        }

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        if (!course.isActive()) {
            throw new RuntimeException("Course is not active");
        }

        if (!course.hasAvailableSeats()) {
            throw new RuntimeException("Course is full");
        }

        if (enrollmentRepository.existsByStudentAndCourseAndStatus(
                student, course, Enrollment.EnrollmentStatus.APPROVED)) {
            throw new RuntimeException("Student is already enrolled in this course");
        }

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .course(course)
                .status(Enrollment.EnrollmentStatus.PENDING)
                .semester(course.getSemester())
                .academicYear(course.getAcademicYear())
                .build();

        Enrollment savedEnrollment = enrollmentRepository.save(enrollment);
        return mapToDTO(savedEnrollment);
    }

    @Transactional
    public EnrollmentDTO updateEnrollmentStatus(Long enrollmentId, Enrollment.EnrollmentStatus status) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        if (status == Enrollment.EnrollmentStatus.APPROVED) {
            Course course = enrollment.getCourse();
            if (!course.hasAvailableSeats()) {
                throw new RuntimeException("Course is full");
            }
            course.setCurrentEnrollment(course.getCurrentEnrollment() + 1);
            courseRepository.save(course);
        }

        enrollment.setStatus(status);
        Enrollment updatedEnrollment = enrollmentRepository.save(enrollment);
        return mapToDTO(updatedEnrollment);
    }

    @Transactional(readOnly = true)
    public List<EnrollmentDTO> getStudentEnrollments(Long studentId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return enrollmentRepository.findByStudent(student).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<EnrollmentDTO> getCourseEnrollments(Long courseId) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return enrollmentRepository.findByCourse(course).stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private EnrollmentDTO mapToDTO(Enrollment enrollment) {
        return EnrollmentDTO.builder()
                .id(enrollment.getId())
                .studentId(enrollment.getStudent().getId())
                .studentName(enrollment.getStudent().getFirstName() + " " + enrollment.getStudent().getLastName())
                .courseId(enrollment.getCourse().getId())
                .courseName(enrollment.getCourse().getName())
                .courseCode(enrollment.getCourse().getCourseCode())
                .enrollmentDate(enrollment.getEnrollmentDate())
                .status(enrollment.getStatus())
                .semester(enrollment.getSemester())
                .academicYear(enrollment.getAcademicYear())
                .build();
    }
}
