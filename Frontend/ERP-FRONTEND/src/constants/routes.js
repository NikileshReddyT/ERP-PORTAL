export const ROUTES = {
  // Auth routes
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  
  // Dashboard routes
  ADMIN_DASHBOARD: '/admin/dashboard',
  FACULTY_DASHBOARD: '/faculty/dashboard',
  STUDENT_DASHBOARD: '/student/dashboard',
  
  // Course routes
  COURSES: '/courses',
  COURSE_DETAILS: '/courses/:id',
  NEW_COURSE: '/courses/new',
  EDIT_COURSE: '/courses/:id/edit',
  
  // Assessment routes
  ASSESSMENTS: '/assessments',
  ASSESSMENT_DETAILS: '/assessments/:id',
  NEW_ASSESSMENT: '/assessments/new',
  EDIT_ASSESSMENT: '/assessments/:id/edit',
  
  // User management routes
  USERS: '/admin/users',
  USER_DETAILS: '/admin/users/:id',
  NEW_USER: '/admin/users/new',
  EDIT_USER: '/admin/users/:id/edit',
};
