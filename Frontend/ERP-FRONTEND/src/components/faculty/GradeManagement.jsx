import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { facultyService } from '../../services/faculty.service';
import { setStudents, setLoading, setError } from '../../redux/slices/facultySlice';
import { toast } from 'react-toastify';

const GradeManagement = ({ courseId }) => {
  const dispatch = useDispatch();
  const { students, loading, error } = useSelector((state) => state.faculty);
  const [grades, setGrades] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      dispatch(setLoading(true));
      try {
        const response = await facultyService.getCourseStudents(courseId);
        dispatch(setStudents({ courseId, students: response.data }));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    fetchStudents();
  }, [courseId, dispatch]);

  const handleGradeChange = (studentId, value) => {
    setGrades(prev => ({
      ...prev,
      [studentId]: value
    }));
  };

  const handleSubmit = async (studentId) => {
    try {
      await facultyService.updateGrades(courseId, studentId, { grade: grades[studentId] });
      toast.success('Grade updated successfully');
    } catch (error) {
      toast.error('Failed to update grade');
    }
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

  const courseStudents = students[courseId] || [];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Student Name</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Current Grade</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">New Grade</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courseStudents.map((student) => (
            <tr key={student.id} className="border-b border-slate-700 hover:bg-slate-800">
              <td className="px-6 py-4 text-sm text-slate-300">{student.name}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{student.currentGrade}</td>
              <td className="px-6 py-4">
                <input
                  type="text"
                  className="bg-slate-700 text-slate-200 rounded px-2 py-1"
                  value={grades[student.id] || ''}
                  onChange={(e) => handleGradeChange(student.id, e.target.value)}
                />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleSubmit(student.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeManagement;
