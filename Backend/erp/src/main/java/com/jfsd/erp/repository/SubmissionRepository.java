package com.jfsd.erp.repository;

import com.jfsd.erp.model.Assessment;
import com.jfsd.erp.model.Submission;
import com.jfsd.erp.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByAssessment(Assessment assessment);
    
    List<Submission> findByStudent(User student);
    
    Optional<Submission> findByAssessmentAndStudent(Assessment assessment, User student);
    
    @Query("SELECT AVG(s.score) FROM Submission s " +
           "WHERE s.assessment.course.id = :courseId AND s.status = 'GRADED'")
    Double calculateAverageGradeForCourse(@Param("courseId") Long courseId);
    
    @Query("SELECT AVG(s.score) FROM Submission s " +
           "WHERE s.assessment.course.id = :courseId " +
           "AND s.student.id = :studentId AND s.status = 'GRADED'")
    Double calculateStudentAverageGradeForCourse(
            @Param("studentId") Long studentId, 
            @Param("courseId") Long courseId);
    
    @Query("SELECT COUNT(DISTINCT s.assessment.id) FROM Submission s " +
           "WHERE s.student.id = :studentId " +
           "AND s.assessment.course.id = :courseId " +
           "AND s.status IN ('SUBMITTED', 'GRADED', 'RETURNED')")
    Integer countCompletedAssessmentsByStudent(
            @Param("studentId") Long studentId, 
            @Param("courseId") Long courseId);
    
    @Query("SELECT s FROM Submission s WHERE s.student.id = :studentId " +
           "AND s.assessment.course.id = :courseId " +
           "ORDER BY s.submittedAt DESC")
    List<Submission> findStudentSubmissionHistory(
            @Param("studentId") Long studentId, 
            @Param("courseId") Long courseId);
    
    @Query("SELECT COUNT(s) FROM Submission s " +
           "WHERE s.assessment.course.id = :courseId " +
           "AND s.status = :status")
    Long countSubmissionsByCourseAndStatus(
            @Param("courseId") Long courseId, 
            @Param("status") Submission.SubmissionStatus status);
}
