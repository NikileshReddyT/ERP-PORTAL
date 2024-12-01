import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { facultyService } from '../../services/faculty.service';
import { setProfile, setLoading, setError } from '../../redux/slices/facultySlice';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBuilding } from 'react-icons/fa';

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.faculty);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    specialization: '',
    qualification: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(setLoading(true));
      try {
        const response = await facultyService.getProfile();
        dispatch(setProfile(response.data));
        setFormData(response.data);
      } catch (error) {
        dispatch(setError(error.message));
        toast.error('Failed to load profile');
      }
    };
    fetchProfile();
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await facultyService.updateProfile(formData);
      dispatch(setProfile(formData));
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      dispatch(setError(error.message));
      toast.error('Failed to update profile');
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
        <h1 className="text-2xl font-bold text-slate-200">Faculty Profile</h1>
        <p className="text-slate-400 mt-1">View and update your professional information</p>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">First Name</label>
              <div className="flex items-center">
                <FaUser className="text-slate-400 mr-2" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Last Name</label>
              <div className="flex items-center">
                <FaUser className="text-slate-400 mr-2" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Email</label>
              <div className="flex items-center">
                <FaEnvelope className="text-slate-400 mr-2" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Phone</label>
              <div className="flex items-center">
                <FaPhone className="text-slate-400 mr-2" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Department</label>
              <div className="flex items-center">
                <FaBuilding className="text-slate-400 mr-2" />
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Specialization</label>
              <div className="flex items-center">
                <FaGraduationCap className="text-slate-400 mr-2" />
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2 disabled:opacity-50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Qualification</label>
            <div className="flex items-center">
              <FaGraduationCap className="text-slate-400 mr-2" />
              <textarea
                name="qualification"
                value={formData.qualification}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2 disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-slate-300 hover:text-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
