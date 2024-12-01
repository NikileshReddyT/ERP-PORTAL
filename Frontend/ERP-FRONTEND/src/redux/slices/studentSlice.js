import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    rollNumber: '',
    semester: '',
    batch: ''
  },
  courses: {
    enrolled: [],
    available: [],
    completed: []
  },
  grades: {},    // Mapped by courseId
  attendance: {}, // Mapped by courseId
  assignments: {}, // Mapped by courseId
  materials: {},  // Mapped by courseId
  notifications: [],
  progress: {
    currentGPA: 0,
    creditsCompleted: 0,
    creditsRequired: 0,
    attendancePercentage: 0,
    assignmentsCompleted: 0,
    assignmentsPending: 0
  },
  loading: false,
  error: null
};

const studentSlice = createSlice({
  name: 'student',
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
    enrollCourse: (state, action) => {
      const course = action.payload;
      state.courses.enrolled.push(course);
      state.courses.available = state.courses.available.filter(c => c.id !== course.id);
    },
    completeCourse: (state, action) => {
      const course = action.payload;
      state.courses.completed.push(course);
      state.courses.enrolled = state.courses.enrolled.filter(c => c.id !== course.id);
    },
    setAvailableCourses: (state, action) => {
      state.courses.available = action.payload;
    },

    // Grade management
    setGrades: (state, action) => {
      const { courseId, grades } = action.payload;
      state.grades[courseId] = grades;
      state.loading = false;
    },
    updateGrade: (state, action) => {
      const { courseId, grade } = action.payload;
      if (state.grades[courseId]) {
        state.grades[courseId] = { ...state.grades[courseId], ...grade };
      }
    },

    // Attendance management
    setAttendance: (state, action) => {
      const { courseId, attendance } = action.payload;
      state.attendance[courseId] = attendance;
      state.loading = false;
    },
    updateAttendance: (state, action) => {
      const { courseId, date, status } = action.payload;
      if (state.attendance[courseId]) {
        state.attendance[courseId][date] = status;
      }
    },

    // Assignment management
    setAssignments: (state, action) => {
      const { courseId, assignments } = action.payload;
      state.assignments[courseId] = assignments;
      state.loading = false;
    },
    updateAssignment: (state, action) => {
      const { courseId, assignmentId, update } = action.payload;
      if (state.assignments[courseId]) {
        const index = state.assignments[courseId].findIndex(a => a.id === assignmentId);
        if (index !== -1) {
          state.assignments[courseId][index] = {
            ...state.assignments[courseId][index],
            ...update
          };
        }
      }
    },
    submitAssignment: (state, action) => {
      const { courseId, assignmentId, submission } = action.payload;
      if (state.assignments[courseId]) {
        const index = state.assignments[courseId].findIndex(a => a.id === assignmentId);
        if (index !== -1) {
          state.assignments[courseId][index] = {
            ...state.assignments[courseId][index],
            submitted: true,
            submissionDate: new Date().toISOString(),
            submission
          };
        }
      }
    },

    // Course materials management
    setMaterials: (state, action) => {
      const { courseId, materials } = action.payload;
      state.materials[courseId] = materials;
      state.loading = false;
    },
    addMaterial: (state, action) => {
      const { courseId, material } = action.payload;
      if (!state.materials[courseId]) {
        state.materials[courseId] = [];
      }
      state.materials[courseId].push(material);
    },

    // Notification management
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.loading = false;
    },
    addNotification: (state, action) => {
      state.notifications.unshift(action.payload);
    },
    markNotificationRead: (state, action) => {
      const index = state.notifications.findIndex(n => n.id === action.payload);
      if (index !== -1) {
        state.notifications[index].read = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },

    // Progress tracking
    setProgress: (state, action) => {
      state.progress = action.payload;
      state.loading = false;
    },
    updateProgress: (state, action) => {
      state.progress = { ...state.progress, ...action.payload };
    }
  }
});

export const {
  setLoading,
  setError,
  setProfile,
  updateProfile,
  setCourses,
  enrollCourse,
  completeCourse,
  setAvailableCourses,
  setGrades,
  updateGrade,
  setAttendance,
  updateAttendance,
  setAssignments,
  updateAssignment,
  submitAssignment,
  setMaterials,
  addMaterial,
  setNotifications,
  addNotification,
  markNotificationRead,
  clearNotifications,
  setProgress,
  updateProgress
} = studentSlice.actions;

export default studentSlice.reducer;
