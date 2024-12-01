import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  DocumentChartBarIcon,
  DocumentTextIcon,
  ClipboardDocumentCheckIcon,
  AcademicCapIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const Reports = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Reports',
      value: '156',
      icon: <DocumentChartBarIcon className="h-6 w-6 text-blue-500" />,
      trend: 8,
      description: 'All time reports'
    },
    {
      title: 'Generated Today',
      value: '12',
      icon: <DocumentTextIcon className="h-6 w-6 text-green-500" />,
      trend: 4,
      description: 'New reports today'
    },
    {
      title: 'Pending Review',
      value: '23',
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6 text-yellow-500" />,
      trend: -2,
      description: 'Awaiting approval'
    },
    {
      title: 'Department Reports',
      value: '45',
      icon: <AcademicCapIcon className="h-6 w-6 text-purple-500" />,
      trend: 5,
      description: 'By department'
    }
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Annual Academic Performance Report',
      type: 'Academic',
      date: '2024-02-15',
      status: 'Completed'
    },
    {
      id: 2,
      title: 'Faculty Attendance Summary',
      type: 'Attendance',
      date: '2024-02-14',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Student Enrollment Statistics',
      type: 'Enrollment',
      date: '2024-02-13',
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Department Budget Analysis',
      type: 'Financial',
      date: '2024-02-12',
      status: 'In Progress'
    },
    {
      id: 5,
      title: 'Course Completion Rates',
      type: 'Academic',
      date: '2024-02-11',
      status: 'Completed'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports Management" 
        description="Generate and manage institutional reports"
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

      {/* Recent Reports */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Reports</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentReports.map((report) => (
                <tr key={report.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{report.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      report.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      report.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors">
                      View Report
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

export default Reports;
