import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardDocumentCheckIcon,
  ChartBarIcon,
  BellIcon,
  DocumentTextIcon,
  BuildingLibraryIcon,
} from '@heroicons/react/24/outline';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '2,345',
      icon: <UsersIcon className="h-6 w-6 text-blue-500" />,
      trend: 12,
      description: 'Enrolled this semester'
    },
    {
      title: 'Faculty Members',
      value: '128',
      icon: <AcademicCapIcon className="h-6 w-6 text-indigo-500" />,
      trend: 4,
      description: 'Active professors'
    },
    {
      title: 'Active Courses',
      value: '56',
      icon: <BookOpenIcon className="h-6 w-6 text-purple-500" />,
      trend: -2,
      description: 'Current semester'
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-green-500" />,
      trend: 3,
      description: 'Average across all courses'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      title: 'New Student Registration',
      description: '15 new students registered for Fall 2024',
      timestamp: '2 hours ago',
      icon: UsersIcon,
    },
    {
      id: 2,
      title: 'Course Updates',
      description: 'Computer Science curriculum updated',
      timestamp: '4 hours ago',
      icon: BookOpenIcon,
    },
    {
      id: 3,
      title: 'Faculty Meeting',
      description: 'Department heads meeting scheduled',
      timestamp: '1 day ago',
      icon: AcademicCapIcon,
    },
    {
      id: 4,
      title: 'System Update',
      description: 'ERP system maintenance completed',
      timestamp: '2 days ago',
      icon: ChartBarIcon,
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Welcome back, ${user?.username}!`}
        subtitle="Here's what's happening with your institution today."
        icon={BuildingLibraryIcon}
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

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <div className="flex items-center">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                  <activity.icon className="h-5 w-5 text-blue-500" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-sm font-medium text-white">{activity.title}</h3>
                  <p className="text-sm text-slate-400">{activity.description}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <button className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <DocumentTextIcon className="h-6 w-6 text-blue-500 mb-2" />
            <h3 className="text-sm font-medium text-white">Generate Reports</h3>
          </button>
          <button className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <UsersIcon className="h-6 w-6 text-indigo-500 mb-2" />
            <h3 className="text-sm font-medium text-white">Manage Users</h3>
          </button>
          <button className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <BookOpenIcon className="h-6 w-6 text-purple-500 mb-2" />
            <h3 className="text-sm font-medium text-white">Course Setup</h3>
          </button>
          <button className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <BellIcon className="h-6 w-6 text-green-500 mb-2" />
            <h3 className="text-sm font-medium text-white">Announcements</h3>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
