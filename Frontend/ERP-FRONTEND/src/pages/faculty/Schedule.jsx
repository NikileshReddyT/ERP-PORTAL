import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  BuildingOfficeIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';

const Schedule = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Classes',
      value: '24',
      icon: <CalendarDaysIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'Current semester'
    },
    {
      title: 'Hours/Week',
      value: '18',
      icon: <ClockIcon className="h-6 w-6 text-purple-500" />,
      trend: 2,
      description: 'Teaching hours'
    },
    {
      title: 'Total Students',
      value: '156',
      icon: <UserGroupIcon className="h-6 w-6 text-green-500" />,
      trend: 5,
      description: 'Across all classes'
    },
    {
      title: 'Classrooms',
      value: '6',
      icon: <BuildingOfficeIcon className="h-6 w-6 text-yellow-500" />,
      trend: 0,
      description: 'Assigned rooms'
    }
  ];

  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];

  const schedule = [
    {
      id: 1,
      day: 'Monday',
      time: '9:00 AM',
      course: 'Computer Science 101',
      room: 'Room 301',
      type: 'Lecture',
      duration: '1 hour'
    },
    {
      id: 2,
      day: 'Monday',
      time: '2:00 PM',
      course: 'Data Structures',
      room: 'Lab 102',
      type: 'Lab',
      duration: '2 hours'
    },
    {
      id: 3,
      day: 'Tuesday',
      time: '11:00 AM',
      course: 'Algorithm Design',
      room: 'Room 405',
      type: 'Lecture',
      duration: '1 hour'
    },
    {
      id: 4,
      day: 'Wednesday',
      time: '10:00 AM',
      course: 'Computer Science 101',
      room: 'Room 301',
      type: 'Lecture',
      duration: '1 hour'
    },
    {
      id: 5,
      day: 'Thursday',
      time: '3:00 PM',
      course: 'Data Structures',
      room: 'Room 203',
      type: 'Lecture',
      duration: '1 hour'
    }
  ];

  const upcomingClasses = [
    {
      id: 1,
      course: 'Computer Science 101',
      time: '9:00 AM - 10:00 AM',
      room: 'Room 301',
      students: 45
    },
    {
      id: 2,
      course: 'Data Structures',
      time: '2:00 PM - 4:00 PM',
      room: 'Lab 102',
      students: 35
    },
    {
      id: 3,
      course: 'Algorithm Design',
      time: '11:00 AM - 12:00 PM',
      room: 'Room 405',
      students: 40
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Class Schedule" 
        description="View and manage your teaching schedule"
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
        {/* Upcoming Classes */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Today's Classes</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              <PlusIcon className="h-5 w-5 mr-2" />
              Add Class
            </button>
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div key={class_.id} className="p-4 bg-white/5 rounded-lg">
                <h3 className="font-medium text-white">{class_.course}</h3>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center text-sm text-slate-300">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {class_.time}
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                    {class_.room}
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    {class_.students} Students
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Schedule */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Weekly Schedule</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Time</th>
                  {weekDays.map((day) => (
                    <th key={day} className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {timeSlots.map((time) => (
                  <tr key={time}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{time}</td>
                    {weekDays.map((day) => {
                      const classInfo = schedule.find(c => c.day === day && c.time === time);
                      return (
                        <td key={`${day}-${time}`} className="px-6 py-4">
                          {classInfo && (
                            <div className="p-2 bg-white/5 rounded-lg">
                              <div className="text-sm font-medium text-white">{classInfo.course}</div>
                              <div className="text-xs text-slate-300">{classInfo.room}</div>
                              <div className="text-xs text-slate-300">{classInfo.type}</div>
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
