import axios from 'axios';
import { store } from '../redux/store';

const API_URL = 'http://localhost:8080/';

// Create axios instance with default config
export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests if available
axiosInstance.interceptors.request.use(
    (config) => {
        const state = store.getState();
        const token = state.auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            store.dispatch({ type: 'auth/logout' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Auth Service
export const authService = {
    login: async (username, password) => {
        const response = await axiosInstance.post('/auth/login', { username, password });
        if (response.data.token) {
            store.dispatch({ type: 'auth/login', payload: response.data });
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await axiosInstance.post('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        store.dispatch({ type: 'auth/logout' });
    },
    getCurrentUser: () => {
        const state = store.getState();
        return state.auth.user;
    },
    isAuthenticated: () => {
        const state = store.getState();
        return state.auth.isAuthenticated;
    },
    hasRole: (role) => {
        const state = store.getState();
        return state.auth.user?.roles?.includes(role);
    },
    isAdmin: () => {
        return authService.hasRole('ROLE_ADMIN');
    },
    isFaculty: () => {
        return authService.hasRole('ROLE_FACULTY');
    },
    isStudent: () => {
        return authService.hasRole('ROLE_STUDENT');
    }
};

// Course Service
export const courseService = {
    getAllCourses: async (page = 0, size = 10) => {
        const response = await axiosInstance.get(`/courses?page=${page}&size=${size}`);
        return response.data;
    },
    getCourse: async (id) => {
        const response = await axiosInstance.get(`/courses/${id}`);
        return response.data;
    },
    createCourse: async (courseData) => {
        const response = await axiosInstance.post('/courses', courseData);
        return response.data;
    },
    updateCourse: async (id, courseData) => {
        const response = await axiosInstance.put(`/courses/${id}`, courseData);
        return response.data;
    },
    deleteCourse: async (id) => {
        const response = await axiosInstance.delete(`/courses/${id}`);
        return response.data;
    },
};

// Assessment Service
export const assessmentService = {
    getAssessments: async () => {
        const response = await axiosInstance.get('/assessments');
        return response.data;
    },
    getAssessment: async (id) => {
        const response = await axiosInstance.get(`/assessments/${id}`);
        return response.data;
    },
    createAssessment: async (assessmentData) => {
        const response = await axiosInstance.post('/assessments', assessmentData);
        return response.data;
    },
    updateAssessment: async (id, assessmentData) => {
        const response = await axiosInstance.put(`/assessments/${id}`, assessmentData);
        return response.data;
    },
    deleteAssessment: async (id) => {
        const response = await axiosInstance.delete(`/assessments/${id}`);
        return response.data;
    },
    getUpcomingAssessments: async () => {
        const response = await axiosInstance.get('/assessments/upcoming');
        return response.data;
    },
};

// Attendance Service
export const attendanceService = {
    getAttendance: async (courseId) => {
        const response = await axiosInstance.get(`/attendance/${courseId}`);
        return response.data;
    },
    markAttendance: async (attendanceData) => {
        const response = await axiosInstance.post('/attendance', attendanceData);
        return response.data;
    },
    updateAttendance: async (id, attendanceData) => {
        const response = await axiosInstance.put(`/attendance/${id}`, attendanceData);
        return response.data;
    },
};

export default axiosInstance;
