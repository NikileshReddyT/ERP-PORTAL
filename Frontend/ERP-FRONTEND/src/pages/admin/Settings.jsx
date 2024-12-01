import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminService } from '../../services/admin.service';
import { setSettings, setLoading, setError } from '../../redux/slices/adminSlice';
import { toast } from 'react-toastify';
import { FaCog, FaEnvelope, FaGlobe, FaLock } from 'react-icons/fa';

const Settings = () => {
  const dispatch = useDispatch();
  const { settings, loading } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    dispatch(setLoading(true));
    try {
      const response = await adminService.getSettings();
      dispatch(setSettings(response.data));
      setFormData(response.data);
    } catch (error) {
      dispatch(setError(error.message));
      toast.error('Failed to load settings');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await adminService.updateSettings(formData);
      dispatch(setSettings(formData));
      toast.success('Settings updated successfully');
    } catch (error) {
      dispatch(setError(error.message));
      toast.error('Failed to update settings');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-200">System Settings</h1>
        <p className="text-slate-400 mt-1">Configure system-wide settings</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Site Settings */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaGlobe className="text-blue-500 text-2xl mr-3" />
            <h2 className="text-xl font-semibold text-slate-200">Site Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Site Description</label>
              <input
                type="text"
                name="siteDescription"
                value={formData.siteDescription}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaEnvelope className="text-blue-500 text-2xl mr-3" />
            <h2 className="text-xl font-semibold text-slate-200">Email Settings</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">SMTP Host</label>
              <input
                type="text"
                name="emailSettings.smtpHost"
                value={formData.emailSettings.smtpHost}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">SMTP Port</label>
              <input
                type="text"
                name="emailSettings.smtpPort"
                value={formData.emailSettings.smtpPort}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">SMTP User</label>
              <input
                type="text"
                name="emailSettings.smtpUser"
                value={formData.emailSettings.smtpUser}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">SMTP Password</label>
              <input
                type="password"
                name="emailSettings.smtpPassword"
                value={formData.emailSettings.smtpPassword}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* General Settings */}
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <FaCog className="text-blue-500 text-2xl mr-3" />
            <h2 className="text-xl font-semibold text-slate-200">General Settings</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="generalSettings.allowRegistration"
                checked={formData.generalSettings.allowRegistration}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-slate-300">
                Allow User Registration
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="generalSettings.maintenanceMode"
                checked={formData.generalSettings.maintenanceMode}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-slate-300">
                Maintenance Mode
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Default User Role</label>
              <select
                name="generalSettings.defaultUserRole"
                value={formData.generalSettings.defaultUserRole}
                onChange={handleInputChange}
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
              >
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-300"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
