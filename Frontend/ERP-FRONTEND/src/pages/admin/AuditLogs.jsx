import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  DocumentMagnifyingGlassIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  ClockIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

const AuditLogs = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Logs Today',
      value: '2,456',
      icon: <DocumentMagnifyingGlassIcon className="h-6 w-6 text-blue-500" />,
      trend: 15,
      description: 'System activity logs'
    },
    {
      title: 'Security Alerts',
      value: '23',
      icon: <ExclamationTriangleIcon className="h-6 w-6 text-red-500" />,
      trend: -5,
      description: 'Potential security issues'
    },
    {
      title: 'System Events',
      value: '1,890',
      icon: <ShieldCheckIcon className="h-6 w-6 text-green-500" />,
      trend: 8,
      description: 'Normal operations'
    },
    {
      title: 'Average Response',
      value: '1.2s',
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      trend: -2,
      description: 'System response time'
    }
  ];

  const auditEntries = [
    {
      id: 1,
      timestamp: '2024-02-15 14:30:25',
      user: 'admin@erp.edu',
      action: 'User Creation',
      resource: 'User Management',
      status: 'Success',
      ipAddress: '192.168.1.100'
    },
    {
      id: 2,
      timestamp: '2024-02-15 14:28:15',
      user: 'faculty@erp.edu',
      action: 'Grade Update',
      resource: 'Academic Records',
      status: 'Success',
      ipAddress: '192.168.1.101'
    },
    {
      id: 3,
      timestamp: '2024-02-15 14:25:10',
      user: 'student@erp.edu',
      action: 'Login Attempt',
      resource: 'Authentication',
      status: 'Failed',
      ipAddress: '192.168.1.102'
    },
    {
      id: 4,
      timestamp: '2024-02-15 14:20:05',
      user: 'admin@erp.edu',
      action: 'Course Creation',
      resource: 'Course Management',
      status: 'Success',
      ipAddress: '192.168.1.100'
    },
    {
      id: 5,
      timestamp: '2024-02-15 14:15:00',
      user: 'faculty@erp.edu',
      action: 'Attendance Update',
      resource: 'Attendance System',
      status: 'Success',
      ipAddress: '192.168.1.101'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Audit Logs" 
        description="Monitor and analyze system activity logs"
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

      {/* Audit Log Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Activities</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <FunnelIcon className="h-5 w-5 mr-2" />
            Filter Logs
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {auditEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{entry.timestamp}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{entry.user}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{entry.action}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{entry.resource}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      entry.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{entry.ipAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AuditLogs;
