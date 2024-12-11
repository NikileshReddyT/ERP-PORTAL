import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authService } from '../../services/auth.service';
import { ROUTES } from '../../constants/routes';
import { 
  UserPlusIcon, 
  EyeIcon, 
  EyeSlashIcon,
  InformationCircleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get role from location state, default to STUDENT
  const role = location.state?.role || 'STUDENT';

  // Determine page title based on role
  const pageTitle = useMemo(() => {
    switch(role) {
      case 'ADMIN': return 'Admin Registration';
      case 'FACULTY': return 'Faculty Registration';
      case 'STUDENT': return 'Student Registration';
      default: return 'Registration';
    }
  }, [role]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    username: '',
    roles: [role]
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Handle back navigation
  const handleGoBack = () => {
    // If there's a previous state with a specific route, use that
    const previousRoute = location.state?.from || -1;
    navigate(previousRoute);
  };

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let strength = 0;
    if (password.length > 7) strength++;
    if (password.match(/[a-z]+/)) strength++;
    if (password.match(/[A-Z]+/)) strength++;
    if (password.match(/[0-9]+/)) strength++;
    if (password.match(/[$@#&!]+/)) strength++;
    return strength;
  };

  // Update roles when role changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      roles: [role]
    }));
  }, [role]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Check password strength
    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.register(formData);
      toast.success('Registration successful! Please login.');
      navigate(ROUTES.LOGIN);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="bg-slate-800 shadow-2xl rounded-2xl border border-slate-700 overflow-hidden">
          <div className="px-6 py-8 sm:px-10 relative">
            <button 
              onClick={handleGoBack}
              className="absolute top-4 left-4 text-slate-400 hover:text-white transition duration-300 flex items-center"
            >
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
              <span className="text-sm">Back</span>
            </button>

            <div className="text-center mb-8">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-500/10 mb-4">
                <UserPlusIcon className="h-8 w-8 text-indigo-500" />
              </div>
              <h2 className="text-3xl font-extrabold text-white">
                {pageTitle}
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Create a new account for the ERP Portal
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-slate-300 mb-2">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-slate-300 mb-2">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-300 mb-2">
                  Phone Number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  required
                  className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full px-3 py-2.5 bg-slate-700 border border-slate-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10 transition duration-300"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 flex items-center space-x-2">
                    {[...Array(5)].map((_, index) => (
                      <div
                        key={index}
                        className={`h-1.5 w-1/5 rounded-full ${
                          index < passwordStrength 
                            ? 'bg-green-500' 
                            : 'bg-slate-600'
                        }`}
                      />
                    ))}
                    <div className="flex items-center text-slate-400">
                      <InformationCircleIcon className="h-4 w-4 mr-1" />
                      <span className="text-xs">
                        {passwordStrength < 3 
                          ? 'Weak' 
                          : passwordStrength < 5 
                            ? 'Medium' 
                            : 'Strong'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-101"
                >
                  {loading ? 'Creating Account...' : `Create ${pageTitle}`}
                </button>
              </div>
            </form>
          </div>

          <div className="px-6 py-4 bg-slate-700/50 border-t border-slate-600 text-center">
            <span className="text-sm text-slate-400">
              Already have an account?{' '}
              <Link
                to={ROUTES.LOGIN}
                className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-300"
              >
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
