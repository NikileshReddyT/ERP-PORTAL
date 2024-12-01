import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUserGraduate, FaPlus } from 'react-icons/fa';
import { fetchStudents } from '../../redux/slices/adminSlice';

const StudentList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { students, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleAddStudent = () => {
    navigate('/register', { 
      state: { 
        preselectedRole: 'student',
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
        <h2 className="text-2xl font-bold text-slate-200">Students</h2>
        <button
          onClick={handleAddStudent}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <FaPlus className="text-sm" />
          <span>Add Student</span>
        </button>
      </div>

      {(!students || students.length === 0) ? (
        <div className="text-center p-8 text-slate-400">
          <FaUserGraduate className="text-4xl mx-auto mb-4" />
          <p className="text-lg">No students registered yet.</p>
          <p className="text-sm mt-2">Click the Add Student button to register new students.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-500 rounded-full p-3">
                  <FaUserGraduate className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-200">{`${student.firstName} ${student.lastName}`}</h3>
                  <p className="text-sm text-slate-400">{student.email}</p>
                </div>
              </div>
              <div className="space-y-2 text-slate-300">
                <p><span className="text-slate-400">ID:</span> {student.id}</p>
                <p><span className="text-slate-400">Username:</span> {student.username}</p>
                <p><span className="text-slate-400">Phone:</span> {student.phoneNumber || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
