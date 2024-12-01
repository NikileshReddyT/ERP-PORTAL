import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentService } from '../../services/student.service';
import { setGrades, setLoading, setError } from '../../redux/slices/studentSlice';

const GradeTable = () => {
  const dispatch = useDispatch();
  const { grades, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    const fetchGrades = async () => {
      dispatch(setLoading(true));
      try {
        const response = await studentService.getGrades();
        dispatch(setGrades(response.data));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    fetchGrades();
  }, [dispatch]);

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
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Course</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Grade</th>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-200">Status</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade) => (
            <tr key={grade.courseId} className="border-b border-slate-700 hover:bg-slate-800">
              <td className="px-6 py-4 text-sm text-slate-300">{grade.courseName}</td>
              <td className="px-6 py-4 text-sm text-slate-300">{grade.grade}</td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  grade.status === 'Passed' 
                    ? 'bg-green-900 text-green-200' 
                    : 'bg-red-900 text-red-200'
                }`}>
                  {grade.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GradeTable;
