import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaChalkboardTeacher, FaPlus } from 'react-icons/fa';
import { fetchFaculty } from '../../redux/slices/adminSlice';

const FacultyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { faculty, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchFaculty());
  }, [dispatch]);

  const handleAddFaculty = () => {
    navigate('/register', {
      state: {
        preselectedRole: 'faculty',
        isAdminCreating: true
      }
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-200">Faculty</h2>
        <button
          onClick={handleAddFaculty}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus className="text-sm" />
          <span>Add Faculty</span>
        </button>
      </div>

      {(!faculty || faculty.length === 0) ? (
        <div className="text-center p-8 text-slate-400">
          <FaChalkboardTeacher className="text-4xl mx-auto mb-4" />
          <p className="text-lg">No faculty members registered yet.</p>
          <p className="text-sm mt-2">Click the Add Faculty button to register new faculty members.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {faculty.map((member) => (
            <div key={member.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-green-500 rounded-full p-3">
                  <FaChalkboardTeacher className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-200">{`${member.firstName} ${member.lastName}`}</h3>
                  <p className="text-sm text-slate-400">{member.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-slate-300">
                <p><span className="text-slate-400">ID:</span> {member.id}</p>
                <p><span className="text-slate-400">Username:</span> {member.username}</p>
                <p><span className="text-slate-400">Phone:</span> {member.phoneNumber || 'N/A'}</p>
                <p><span className="text-slate-400">Department:</span> {member.department || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FacultyList;
