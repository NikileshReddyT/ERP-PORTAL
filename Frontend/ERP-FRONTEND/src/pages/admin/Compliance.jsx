import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  ShieldCheckIcon,
  DocumentCheckIcon,
  ExclamationCircleIcon,
  ClockIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const Compliance = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Compliance Score',
      value: '94%',
      icon: <ShieldCheckIcon className="h-6 w-6 text-green-500" />,
      trend: 2,
      description: 'Overall compliance rating'
    },
    {
      title: 'Active Policies',
      value: '48',
      icon: <DocumentCheckIcon className="h-6 w-6 text-blue-500" />,
      trend: 5,
      description: 'Currently enforced'
    },
    {
      title: 'Pending Reviews',
      value: '12',
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      trend: -3,
      description: 'Awaiting approval'
    },
    {
      title: 'Policy Violations',
      value: '3',
      icon: <ExclamationCircleIcon className="h-6 w-6 text-red-500" />,
      trend: -1,
      description: 'This month'
    }
  ];

  const complianceItems = [
    {
      id: 1,
      policy: 'Data Protection Policy',
      status: 'Compliant',
      lastReview: '2024-02-01',
      nextReview: '2024-05-01',
      responsible: 'John Smith',
      risk: 'Low'
    },
    {
      id: 2,
      policy: 'Academic Integrity Guidelines',
      status: 'Under Review',
      lastReview: '2024-01-15',
      nextReview: '2024-02-15',
      responsible: 'Sarah Johnson',
      risk: 'Medium'
    },
    {
      id: 3,
      policy: 'Information Security Standards',
      status: 'Non-Compliant',
      lastReview: '2024-01-30',
      nextReview: '2024-02-28',
      responsible: 'Mike Wilson',
      risk: 'High'
    },
    {
      id: 4,
      policy: 'Student Privacy Policy',
      status: 'Compliant',
      lastReview: '2024-02-10',
      nextReview: '2024-05-10',
      responsible: 'Emma Davis',
      risk: 'Low'
    },
    {
      id: 5,
      policy: 'Faculty Code of Conduct',
      status: 'Compliant',
      lastReview: '2024-02-05',
      nextReview: '2024-05-05',
      responsible: 'Robert Brown',
      risk: 'Low'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Compliance Management" 
        description="Monitor and manage institutional compliance policies and regulations"
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

      {/* Compliance Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Compliance Status</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowPathIcon className="h-5 w-5 mr-2" />
            Update Status
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Policy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Last Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Next Review</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Responsible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Risk Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {complianceItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.policy}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.status === 'Compliant' ? 'bg-green-100 text-green-800' :
                      item.status === 'Under Review' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.lastReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.nextReview}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{item.responsible}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.risk === 'Low' ? 'bg-green-100 text-green-800' :
                      item.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.risk}
                    </span>
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

export default Compliance;
