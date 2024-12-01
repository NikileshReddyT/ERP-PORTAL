import { axiosInstance } from './api';

export const adminService = {
  // Student management
  getStudents: () => axiosInstance.get('/api/admin/students'),
  createStudent: (studentData) => axiosInstance.post('/api/admin/students', studentData),
  updateStudent: (studentId, studentData) => axiosInstance.put(`/api/admin/students/${studentId}`, studentData),
  deleteStudent: (studentId) => axiosInstance.delete(`/api/admin/students/${studentId}`),
  
  // Faculty management
  getFaculty: () => axiosInstance.get('/api/admin/faculty'),
  createFaculty: (facultyData) => axiosInstance.post('/api/admin/faculty', facultyData),
  updateFaculty: (facultyId, facultyData) => axiosInstance.put(`/api/admin/faculty/${facultyId}`, facultyData),
  deleteFaculty: (facultyId) => axiosInstance.delete(`/api/admin/faculty/${facultyId}`),

  // User management
  getUsers: () => axiosInstance.get('/api/admin/users'),
  createUser: (userData) => axiosInstance.post('/api/admin/users', userData),
  updateUser: (userId, userData) => axiosInstance.put(`/api/admin/users/${userId}`, userData),
  deleteUser: (userId) => axiosInstance.delete(`/api/admin/users/${userId}`),
  
  // Course management
  getCourses: () => axiosInstance.get('/api/admin/courses'),
  createCourse: (courseData) => axiosInstance.post('/api/admin/courses', courseData),
  updateCourse: (courseId, courseData) => axiosInstance.put(`/api/admin/courses/${courseId}`, courseData),
  deleteCourse: (courseId) => axiosInstance.delete(`/api/admin/courses/${courseId}`),
  
  // Department management
  getDepartments: () => axiosInstance.get('/api/admin/departments'),
  createDepartment: (deptData) => axiosInstance.post('/api/admin/departments', deptData),
  updateDepartment: (deptId, deptData) => axiosInstance.put(`/api/admin/departments/${deptId}`, deptData),
  deleteDepartment: (deptId) => axiosInstance.delete(`/api/admin/departments/${deptId}`),
  
  // Settings management
  getSettings: () => axiosInstance.get('/api/admin/settings'),
  updateSettings: (settingsData) => axiosInstance.put('/api/admin/settings', settingsData),
  
  // Statistics and reports
  getDashboardStats: () => axiosInstance.get('/api/admin/dashboard/stats'),
  getUserStats: () => axiosInstance.get('/api/admin/stats/users'),
  getCourseStats: () => axiosInstance.get('/api/admin/stats/courses'),
  
  // System logs
  getSystemLogs: (page = 0, size = 10) => axiosInstance.get(`/api/admin/logs?page=${page}&size=${size}`),
  
  // Bulk operations
  bulkCreateUsers: (usersData) => axiosInstance.post('/api/admin/users/bulk', usersData),
  bulkUpdateUsers: (usersData) => axiosInstance.put('/api/admin/users/bulk', usersData),
  bulkDeleteUsers: (userIds) => axiosInstance.post('/api/admin/users/bulk-delete', { userIds }),
  
  // Search operations
  searchUsers: (query) => axiosInstance.get(`/api/admin/users/search?q=${query}`),
  searchCourses: (query) => axiosInstance.get(`/api/admin/courses/search?q=${query}`),
  searchDepartments: (query) => axiosInstance.get(`/api/admin/departments/search?q=${query}`),
  searchStudents: (query) => axiosInstance.get(`/api/admin/students/search?q=${query}`),
  searchFaculty: (query) => axiosInstance.get(`/api/admin/faculty/search?q=${query}`)
};
