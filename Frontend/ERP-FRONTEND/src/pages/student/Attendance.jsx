import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Attendance = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Classes',
      value: '120',
      icon: <CalendarDaysIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'This semester'
    },
    {
      title: 'Classes Attended',
      value: '108',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      trend: 2,
      description: 'Present days'
    },
    {
      title: 'Classes Missed',
      value: '12',
      icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
      trend: -1,
      description: 'Absent days'
    },
    {
      title: 'Attendance Rate',
      value: '90%',
      icon: <ChartBarIcon className="h-6 w-6 text-purple-500" />,
      trend: 5,
      description: 'Overall percentage'
    }
  ];

  const courseAttendance = [
    {
      id: 1,
      course: 'Computer Science 101',
      totalClasses: 30,
      attended: 28,
      percentage: '93.33%',
      lastAttended: '2024-02-15'
    },
    {
      id: 2,
      course: 'Database Management',
      totalClasses: 25,
      attended: 22,
      percentage: '88.00%',
      lastAttended: '2024-02-14'
    },
    {
      id: 3,
      course: 'Web Technologies',
      totalClasses: 28,
      attended: 25,
      percentage: '89.29%',
      lastAttended: '2024-02-15'
    },
    {
      id: 4,
      course: 'Software Engineering',
      totalClasses: 22,
      attended: 20,
      percentage: '90.91%',
      lastAttended: '2024-02-13'
    }
  ];

  const recentAttendance = [
    {
      id: 1,
      date: '2024-02-15',
      course: 'Computer Science 101',
      time: '09:00 AM',
      status: 'Present',
      duration: '1 hour'
    },
    {
      id: 2,
      date: '2024-02-15',
      course: 'Web Technologies',
      time: '11:00 AM',
      status: 'Present',
      duration: '1 hour'
    },
    {
      id: 3,
      date: '2024-02-14',
      course: 'Database Management',
      time: '10:00 AM',
      status: 'Present',
      duration: '1 hour'
    },
    {
      id: 4,
      date: '2024-02-14',
      course: 'Software Engineering',
      time: '02:00 PM',
      status: 'Absent',
      duration: '1 hour'
    },
    {
      id: 5,
      date: '2024-02-13',
      course: 'Computer Science 101',
      time: '09:00 AM',
      status: 'Present',
      duration: '1 hour'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Attendance Record" 
        description="Track your class attendance and participation"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course-wise Attendance */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Course-wise Attendance</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total Classes</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Attended</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Percentage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Attended</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {courseAttendance.map((course) => (
                  <tr key={course.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <CalendarDaysIcon className="h-5 w-5 text-blue-400 mr-3" />
                        <span className="text-sm text-slate-300">{course.course}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{course.totalClasses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{course.attended}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-white/10 rounded-full h-2 mr-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: course.percentage }}
                          />
                        </div>
                        <span className="text-sm text-slate-300">{course.percentage}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{course.lastAttended}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Attendance */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Attendance</h2>
          <div className="space-y-4">
            {recentAttendance.map((record) => (
              <div key={record.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{record.course}</h3>
                    <p className="text-sm text-slate-300 mt-1">{record.date}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    record.status === 'Present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {record.status}
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-slate-300">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {record.time} • {record.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
