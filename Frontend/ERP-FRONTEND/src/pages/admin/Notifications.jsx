import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  BellIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  MegaphoneIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

const Notifications = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Notifications',
      value: '1,234',
      icon: <BellIcon className="h-6 w-6 text-blue-500" />,
      trend: 8,
      description: 'All notifications'
    },
    {
      title: 'Unread Messages',
      value: '45',
      icon: <EnvelopeIcon className="h-6 w-6 text-red-500" />,
      trend: -2,
      description: 'Pending review'
    },
    {
      title: 'Announcements',
      value: '89',
      icon: <MegaphoneIcon className="h-6 w-6 text-purple-500" />,
      trend: 5,
      description: 'Active announcements'
    },
    {
      title: 'Response Rate',
      value: '95%',
      icon: <ChatBubbleLeftIcon className="h-6 w-6 text-green-500" />,
      trend: 3,
      description: 'Average response time'
    }
  ];

  const notifications = [
    {
      id: 1,
      type: 'Announcement',
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance on February 20, 2024, from 2 AM to 4 AM EST.',
      timestamp: '2024-02-15 10:30 AM',
      priority: 'High',
      status: 'Unread'
    },
    {
      id: 2,
      type: 'Alert',
      title: 'New Policy Update',
      message: 'Updated attendance policy for remote learning has been published.',
      timestamp: '2024-02-15 09:45 AM',
      priority: 'Medium',
      status: 'Read'
    },
    {
      id: 3,
      type: 'Message',
      title: 'Faculty Meeting Reminder',
      message: 'Monthly faculty meeting scheduled for tomorrow at 2 PM.',
      timestamp: '2024-02-15 09:00 AM',
      priority: 'Normal',
      status: 'Unread'
    },
    {
      id: 4,
      type: 'Alert',
      title: 'Grade Submission Deadline',
      message: 'Final grades for Winter semester due by February 28, 2024.',
      timestamp: '2024-02-14 04:30 PM',
      priority: 'High',
      status: 'Read'
    },
    {
      id: 5,
      type: 'Announcement',
      title: 'New Feature Release',
      message: 'Enhanced reporting features now available in the faculty portal.',
      timestamp: '2024-02-14 02:15 PM',
      priority: 'Medium',
      status: 'Read'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notifications Management" 
        description="Manage and monitor system-wide notifications"
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

      {/* Create New Notification */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Create Notification</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <PaperAirplaneIcon className="h-5 w-5 mr-2" />
            Send New
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Notifications</h2>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className={`p-2 rounded-lg ${
                notification.type === 'Announcement' ? 'bg-purple-500/10' :
                notification.type === 'Alert' ? 'bg-red-500/10' :
                'bg-blue-500/10'
              }`}>
                {notification.type === 'Announcement' ? (
                  <MegaphoneIcon className="h-6 w-6 text-purple-500" />
                ) : notification.type === 'Alert' ? (
                  <BellIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <EnvelopeIcon className="h-6 w-6 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-white">{notification.title}</h3>
                    <p className="text-sm text-slate-300 mt-1">{notification.message}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    notification.status === 'Unread' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-800'
                  }`}>
                    {notification.status}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-slate-400">{notification.timestamp}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    notification.priority === 'High' ? 'bg-red-100 text-red-800' :
                    notification.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {notification.priority}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
