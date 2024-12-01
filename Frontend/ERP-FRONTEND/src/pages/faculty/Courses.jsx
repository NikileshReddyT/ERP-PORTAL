import React from 'react';
import CourseManagement from '../../components/faculty/CourseManagement';

const Courses = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-200">Course Management</h1>
        <p className="text-slate-400 mt-1">Manage your assigned courses and student grades</p>
      </div>
      <CourseManagement />
    </div>
  );
};

export default Courses;
