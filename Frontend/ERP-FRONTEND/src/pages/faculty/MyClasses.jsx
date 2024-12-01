import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  UserGroupIcon,
  DocumentTextIcon,
  ClockIcon,
  ChartBarIcon,
  PencilSquareIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const MyClasses = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '156',
      icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
      trend: 8,
      description: 'Across all classes'
    },
    {
      title: 'Active Assignments',
      value: '12',
      icon: <DocumentTextIcon className="h-6 w-6 text-purple-500" />,
      trend: 2,
      description: 'Pending submissions'
    },
    {
      title: 'Hours/Week',
      value: '18',
      icon: <ClockIcon className="h-6 w-6 text-green-500" />,
      trend: 0,
      description: 'Teaching hours'
    },
    {
      title: 'Average Performance',
      value: '85%',
      icon: <ChartBarIcon className="h-6 w-6 text-yellow-500" />,
      trend: 5,
      description: 'Class average'
    }
  ];

  const classes = [
    {
      id: 1,
      name: 'Computer Science 101',
      students: 45,
      schedule: 'Mon, Wed 10:00 AM',
      room: 'Room 301',
      assignments: 4,
      attendance: '92%'
    },
    {
      id: 2,
      name: 'Data Structures',
      students: 38,
      schedule: 'Tue, Thu 2:00 PM',
      room: 'Room 405',
      assignments: 3,
      attendance: '88%'
    },
    {
      id: 3,
      name: 'Database Management',
      students: 42,
      schedule: 'Mon, Wed 2:00 PM',
      room: 'Room 201',
      assignments: 5,
      attendance: '90%'
    },
    {
      id: 4,
      name: 'Software Engineering',
      students: 31,
      schedule: 'Tue, Thu 10:00 AM',
      room: 'Room 302',
      assignments: 0,
      attendance: '85%'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="My Classes" 
        description="Manage your classes, students, and assignments"
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

      {/* Classes List */}
      <div className="mt-8">
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {classes.map((classItem) => (
              <li key={classItem.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate">
                        {classItem.name}
                      </h3>
                      <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
                        <span>{classItem.students} students</span>
                        <span className="mx-2">•</span>
                        <ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
                        <span>{classItem.schedule}</span>
                        <span className="mx-2">•</span>
                        <DocumentTextIcon className="flex-shrink-0 mr-1.5 h-5 w-5" />
                        <span>{classItem.assignments} active assignments</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium">Attendance:</span> {classItem.attendance}
                      </div>
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                          <PencilSquareIcon className="h-5 w-5" />
                        </button>
                        <button className="inline-flex items-center p-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                          <DocumentTextIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MyClasses;
