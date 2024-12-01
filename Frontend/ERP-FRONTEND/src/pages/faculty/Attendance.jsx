import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const Attendance = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Students',
      value: '156',
      icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'Enrolled students'
    },
    {
      title: 'Present Today',
      value: '142',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      trend: 5,
      description: 'Currently present'
    },
    {
      title: 'Absent Today',
      value: '14',
      icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
      trend: -2,
      description: 'Missing students'
    },
    {
      title: 'Average Rate',
      value: '91%',
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      trend: 3,
      description: 'Attendance rate'
    }
  ];

  const students = [
    {
      id: 1,
      name: 'John Smith',
      rollNo: 'CS101',
      status: 'Present',
      time: '09:00 AM',
      totalClasses: 45,
      attendedClasses: 42,
      percentage: '93.33%'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      rollNo: 'CS102',
      status: 'Absent',
      time: '-',
      totalClasses: 45,
      attendedClasses: 38,
      percentage: '84.44%'
    },
    {
      id: 3,
      name: 'Michael Brown',
      rollNo: 'CS103',
      status: 'Present',
      time: '09:05 AM',
      totalClasses: 45,
      attendedClasses: 43,
      percentage: '95.56%'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      rollNo: 'CS104',
      status: 'Present',
      time: '09:02 AM',
      totalClasses: 45,
      attendedClasses: 41,
      percentage: '91.11%'
    },
    {
      id: 5,
      name: 'James Wilson',
      rollNo: 'CS105',
      status: 'Absent',
      time: '-',
      totalClasses: 45,
      attendedClasses: 37,
      percentage: '82.22%'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance Management" 
        description="Track and manage student attendance"
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

      {/* Date Selection */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <CalendarDaysIcon className="h-6 w-6 text-slate-300" />
            <input
              type="date"
              className="bg-white/5 text-white border border-white/10 rounded-lg px-4 py-2"
              defaultValue={new Date().toISOString().split('T')[0]}
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Student Attendance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total Classes</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Attended</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.totalClasses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.attendedClasses}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.percentage}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors mr-4">
                      Mark Present
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors">
                      Mark Absent
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
