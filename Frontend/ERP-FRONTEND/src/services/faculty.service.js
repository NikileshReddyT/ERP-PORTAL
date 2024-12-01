import { axiosInstance } from './api';

export const facultyService = {
  // Profile management
  getProfile: () => axiosInstance.get('/api/faculty/profile'),
  updateProfile: (profileData) => axiosInstance.put('/api/faculty/profile', profileData),
  
  // Course management
  getCourses: () => axiosInstance.get('/api/faculty/courses'),
  getCourseDetails: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}`),
  updateCourseContent: (courseId, content) => axiosInstance.put(`/api/faculty/courses/${courseId}/content`, content),
  
  // Student management
  getCourseStudents: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/students`),
  getStudentDetails: (courseId, studentId) => axiosInstance.get(`/api/faculty/courses/${courseId}/students/${studentId}`),
  
  // Grade management
  getGrades: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/grades`),
  updateGrades: (courseId, studentId, grades) => 
    axiosInstance.put(`/api/faculty/courses/${courseId}/students/${studentId}/grades`, grades),
  bulkUpdateGrades: (courseId, gradesData) => 
    axiosInstance.put(`/api/faculty/courses/${courseId}/grades/bulk`, gradesData),
  
  // Attendance management
  getAttendance: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/attendance`),
  markAttendance: (courseId, attendanceData) => 
    axiosInstance.post(`/api/faculty/courses/${courseId}/attendance`, attendanceData),
  updateAttendance: (courseId, date, attendanceData) => 
    axiosInstance.put(`/api/faculty/courses/${courseId}/attendance/${date}`, attendanceData),
  
  // Assignment management
  getAssignments: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/assignments`),
  createAssignment: (courseId, assignmentData) => 
    axiosInstance.post(`/api/faculty/courses/${courseId}/assignments`, assignmentData),
  updateAssignment: (courseId, assignmentId, assignmentData) => 
    axiosInstance.put(`/api/faculty/courses/${courseId}/assignments/${assignmentId}`, assignmentData),
  deleteAssignment: (courseId, assignmentId) => 
    axiosInstance.delete(`/api/faculty/courses/${courseId}/assignments/${assignmentId}`),
  
  // Announcement management
  getAnnouncements: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/announcements`),
  createAnnouncement: (courseId, announcementData) => 
    axiosInstance.post(`/api/faculty/courses/${courseId}/announcements`, announcementData),
  updateAnnouncement: (courseId, announcementId, announcementData) => 
    axiosInstance.put(`/api/faculty/courses/${courseId}/announcements/${announcementId}`, announcementData),
  deleteAnnouncement: (courseId, announcementId) => 
    axiosInstance.delete(`/api/faculty/courses/${courseId}/announcements/${announcementId}`),
  
  // Statistics and reports
  getCourseStats: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/stats`),
  getAttendanceReport: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/attendance/report`),
  getGradesReport: (courseId) => axiosInstance.get(`/api/faculty/courses/${courseId}/grades/report`),
  
  // Search operations
  searchStudents: (courseId, query) => 
    axiosInstance.get(`/api/faculty/courses/${courseId}/students/search?q=${query}`),
  searchAssignments: (courseId, query) => 
    axiosInstance.get(`/api/faculty/courses/${courseId}/assignments/search?q=${query}`)
};
