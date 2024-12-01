import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { FaChalkboardTeacher, FaClipboardList, FaChartLine, FaCalendarAlt } from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      name: 'Courses Taught',
      stat: '4',
      icon: FaChalkboardTeacher,
      change: '1 new this semester',
      changeType: 'neutral',
    },
    {
      name: 'Assignments Graded',
      stat: '120',
      icon: FaClipboardList,
      change: '15 this week',
      changeType: 'increase',
    },
    {
      name: 'Research Papers',
      stat: '8',
      icon: FaChartLine,
      change: '2 published',
      changeType: 'neutral',
    },
    {
      name: 'Upcoming Meetings',
      stat: '3',
      icon: FaCalendarAlt,
      change: '2 this week',
      changeType: 'neutral',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-200 py-8 px-4">
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome, {user?.username}!</h1>
        <p className="mt-2 text-sm text-slate-400">
          Here's your teaching overview and upcoming engagements.
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="bg-slate-800 overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-slate-400 truncate">{item.name}</dt>
                    <dd>
                      <div className="text-lg font-semibold text-white">{item.stat}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-slate-700 px-5 py-3">
              <div className="text-sm">
                <span className={`text-${item.changeType === 'increase' ? 'green' : 'gray'}-400 font-semibold`}>{item.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
