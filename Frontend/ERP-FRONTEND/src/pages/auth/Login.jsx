import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { loginSuccess, loginStart, loginFailure } from '../../redux/slices/authSlice';
import { authService } from '../../services/auth.service';
import { 
  UserIcon, 
  LockClosedIcon, 
  ArrowRightIcon, 
  BuildingLibraryIcon,
  ExclamationCircleIcon 
} from '@heroicons/react/24/outline';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'ROLE_STUDENT', // Default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // If user is already authenticated, redirect to their dashboard
    if (isAuthenticated && user?.roles?.[0]) {
      const role = user.roles[0].toLowerCase().replace('role_', '');
      navigate(`/${role}/dashboard`, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    dispatch(loginStart());

    try {
      // For testing, we'll create a mock response with proper role structure
      const mockResponse = {
        id: 1,
        username: formData.username,
        email: `${formData.username}@example.com`,
        roles: [formData.role], // This should be an array with the selected role
        token: 'mock-token-' + Date.now(),
        refreshToken: 'mock-refresh-token-' + Date.now()
      };

      // Store the mock response in localStorage to persist the session
      localStorage.setItem('token', mockResponse.token);
      localStorage.setItem('user', JSON.stringify({
        id: mockResponse.id,
        username: mockResponse.username,
        email: mockResponse.email,
        roles: mockResponse.roles
      }));

      dispatch(loginSuccess(mockResponse));
      toast.success('Welcome back! Login successful.');

      const userRole = mockResponse.roles[0];
      const dashboardPath = `/${userRole.toLowerCase().replace('role_', '')}/dashboard`;
      navigate(dashboardPath);
    } catch (error) {
      console.error('Login failed:', error);
      const errorMessage = error.response?.data?.message || 'Invalid credentials. Please try again.';
      setError(errorMessage);
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Professional Gradient Overlay */}
      {/* <div className="absolute inset-0 bg-grid-pattern opacity-5"></div> */}
      
      {/* Subtle Light Effects */}
      <div className="absolute inset-0 px-2 ">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg px-6">
        {/* Enterprise Header */}
        <div className="text-center mb-8 select-none">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-2xl shadow-lg">
              <BuildingLibraryIcon className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-white mb-2 tracking-tight">
            Enterprise Resource Portal
          </h1>
          <p className="text-slate-400 text-base">
            Secure access to your enterprise workspace
          </p>
        </div>

        {/* Login Form Card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockClosedIcon className="h-5 w-5 text-slate-400" aria-hidden="true" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            {/* Role Selection (Temporary for testing) */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-300 mb-1">
                Role (Temporary for Testing)
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full pl-3 pr-10 py-2 bg-slate-800/50 border border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
              >
                <option value="ROLE_STUDENT">Student</option>
                <option value="ROLE_FACULTY">Faculty</option>
                <option value="ROLE_ADMIN">Admin</option>
              </select>
            </div>

            {error && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400 flex items-center">
                <ExclamationCircleIcon className="h-5 w-5 mr-2" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign in
                  <ArrowRightIcon className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Enterprise Footer */}
          <div className="mt-8 text-center">
            <p className="text-slate-400 text-sm">
              Need an account?{' '}
              <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                Contact IT Support
              </button>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex justify-center items-center gap-2 text-slate-400 text-sm">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span>Enterprise-grade security</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
