package com.jfsd.erp.repository;

import com.jfsd.erp.model.Course;
import com.jfsd.erp.model.Enrollment;
import com.jfsd.erp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudent(User student);
    
    List<Enrollment> findByCourse(Course course);
    
    Optional<Enrollment> findByStudentAndCourse(User student, Course course);
    
    List<Enrollment> findByStudentAndSemesterAndAcademicYear(
            User student, Integer semester, String academicYear);
    
    List<Enrollment> findByCourseAndStatus(Course course, Enrollment.EnrollmentStatus status);
    
    boolean existsByStudentAndCourseAndStatus(
            User student, Course course, Enrollment.EnrollmentStatus status);
}
