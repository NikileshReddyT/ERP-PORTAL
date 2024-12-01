import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    specialization: '',
    qualification: ''
  },
  courses: [],
  students: {},  // Mapped by courseId
  grades: {},    // Mapped by courseId
  attendance: {}, // Mapped by courseId
  assignments: {},// Mapped by courseId
  announcements: [], // All announcements
  stats: {
    totalStudents: 0,
    averageAttendance: 0,
    assignmentsGraded: 0,
    pendingGrades: 0
  },
  loading: false,
  error: null
};

const facultySlice = createSlice({
  name: 'faculty',
  initialState,
  reducers: {
    // Loading and error states
    setLoading: (state, action) => {
      state.loading = action.payload;
      if (action.payload === true) {
        state.error = null;
      }
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Profile management
    setProfile: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },

    // Course management
    setCourses: (state, action) => {
      state.courses = action.payload;
      state.loading = false;
    },
    addCourse: (state, action) => {
      state.courses.push(action.payload);
    },
    updateCourse: (state, action) => {
      const index = state.courses.findIndex(course => course.id === action.payload.id);
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    removeCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },

    // Student management
    setStudents: (state, action) => {
      const { courseId, students } = action.payload;
      state.students[courseId] = students;
      state.loading = false;
    },
    updateStudent: (state, action) => {
      const { courseId, student } = action.payload;
      const courseStudents = state.students[courseId] || [];
      const index = courseStudents.findIndex(s => s.id === student.id);
      if (index !== -1) {
        courseStudents[index] = student;
      }
    },

    // Grade management
    setGrades: (state, action) => {
      const { courseId, grades } = action.payload;
      state.grades[courseId] = grades;
      state.loading = false;
    },
    updateGrades: (state, action) => {
      const { courseId, studentId, grades } = action.payload;
      if (state.grades[courseId]) {
        state.grades[courseId] = state.grades[courseId].map(grade => 
          grade.studentId === studentId ? { ...grade, ...grades } : grade
        );
      }
    },

    // Attendance management
    setAttendance: (state, action) => {
      const { courseId, attendance } = action.payload;
      state.attendance[courseId] = attendance;
      state.loading = false;
    },
    updateAttendance: (state, action) => {
      const { courseId, date, attendance } = action.payload;
      if (state.attendance[courseId]) {
        state.attendance[courseId][date] = attendance;
      }
    },

    // Assignment management
    setAssignments: (state, action) => {
      const { courseId, assignments } = action.payload;
      state.assignments[courseId] = assignments;
      state.loading = false;
    },
    addAssignment: (state, action) => {
      const { courseId, assignment } = action.payload;
      if (!state.assignments[courseId]) {
        state.assignments[courseId] = [];
      }
      state.assignments[courseId].push(assignment);
    },
    updateAssignment: (state, action) => {
      const { courseId, assignment } = action.payload;
      const courseAssignments = state.assignments[courseId] || [];
      const index = courseAssignments.findIndex(a => a.id === assignment.id);
      if (index !== -1) {
        courseAssignments[index] = assignment;
      }
    },
    removeAssignment: (state, action) => {
      const { courseId, assignmentId } = action.payload;
      if (state.assignments[courseId]) {
        state.assignments[courseId] = state.assignments[courseId].filter(
          a => a.id !== assignmentId
        );
      }
    },

    // Announcement management
    setAnnouncements: (state, action) => {
      state.announcements = action.payload;
      state.loading = false;
    },
    addAnnouncement: (state, action) => {
      state.announcements.unshift(action.payload);
    },
    updateAnnouncement: (state, action) => {
      const index = state.announcements.findIndex(a => a.id === action.payload.id);
      if (index !== -1) {
        state.announcements[index] = action.payload;
      }
    },
    removeAnnouncement: (state, action) => {
      state.announcements = state.announcements.filter(a => a.id !== action.payload);
    },

    // Statistics
    setStats: (state, action) => {
      state.stats = action.payload;
      state.loading = false;
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    }
  }
});

export const {
  setLoading,
  setError,
  setProfile,
  updateProfile,
  setCourses,
  addCourse,
  updateCourse,
  removeCourse,
  setStudents,
  updateStudent,
  setGrades,
  updateGrades,
  setAttendance,
  updateAttendance,
  setAssignments,
  addAssignment,
  updateAssignment,
  removeAssignment,
  setAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  removeAnnouncement,
  setStats,
  updateStats
} = facultySlice.actions;

export default facultySlice.reducer;
