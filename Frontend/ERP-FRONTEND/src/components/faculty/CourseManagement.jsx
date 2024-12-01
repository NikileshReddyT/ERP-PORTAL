import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { facultyService } from '../../services/faculty.service';
import { setCourses, setLoading, setError } from '../../redux/slices/facultySlice';
import { FaChalkboardTeacher, FaUsers, FaClock } from 'react-icons/fa';

const CourseManagement = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.faculty);

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaChalkboardTeacher className="text-blue-500 text-2xl mr-3" />
            <h3 className="text-xl font-semibold text-slate-200">{course.name}</h3>
          </div>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span>{course.enrolledStudents} Students</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-2" />
              <span>{course.schedule}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-300">
              Manage Course
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseManagement;
