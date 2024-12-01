import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { facultyService } from '../../services/faculty.service';
import { setCourses, setLoading, setError } from '../../redux/slices/facultySlice';
import GradeManagement from '../../components/faculty/GradeManagement';
import { FaChalkboardTeacher } from 'react-icons/fa';

const Students = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.faculty);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await facultyService.getCourses();
        dispatch(setCourses(response.data));
      } catch (error) {
        dispatch(setError(error.message));
      }
    };
    fetchCourses();
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
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-200">Student Management</h1>
        <p className="text-slate-400 mt-1">Manage grades and view student performance</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">Select Course</label>
            <select
              value={selectedCourse?.id || ''}
              onChange={(e) => setSelectedCourse(courses.find(c => c.id === e.target.value))}
              className="w-full bg-slate-700 text-slate-200 rounded px-3 py-2"
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          {selectedCourse && (
            <div className="mt-6">
              <div className="flex items-center mb-4">
                <FaChalkboardTeacher className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-xl font-semibold text-slate-200">{selectedCourse.name}</h3>
              </div>
              <GradeManagement courseId={selectedCourse.id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
