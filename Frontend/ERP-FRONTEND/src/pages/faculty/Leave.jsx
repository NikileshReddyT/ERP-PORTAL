import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  CalendarDaysIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  PlusIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

const Leave = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Leave Days',
      value: '30',
      icon: <CalendarDaysIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'Annual allowance'
    },
    {
      title: 'Days Used',
      value: '12',
      icon: <ClockIcon className="h-6 w-6 text-purple-500" />,
      trend: 2,
      description: 'Leave taken'
    },
    {
      title: 'Days Remaining',
      value: '18',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      trend: -2,
      description: 'Available days'
    },
    {
      title: 'Pending Requests',
      value: '2',
      icon: <XCircleIcon className="h-6 w-6 text-yellow-500" />,
      trend: 1,
      description: 'Awaiting approval'
    }
  ];

  const leaveRequests = [
    {
      id: 1,
      type: 'Sick Leave',
      startDate: '2024-02-20',
      endDate: '2024-02-22',
      days: 3,
      reason: 'Medical appointment and recovery',
      status: 'Approved',
      approvedBy: 'Dr. Johnson'
    },
    {
      id: 2,
      type: 'Vacation',
      startDate: '2024-03-15',
      endDate: '2024-03-22',
      days: 8,
      reason: 'Family vacation',
      status: 'Pending',
      approvedBy: '-'
    },
    {
      id: 3,
      type: 'Conference',
      startDate: '2024-04-10',
      endDate: '2024-04-12',
      days: 3,
      reason: 'International Computer Science Conference',
      status: 'Pending',
      approvedBy: '-'
    }
  ];

  const leaveTypes = [
    {
      type: 'Sick Leave',
      total: 15,
      used: 5,
      remaining: 10
    },
    {
      type: 'Vacation',
      total: 10,
      used: 4,
      remaining: 6
    },
    {
      type: 'Conference',
      total: 5,
      used: 3,
      remaining: 2
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Leave Management" 
        description="Track and request leave days"
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
        {/* Leave Balance */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Leave Balance</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              <PlusIcon className="h-5 w-5 mr-2" />
              Apply Leave
            </button>
          </div>
          <div className="space-y-4">
            {leaveTypes.map((leave, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-white">{leave.type}</h3>
                  <span className="text-sm text-slate-300">{leave.remaining} days left</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(leave.used / leave.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-slate-400">
                  <span>Used: {leave.used}</span>
                  <span>Total: {leave.total}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Leave Requests */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Leave Requests</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Reason</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-3" />
                        <span className="text-sm text-slate-300">{request.type}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {request.startDate} to {request.endDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {request.days}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-300">
                      {request.reason}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                      {request.status === 'Pending' ? (
                        <>
                          <button className="text-red-400 hover:text-red-300 transition-colors">
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button className="text-blue-400 hover:text-blue-300 transition-colors">
                          View
                        </button>
                      )}
                    </td>
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

export default Leave;
