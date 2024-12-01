package com.jfsd.erp.repository;

import com.jfsd.erp.model.Course;
import com.jfsd.erp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    Optional<Course> findByCourseCode(String courseCode);
    
    boolean existsByCourseCode(String courseCode);
    
    Page<Course> findByIsActiveTrue(Pageable pageable);
    
    List<Course> findByFacultyAndIsActiveTrue(User faculty);
    
    @Query("SELECT c FROM Course c WHERE c.isActive = true AND c.currentEnrollment < c.totalSeats")
    List<Course> findAvailableCourses();
    
    List<Course> findBySemesterAndAcademicYear(Integer semester, String academicYear);
    
    @Query("SELECT c FROM Course c JOIN c.enrolledStudents s WHERE s.id = :studentId AND c.isActive = true")
    List<Course> findEnrolledCoursesByStudentId(Long studentId);
}
