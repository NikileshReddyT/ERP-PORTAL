import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  ChartBarIcon,
  UserGroupIcon,
  AcademicCapIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

const Analytics = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Student Growth',
      value: '+15%',
      icon: <UserGroupIcon className="h-6 w-6 text-blue-500" />,
      trend: 15,
      description: 'Year over year increase'
    },
    {
      title: 'Course Success Rate',
      value: '88%',
      icon: <AcademicCapIcon className="h-6 w-6 text-green-500" />,
      trend: 3,
      description: 'Students passing courses'
    },
    {
      title: 'Revenue Growth',
      value: '+12%',
      icon: <CurrencyDollarIcon className="h-6 w-6 text-yellow-500" />,
      trend: 12,
      description: 'Compared to last quarter'
    },
    {
      title: 'Faculty Performance',
      value: '94%',
      icon: <ChartBarIcon className="h-6 w-6 text-purple-500" />,
      trend: 5,
      description: 'Average rating'
    }
  ];

  const performanceMetrics = [
    {
      id: 1,
      metric: 'Student Retention Rate',
      current: '92%',
      previous: '89%',
      trend: 'up',
      change: '3%'
    },
    {
      id: 2,
      metric: 'Average GPA',
      current: '3.45',
      previous: '3.38',
      trend: 'up',
      change: '0.07'
    },
    {
      id: 3,
      metric: 'Course Completion Rate',
      current: '87%',
      previous: '85%',
      trend: 'up',
      change: '2%'
    },
    {
      id: 4,
      metric: 'Faculty Satisfaction',
      current: '4.2/5',
      previous: '4.0/5',
      trend: 'up',
      change: '0.2'
    },
    {
      id: 5,
      metric: 'Resource Utilization',
      current: '78%',
      previous: '82%',
      trend: 'down',
      change: '-4%'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Analytics Dashboard" 
        description="Comprehensive analytics and performance metrics"
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

      {/* Performance Metrics */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Key Performance Metrics</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowTrendingUpIcon className="h-5 w-5 mr-2" />
            View Trends
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Metric</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Current Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Previous Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {performanceMetrics.map((metric) => (
                <tr key={metric.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{metric.metric}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{metric.current}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{metric.previous}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      metric.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {metric.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Placeholder for Charts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 h-80">
          <h3 className="text-lg font-medium text-white mb-4">Enrollment Trends</h3>
          <div className="flex items-center justify-center h-64 text-slate-300">
            [Enrollment Chart Placeholder]
          </div>
        </div>
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 h-80">
          <h3 className="text-lg font-medium text-white mb-4">Academic Performance</h3>
          <div className="flex items-center justify-center h-64 text-slate-300">
            [Performance Chart Placeholder]
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
