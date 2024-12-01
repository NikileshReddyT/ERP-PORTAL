package com.jfsd.erp.controller;

import com.jfsd.erp.dto.AttendanceDTO;
import com.jfsd.erp.model.Attendance;
import com.jfsd.erp.service.AttendanceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
@RestController
@RequestMapping("/attendance")
@RequiredArgsConstructor
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PostMapping("/mark")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<AttendanceDTO> markAttendance(
            @Valid @RequestBody AttendanceDTO attendanceDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        // Assuming User implements UserDetails and has getId() method
        Long facultyId = ((com.jfsd.erp.model.User) userDetails).getId();
        return ResponseEntity.ok(attendanceService.markAttendance(attendanceDTO, facultyId));
    }

    @PostMapping("/mark/bulk")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<List<AttendanceDTO>> markBulkAttendance(
            @RequestParam Long courseId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date,
            @RequestBody Map<Long, Attendance.AttendanceStatus> studentAttendance,
            @AuthenticationPrincipal UserDetails userDetails) {
        Long facultyId = ((com.jfsd.erp.model.User) userDetails).getId();
        return ResponseEntity.ok(
                attendanceService.markBulkAttendance(courseId, date, studentAttendance, facultyId));
    }

    @PutMapping("/{attendanceId}")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<AttendanceDTO> updateAttendance(
            @PathVariable Long attendanceId,
            @Valid @RequestBody AttendanceDTO attendanceDTO) {
        return ResponseEntity.ok(attendanceService.updateAttendance(attendanceId, attendanceDTO));
    }

    @GetMapping("/student/{studentId}/course/{courseId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<List<AttendanceDTO>> getStudentAttendance(
            @PathVariable Long studentId,
            @PathVariable Long courseId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        return ResponseEntity.ok(
                attendanceService.getStudentAttendance(studentId, courseId, startDate, endDate));
    }

    @GetMapping("/course/{courseId}/date/{date}")
    @PreAuthorize("hasRole('FACULTY')")
    public ResponseEntity<List<AttendanceDTO>> getCourseAttendance(
            @PathVariable Long courseId,
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return ResponseEntity.ok(attendanceService.getCourseAttendance(courseId, date));
    }

    @GetMapping("/statistics/student/{studentId}/course/{courseId}")
    @PreAuthorize("hasAnyRole('STUDENT', 'FACULTY')")
    public ResponseEntity<Map<String, Long>> getAttendanceStatistics(
            @PathVariable Long studentId,
            @PathVariable Long courseId) {
        return ResponseEntity.ok(attendanceService.getAttendanceStatistics(studentId, courseId));
    }
}
