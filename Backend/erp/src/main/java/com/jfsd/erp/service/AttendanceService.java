package com.jfsd.erp.service;

import com.jfsd.erp.dto.AttendanceDTO;
import com.jfsd.erp.model.Attendance;
import com.jfsd.erp.model.Course;
import com.jfsd.erp.model.User;
import com.jfsd.erp.repository.AttendanceRepository;
import com.jfsd.erp.repository.CourseRepository;
import com.jfsd.erp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @Transactional
    public AttendanceDTO markAttendance(AttendanceDTO attendanceDTO, Long markedById) {
        User student = userRepository.findById(attendanceDTO.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(attendanceDTO.getCourseId())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User markedBy = userRepository.findById(markedById)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        // Check if attendance already exists for this date
        attendanceRepository.findByStudentAndCourseAndAttendanceDate(
                student, course, attendanceDTO.getAttendanceDate())
                .ifPresent(a -> {
                    throw new RuntimeException("Attendance already marked for this date");
                });

        Attendance attendance = Attendance.builder()
                .student(student)
                .course(course)
                .attendanceDate(attendanceDTO.getAttendanceDate())
                .status(attendanceDTO.getStatus())
                .markedBy(markedBy)
                .remarks(attendanceDTO.getRemarks())
                .build();

        Attendance savedAttendance = attendanceRepository.save(attendance);
        return mapToDTO(savedAttendance);
    }

    @Transactional
    public List<AttendanceDTO> markBulkAttendance(
            Long courseId,
            LocalDate date,
            Map<Long, Attendance.AttendanceStatus> studentAttendance,
            Long markedById) {
        
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        User markedBy = userRepository.findById(markedById)
                .orElseThrow(() -> new RuntimeException("Faculty not found"));

        return studentAttendance.entrySet().stream()
                .map(entry -> {
                    User student = userRepository.findById(entry.getKey())
                            .orElseThrow(() -> new RuntimeException("Student not found: " + entry.getKey()));

                    Attendance attendance = Attendance.builder()
                            .student(student)
                            .course(course)
                            .attendanceDate(date)
                            .status(entry.getValue())
                            .markedBy(markedBy)
                            .build();

                    return mapToDTO(attendanceRepository.save(attendance));
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public AttendanceDTO updateAttendance(Long attendanceId, AttendanceDTO attendanceDTO) {
        Attendance attendance = attendanceRepository.findById(attendanceId)
                .orElseThrow(() -> new RuntimeException("Attendance record not found"));

        attendance.setStatus(attendanceDTO.getStatus());
        attendance.setRemarks(attendanceDTO.getRemarks());

        Attendance updatedAttendance = attendanceRepository.save(attendance);
        return mapToDTO(updatedAttendance);
    }

    @Transactional(readOnly = true)
    public List<AttendanceDTO> getStudentAttendance(Long studentId, Long courseId, LocalDate startDate, LocalDate endDate) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return attendanceRepository
                .findByStudentAndCourseAndAttendanceDateBetween(student, course, startDate, endDate)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<AttendanceDTO> getCourseAttendance(Long courseId, LocalDate date) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        return attendanceRepository
                .findByCourseAndAttendanceDateOrderByStudentName(course, date)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Map<String, Long> getAttendanceStatistics(Long studentId, Long courseId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));

        Long totalClasses = attendanceRepository.countByStudentAndCourse(student, course);
        Long present = attendanceRepository.countByStudentAndCourseAndStatus(
                student, course, Attendance.AttendanceStatus.PRESENT);
        Long absent = attendanceRepository.countByStudentAndCourseAndStatus(
                student, course, Attendance.AttendanceStatus.ABSENT);
        Long late = attendanceRepository.countByStudentAndCourseAndStatus(
                student, course, Attendance.AttendanceStatus.LATE);
        Long excused = attendanceRepository.countByStudentAndCourseAndStatus(
                student, course, Attendance.AttendanceStatus.EXCUSED);

        return Map.of(
                "totalClasses", totalClasses,
                "present", present,
                "absent", absent,
                "late", late,
                "excused", excused,
                "attendancePercentage", 
                totalClasses > 0 ? (present + late) * 100L / totalClasses : 0L
        );
    }

    private AttendanceDTO mapToDTO(Attendance attendance) {
        return AttendanceDTO.builder()
                .id(attendance.getId())
                .studentId(attendance.getStudent().getId())
                .studentName(attendance.getStudent().getFirstName() + " " + attendance.getStudent().getLastName())
                .courseId(attendance.getCourse().getId())
                .courseName(attendance.getCourse().getName())
                .courseCode(attendance.getCourse().getCourseCode())
                .attendanceDate(attendance.getAttendanceDate())
                .status(attendance.getStatus())
                .markedAt(attendance.getMarkedAt())
                .markedById(attendance.getMarkedBy().getId())
                .markedByName(attendance.getMarkedBy().getFirstName() + " " + attendance.getMarkedBy().getLastName())
                .remarks(attendance.getRemarks())
                .build();
    }
}
