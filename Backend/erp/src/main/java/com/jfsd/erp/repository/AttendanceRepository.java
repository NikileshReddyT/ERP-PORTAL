package com.jfsd.erp.repository;

import com.jfsd.erp.model.Attendance;
import com.jfsd.erp.model.Course;
import com.jfsd.erp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByStudentAndCourse(User student, Course course);
    
    List<Attendance> findByCourseAndAttendanceDate(Course course, LocalDate date);
    
    Optional<Attendance> findByStudentAndCourseAndAttendanceDate(
            User student, Course course, LocalDate date);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.course.id = :courseId " +
           "AND a.status = 'PRESENT'")
    Long countPresentAttendancesByCourse(@Param("courseId") Long courseId);
    
    @Query("SELECT COUNT(a) FROM Attendance a WHERE a.course.id = :courseId")
    Long countTotalAttendancesByCourse(@Param("courseId") Long courseId);
    
    @Query("SELECT CAST(COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) AS double) / " +
           "CAST(COUNT(a) AS double) * 100 FROM Attendance a WHERE a.course.id = :courseId")
    Double calculateAverageAttendanceForCourse(@Param("courseId") Long courseId);
    
    @Query("SELECT CAST(COUNT(CASE WHEN a.status = 'PRESENT' THEN 1 END) AS double) / " +
           "CAST(COUNT(a) AS double) * 100 FROM Attendance a WHERE a.course.id = :courseId " +
           "AND a.student.id = :studentId")
    Double calculateStudentAttendanceForCourse(
            @Param("studentId") Long studentId, 
            @Param("courseId") Long courseId);
    
    List<Attendance> findByCourseIdAndAttendanceDateBetween(
            Long courseId, LocalDate startDate, LocalDate endDate);
            
    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId " +
           "AND a.course.id = :courseId ORDER BY a.attendanceDate DESC")
    List<Attendance> findStudentAttendanceHistory(
            @Param("studentId") Long studentId, 
            @Param("courseId") Long courseId);
}
