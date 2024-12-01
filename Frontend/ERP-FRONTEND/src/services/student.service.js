import { axiosInstance } from './api';

export const studentService = {
  // Profile management
  getProfile: () => axiosInstance.get('/api/students/profile'),
  updateProfile: (profileData) => axiosInstance.put('/api/students/profile', profileData),
  
  // Course management
  getEnrolledCourses: () => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return axiosInstance.get(`/enrollments/student/${userId}`);
  },
  getCourseDetails: (courseId) => axiosInstance.get(`/courses/${courseId}`),
  getAvailableCourses: () => axiosInstance.get('/courses/available'),
  enrollCourse: (courseId) => {
    const userId = JSON.parse(localStorage.getItem('user')).id;
    return axiosInstance.post(`/enrollments/student/${userId}/course/${courseId}`);
  },
  dropCourse: async (courseId) => {
    await delay(500);
    return Promise.resolve({ data: { message: 'Successfully dropped' } });
  },
  
  // Grade management
  getGrades: async () => {
    await delay(500);
    return Promise.resolve({ data: mockGrades });
  },
  getCourseGrades: async (courseId) => {
    await delay(300);
    return Promise.resolve({ data: mockGrades[courseId] || [] });
  },
  
  // Attendance management
  getAttendance: async () => {
    await delay(500);
    return Promise.resolve({ data: mockAttendance });
  },
  getCourseAttendance: (courseId) => 
    axiosInstance.get(`/attendance/course/${courseId}/student`),
  
  // Assignment management
  getAssignments: (courseId) => axiosInstance.get(`/assessments/course/${courseId}`),
  getCourseAssignments: async (courseId) => {
    await delay(300);
    return Promise.resolve({ data: mockAssignments[courseId] || [] });
  },
  submitAssignment: (assessmentId, submissionData) => 
    axiosInstance.post(`/submissions/assessment/${assessmentId}`, submissionData),
  getSubmission: (assessmentId) => 
    axiosInstance.get(`/submissions/assessment/${assessmentId}/student`),

  // Course materials
  getCourseMaterials: async (courseId) => {
    await delay(500);
    return Promise.resolve({ data: mockMaterials[courseId] || [] });
  },
  
  // Announcements
  getAnnouncements: async () => {
    await delay(500);
    return Promise.resolve({ data: mockAnnouncements });
  },
  getCourseAnnouncements: async (courseId) => {
    await delay(300);
    const courseAnnouncements = mockAnnouncements.filter(a => a.courseId === courseId);
    return Promise.resolve({ data: courseAnnouncements });
  },
  
  // Progress tracking
  getProgress: async () => {
    await delay(500);
    return Promise.resolve({
      data: {
        currentGPA: 3.75,
        creditsCompleted: 45,
        creditsRequired: 120,
        attendancePercentage: 92,
        assignmentsCompleted: 15,
        assignmentsPending: 3
      }
    });
  },
  getCourseProgress: (courseId) => 
    axiosInstance.get(`/submissions/course/${courseId}/progress`),
};

// Helper function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
