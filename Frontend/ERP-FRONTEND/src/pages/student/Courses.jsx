import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import CourseList from '../../components/student/CourseList';
import {
  BookOpenIcon,
  AcademicCapIcon,
  ClockIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';

const Courses = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Enrolled Courses',
      value: '6',
      icon: <BookOpenIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'Current semester'
    },
    {
      title: 'Total Credits',
      value: '18',
      icon: <AcademicCapIcon className="h-6 w-6 text-purple-500" />,
      trend: 3,
      description: 'Credit hours'
    },
    {
      title: 'Course Progress',
      value: '65%',
      icon: <ClockIcon className="h-6 w-6 text-green-500" />,
      trend: 5,
      description: 'Average completion'
    },
    {
      title: 'Study Groups',
      value: '4',
      icon: <UserGroupIcon className="h-6 w-6 text-yellow-500" />,
      trend: 2,
      description: 'Active groups'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Courses" 
        description="View and manage your enrolled courses"
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            description={stat.description}
          />
        ))}
      </div>

      {/* Course List */}
      <div className="mt-6">
        <CourseList />
      </div>
    </div>
  );
};

export default Courses;
