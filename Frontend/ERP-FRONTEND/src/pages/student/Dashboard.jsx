import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  BookOpenIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Enrolled Courses',
      value: '5',
      icon: <BookOpenIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: '2 active now'
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      icon: <CalendarDaysIcon className="h-6 w-6 text-purple-500" />,
      trend: 3.2,
      description: 'Overall presence'
    },
    {
      title: 'Upcoming Assessments',
      value: '3',
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />,
      trend: 0,
      description: 'Due this week'
    },
    {
      title: 'Overall Grade',
      value: 'A-',
      icon: <ChartBarIcon className="h-6 w-6 text-yellow-500" />,
      trend: 4.1,
      description: 'Current GPA'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title={`Welcome, ${user?.username}!`}
        description="Track your academic progress and upcoming activities"
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
    </div>
  );
};

export default Dashboard;
