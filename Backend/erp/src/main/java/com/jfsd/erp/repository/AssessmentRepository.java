package com.jfsd.erp.repository;

import com.jfsd.erp.model.Assessment;
import com.jfsd.erp.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByCourse(Course course);
    
    List<Assessment> findByCourseId(Long courseId);
    
    @Query("SELECT a FROM Assessment a WHERE a.course.id = :courseId " +
           "AND a.startDateTime <= :now AND a.endDateTime >= :now")
    List<Assessment> findOngoingAssessments(
            @Param("courseId") Long courseId, 
            @Param("now") LocalDateTime now);
    
    @Query("SELECT a FROM Assessment a WHERE a.course.id = :courseId " +
           "AND a.startDateTime > :now")
    List<Assessment> findUpcomingAssessments(
            @Param("courseId") Long courseId, 
            @Param("now") LocalDateTime now);
    
    @Query("SELECT a FROM Assessment a WHERE a.course.id = :courseId " +
           "AND a.endDateTime < :now")
    List<Assessment> findCompletedAssessments(
            @Param("courseId") Long courseId, 
            @Param("now") LocalDateTime now);
    
    @Query("SELECT COUNT(a) FROM Assessment a WHERE a.course.id = :courseId " +
           "AND a.type = :type")
    Long countAssessmentsByCourseAndType(
            @Param("courseId") Long courseId, 
            @Param("type") Assessment.AssessmentType type);
    
    @Query("SELECT a FROM Assessment a WHERE a.course.id IN " +
           "(SELECT c.id FROM Course c JOIN c.enrolledStudents s WHERE s.id = :studentId) " +
           "AND a.startDateTime <= :now AND a.endDateTime >= :now")
    List<Assessment> findOngoingAssessmentsForStudent(
            @Param("studentId") Long studentId, 
            @Param("now") LocalDateTime now);
    
    @Query("SELECT a FROM Assessment a WHERE a.course.id IN " +
           "(SELECT c.id FROM Course c JOIN c.enrolledStudents s WHERE s.id = :studentId) " +
           "AND a.startDateTime > :now")
    List<Assessment> findUpcomingAssessmentsForStudent(
            @Param("studentId") Long studentId, 
            @Param("now") LocalDateTime now);
}
