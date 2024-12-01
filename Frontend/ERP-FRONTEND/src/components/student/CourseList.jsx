import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { studentService } from '../../services/student.service';
import { setCourses, setLoading, setError } from '../../redux/slices/studentSlice';
import { FaBook, FaCalendarAlt, FaChalkboardTeacher } from 'react-icons/fa';

const CourseList = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    const fetchCourses = async () => {
      dispatch(setLoading(true));
      try {
        const response = await studentService.getEnrolledCourses();
        const enrollments = response.data;
        
        // Transform enrollments into course data structure
        const enrolledCourses = enrollments.map(enrollment => ({
          id: enrollment.course.id,
          name: enrollment.course.name,
          code: enrollment.course.code,
          instructor: enrollment.course.faculty.name,
          schedule: enrollment.course.schedule,
          credits: enrollment.course.credits,
          department: enrollment.course.department,
          semester: enrollment.course.semester,
          status: enrollment.status
        }));

        dispatch(setCourses({
          enrolled: enrolledCourses,
          available: [],
          completed: []
        }));
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

  if (!courses.enrolled || courses.enrolled.length === 0) {
    return (
      <div className="text-center p-8 text-slate-400">
        <FaBook className="text-4xl mx-auto mb-4" />
        <p className="text-lg">No courses enrolled yet.</p>
        <p className="text-sm mt-2">Check available courses to enroll.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {courses.enrolled.map((course) => (
        <div key={course.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center mb-4">
            <FaBook className="text-blue-500 text-2xl mr-3" />
            <div>
              <h3 className="text-xl font-semibold text-slate-200">{course.name}</h3>
              <p className="text-sm text-slate-400">{course.code}</p>
            </div>
          </div>
          <div className="space-y-3 text-slate-300">
            <div className="flex items-center">
              <FaChalkboardTeacher className="mr-2" />
              <span>{course.instructor}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>{course.schedule}</span>
            </div>
            <div className="mt-4 py-1 px-3 rounded text-sm inline-block" 
              style={{ 
                backgroundColor: course.status === 'ACTIVE' ? '#10B981' : '#F59E0B',
                opacity: 0.8 
              }}>
              {course.status}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;
