import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  DocumentTextIcon,
  ClockIcon,
  CheckBadgeIcon,
  PencilSquareIcon,
  PlusIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Assessments = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Assessments',
      value: '24',
      icon: <DocumentTextIcon className="h-6 w-6 text-blue-500" />,
      trend: 4,
      description: 'All assessments'
    },
    {
      title: 'Pending Review',
      value: '8',
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      trend: -2,
      description: 'Need grading'
    },
    {
      title: 'Completed',
      value: '16',
      icon: <CheckBadgeIcon className="h-6 w-6 text-green-500" />,
      trend: 6,
      description: 'Graded assessments'
    },
    {
      title: 'Average Score',
      value: '78%',
      icon: <ChartBarIcon className="h-6 w-6 text-purple-500" />,
      trend: 3,
      description: 'Class performance'
    }
  ];

  const assessments = [
    {
      id: 1,
      title: 'Mid-Term Examination',
      type: 'Exam',
      course: 'Computer Science 101',
      dueDate: '2024-03-15',
      totalMarks: 100,
      status: 'Upcoming',
      submissions: 0
    },
    {
      id: 2,
      title: 'Programming Assignment #3',
      type: 'Assignment',
      course: 'Computer Science 101',
      dueDate: '2024-02-28',
      totalMarks: 50,
      status: 'Active',
      submissions: 23
    },
    {
      id: 3,
      title: 'Quiz - Data Structures',
      type: 'Quiz',
      course: 'Computer Science 101',
      dueDate: '2024-02-20',
      totalMarks: 20,
      status: 'Completed',
      submissions: 45
    },
    {
      id: 4,
      title: 'Project Presentation',
      type: 'Project',
      course: 'Computer Science 101',
      dueDate: '2024-03-30',
      totalMarks: 100,
      status: 'Upcoming',
      submissions: 0
    },
    {
      id: 5,
      title: 'Lab Exercise #5',
      type: 'Lab',
      course: 'Computer Science 101',
      dueDate: '2024-02-25',
      totalMarks: 30,
      status: 'Active',
      submissions: 34
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assessments" 
        description="Create and manage student assessments"
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

      {/* Create Assessment */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Create Assessment</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Assessment
          </button>
        </div>
      </div>

      {/* Assessments List */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">All Assessments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total Marks</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Submissions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {assessments.map((assessment) => (
                <tr key={assessment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {assessment.type === 'Exam' ? (
                        <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-3" />
                      ) : assessment.type === 'Quiz' ? (
                        <ClockIcon className="h-5 w-5 text-green-400 mr-3" />
                      ) : (
                        <PencilSquareIcon className="h-5 w-5 text-purple-400 mr-3" />
                      )}
                      <span className="text-sm text-slate-300">{assessment.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assessment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assessment.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assessment.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assessment.totalMarks}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      assessment.status === 'Active' ? 'bg-green-100 text-green-800' :
                      assessment.status === 'Upcoming' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {assessment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assessment.submissions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors mr-4">
                      Edit
                    </button>
                    <button className="text-red-400 hover:text-red-300 transition-colors">
                      Delete
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

export default Assessments;
