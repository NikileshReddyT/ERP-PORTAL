import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  CalendarDaysIcon,
  ClockIcon,
  BookOpenIcon,
  UserGroupIcon,
  MapPinIcon,
  ArrowDownTrayIcon,
  BellIcon,
} from '@heroicons/react/24/outline';

const Schedule = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Courses',
      value: '6',
      icon: <BookOpenIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'Current semester'
    },
    {
      title: 'Today\'s Classes',
      value: '4',
      icon: <ClockIcon className="h-6 w-6 text-green-500" />,
      trend: 1,
      description: 'Scheduled today'
    },
    {
      title: 'Credit Hours',
      value: '18',
      icon: <CalendarDaysIcon className="h-6 w-6 text-yellow-500" />,
      trend: 0,
      description: 'Total credits'
    },
    {
      title: 'Study Groups',
      value: '3',
      icon: <UserGroupIcon className="h-6 w-6 text-purple-500" />,
      trend: 2,
      description: 'Active groups'
    }
  ];

  const todayClasses = [
    {
      id: 1,
      course: 'Computer Science 101',
      time: '09:00 AM - 10:30 AM',
      professor: 'Dr. Smith',
      room: 'Room 301',
      building: 'Engineering Block',
      type: 'Lecture',
      status: 'Upcoming'
    },
    {
      id: 2,
      course: 'Database Management Lab',
      time: '11:00 AM - 12:30 PM',
      professor: 'Prof. Johnson',
      room: 'Lab 102',
      building: 'Computer Science Block',
      type: 'Laboratory',
      status: 'In Progress'
    },
    {
      id: 3,
      course: 'Web Technologies',
      time: '02:00 PM - 03:30 PM',
      professor: 'Dr. Williams',
      room: 'Room 205',
      building: 'Main Block',
      type: 'Lecture',
      status: 'Upcoming'
    },
    {
      id: 4,
      course: 'Software Engineering',
      time: '04:00 PM - 05:30 PM',
      professor: 'Prof. Davis',
      room: 'Room 401',
      building: 'Engineering Block',
      type: 'Tutorial',
      status: 'Upcoming'
    }
  ];

  const weeklySchedule = [
    {
      day: 'Monday',
      classes: [
        { time: '09:00 AM', course: 'Computer Science 101', type: 'Lecture' },
        { time: '11:00 AM', course: 'Database Management', type: 'Lab' },
        { time: '02:00 PM', course: 'Web Technologies', type: 'Lecture' }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '10:00 AM', course: 'Software Engineering', type: 'Lecture' },
        { time: '02:00 PM', course: 'Computer Networks', type: 'Tutorial' }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '09:00 AM', course: 'Computer Science 101', type: 'Tutorial' },
        { time: '11:00 AM', course: 'Database Management', type: 'Lecture' },
        { time: '03:00 PM', course: 'Web Technologies', type: 'Lab' }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { time: '10:00 AM', course: 'Software Engineering', type: 'Lab' },
        { time: '02:00 PM', course: 'Computer Networks', type: 'Lecture' }
      ]
    },
    {
      day: 'Friday',
      classes: [
        { time: '09:00 AM', course: 'Computer Science 101', type: 'Lecture' },
        { time: '11:00 AM', course: 'Database Management', type: 'Tutorial' },
        { time: '02:00 PM', course: 'Web Technologies', type: 'Tutorial' }
      ]
    }
  ];

  const studyGroups = [
    {
      id: 1,
      course: 'Computer Science 101',
      topic: 'Data Structures Review',
      time: 'Tuesday, 5:00 PM',
      location: 'Library Study Room 2',
      members: 5
    },
    {
      id: 2,
      course: 'Database Management',
      topic: 'SQL Practice',
      time: 'Wednesday, 4:00 PM',
      location: 'Online (Zoom)',
      members: 4
    },
    {
      id: 3,
      course: 'Web Technologies',
      topic: 'React Project Discussion',
      time: 'Thursday, 6:00 PM',
      location: 'Computer Lab 3',
      members: 6
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Class Schedule" 
        description="View your daily and weekly class schedule"
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

      {/* Today's Classes */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Today's Classes</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Schedule
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todayClasses.map((class_) => (
            <div key={class_.id} className="p-4 bg-white/5 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-medium">{class_.course}</h3>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  class_.status === 'In Progress' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {class_.status}
                </span>
              </div>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2" />
                  {class_.time}
                </div>
                <div className="flex items-center">
                  <UserGroupIcon className="h-4 w-4 mr-2" />
                  {class_.professor}
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="h-4 w-4 mr-2" />
                  {class_.room}, {class_.building}
                </div>
                <div className="flex items-center">
                  <BookOpenIcon className="h-4 w-4 mr-2" />
                  {class_.type}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Schedule */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Weekly Schedule</h2>
          <div className="space-y-6">
            {weeklySchedule.map((day, index) => (
              <div key={index} className="space-y-2">
                <h3 className="text-white font-medium">{day.day}</h3>
                <div className="space-y-2">
                  {day.classes.map((class_, classIndex) => (
                    <div key={classIndex} className="flex items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-sm font-medium text-slate-300 w-24">{class_.time}</span>
                      <span className="text-sm text-slate-300 flex-1">{class_.course}</span>
                      <span className="text-sm text-slate-400">{class_.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Groups */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Study Groups</h2>
            <button className="text-blue-400 hover:text-blue-300">
              <BellIcon className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4">
            {studyGroups.map((group) => (
              <div key={group.id} className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-medium mb-2">{group.course}</h3>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 mr-2" />
                    {group.topic}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    {group.time}
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-4 w-4 mr-2" />
                    {group.location}
                  </div>
                  <div className="flex items-center">
                    <UserGroupIcon className="h-4 w-4 mr-2" />
                    {group.members} members
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
