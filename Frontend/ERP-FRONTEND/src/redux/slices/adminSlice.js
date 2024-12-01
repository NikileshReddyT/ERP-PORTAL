import { createSlice } from '@reduxjs/toolkit';
import { adminService } from '../../services/admin.service';

const initialState = {
  students: [],
  faculty: [],
  courses: [],
  departments: [],
  settings: {
    siteName: '',
    siteDescription: '',
    emailSettings: {
      smtpHost: '',
      smtpPort: '',
      smtpUser: '',
      smtpPassword: ''
    },
    generalSettings: {
      allowRegistration: false,
      maintenanceMode: false,
      defaultUserRole: 'student'
    }
  },
  stats: {
    totalUsers: 0,
    totalCourses: 0,
    totalDepartments: 0,
    activeUsers: 0
  },
  logs: [],
  loading: false,
  error: null,
  searchResults: {
    users: [],
    courses: [],
    departments: []
  }
};

const adminSlice = createSlice({
  name: 'admin',
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

    // User management
    setUsers: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },

    // Student management
    setStudents: (state, action) => {
      state.students = action.payload;
      state.loading = false;
      state.error = null;
    },
    addStudent: (state, action) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action) => {
      const index = state.students.findIndex(s => s.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    removeStudent: (state, action) => {
      state.students = state.students.filter(s => s.id !== action.payload);
    },

    // Faculty management
    setFaculty: (state, action) => {
      state.faculty = action.payload;
      state.loading = false;
      state.error = null;
    },
    addFaculty: (state, action) => {
      state.faculty.push(action.payload);
    },
    updateFaculty: (state, action) => {
      const index = state.faculty.findIndex(f => f.id === action.payload.id);
      if (index !== -1) {
        state.faculty[index] = action.payload;
      }
    },
    removeFaculty: (state, action) => {
      state.faculty = state.faculty.filter(f => f.id !== action.payload);
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
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(course => course.id !== action.payload);
    },

    // Department management
    setDepartments: (state, action) => {
      state.departments = action.payload;
      state.loading = false;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    updateDepartment: (state, action) => {
      const index = state.departments.findIndex(dept => dept.id === action.payload.id);
      if (index !== -1) {
        state.departments[index] = action.payload;
      }
    },
    deleteDepartment: (state, action) => {
      state.departments = state.departments.filter(dept => dept.id !== action.payload);
    },

    // Settings management
    setSettings: (state, action) => {
      state.settings = action.payload;
      state.loading = false;
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },

    // Statistics
    setStats: (state, action) => {
      state.stats = action.payload;
      state.loading = false;
    },

    // System logs
    setLogs: (state, action) => {
      state.logs = action.payload;
      state.loading = false;
    },
    addLog: (state, action) => {
      state.logs.unshift(action.payload);
    },

    // Search results
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.loading = false;
    },
    clearSearchResults: (state) => {
      state.searchResults = {
        users: [],
        courses: [],
        departments: []
      };
    }
  }
});

export const {
  setLoading,
  setError,
  setUsers,
  addUser,
  updateUser,
  deleteUser,
  setStudents,
  addStudent,
  updateStudent,
  removeStudent,
  setFaculty,
  addFaculty,
  updateFaculty,
  removeFaculty,
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
  setSettings,
  updateSettings,
  setStats,
  setLogs,
  addLog,
  setSearchResults,
  clearSearchResults
} = adminSlice.actions;

// Thunks
export const fetchStudents = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await adminService.getStudents();
    dispatch(setStudents(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchFaculty = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await adminService.getFaculty();
    dispatch(setFaculty(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default adminSlice.reducer;
