import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Layouts
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminAnalytics from './pages/admin/Analytics';
import AdminAuditLogs from './pages/admin/AuditLogs';
import AdminCompliance from './pages/admin/Compliance';
import AdminCourses from './pages/admin/Courses';
import AdminDepartments from './pages/admin/Departments';
import AdminDocumentManagement from './pages/admin/DocumentManagement';
import AdminFaculty from './pages/admin/Faculty';
import AdminNotifications from './pages/admin/Notifications';
import AdminReports from './pages/admin/Reports';
import AdminRoleManagement from './pages/admin/RoleManagement';
import AdminSettings from './pages/admin/Settings';
import AdminStudents from './pages/admin/Students';
import AdminUserManagement from './pages/admin/UserManagement';

// Faculty Pages
import FacultyDashboard from './pages/faculty/Dashboard';
import FacultyAssessments from './pages/faculty/Assessments';
import FacultyAttendance from './pages/faculty/Attendance';
import FacultyCourses from './pages/faculty/Courses';
import FacultyGrades from './pages/faculty/Grades';
import FacultyLeave from './pages/faculty/Leave';
import FacultyMaterials from './pages/faculty/Materials';
import FacultyProfile from './pages/faculty/Profile';
import FacultyResearch from './pages/faculty/Research';
import FacultySchedule from './pages/faculty/Schedule';
import FacultyStudents from './pages/faculty/Students';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAssignments from './pages/student/Assignments';
import StudentAttendance from './pages/student/Attendance';
import StudentCourses from './pages/student/Courses';
import StudentExams from './pages/student/Exams';
import StudentFees from './pages/student/Fees';
import StudentGrades from './pages/student/Grades';
import StudentMaterials from './pages/student/Materials';
import StudentProfile from './pages/student/Profile';
import StudentSchedule from './pages/student/Schedule';

// Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {/* Admin Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/audit-logs" element={<AdminAuditLogs />} />
            <Route path="/admin/compliance" element={<AdminCompliance />} />
            <Route path="/admin/courses" element={<AdminCourses />} />
            <Route path="/admin/departments" element={<AdminDepartments />} />
            <Route path="/admin/documents" element={<AdminDocumentManagement />} />
            <Route path="/admin/faculty" element={<AdminFaculty />} />
            <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/reports" element={<AdminReports />} />
            <Route path="/admin/roles" element={<AdminRoleManagement />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
          </Route>

          {/* Faculty Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
            <Route path="/faculty/assessments" element={<FacultyAssessments />} />
            <Route path="/faculty/attendance" element={<FacultyAttendance />} />
            <Route path="/faculty/courses" element={<FacultyCourses />} />
            <Route path="/faculty/grades" element={<FacultyGrades />} />
            <Route path="/faculty/leave" element={<FacultyLeave />} />
            <Route path="/faculty/materials" element={<FacultyMaterials />} />
            <Route path="/faculty/profile" element={<FacultyProfile />} />
            <Route path="/faculty/research" element={<FacultyResearch />} />
            <Route path="/faculty/schedule" element={<FacultySchedule />} />
            <Route path="/faculty/students" element={<FacultyStudents />} />
          </Route>

          {/* Student Routes */}
          <Route element={<DashboardLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboard />} />
            <Route path="/student/assignments" element={<StudentAssignments />} />
            <Route path="/student/attendance" element={<StudentAttendance />} />
            <Route path="/student/courses" element={<StudentCourses />} />
            <Route path="/student/exams" element={<StudentExams />} />
            <Route path="/student/fees" element={<StudentFees />} />
            <Route path="/student/grades" element={<StudentGrades />} />
            <Route path="/student/materials" element={<StudentMaterials />} />
            <Route path="/student/profile" element={<StudentProfile />} />
            <Route path="/student/schedule" element={<StudentSchedule />} />
          </Route>
        </Route>

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Router>
  );
}

export default App;
