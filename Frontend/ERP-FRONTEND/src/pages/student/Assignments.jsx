import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  DocumentTextIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Assignments = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Assignments',
      value: '24',
      icon: <DocumentTextIcon className="h-6 w-6 text-blue-500" />,
      trend: 4,
      description: 'This semester'
    },
    {
      title: 'Submitted',
      value: '18',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      trend: 2,
      description: 'Completed tasks'
    },
    {
      title: 'Pending',
      value: '6',
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      trend: -2,
      description: 'Due soon'
    },
    {
      title: 'Average Score',
      value: '85%',
      icon: <ChartBarIcon className="h-6 w-6 text-purple-500" />,
      trend: 5,
      description: 'Overall grade'
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'Data Structures Implementation',
      course: 'Computer Science 101',
      dueDate: '2024-02-25',
      status: 'Pending',
      type: 'Programming',
      maxScore: 100,
      score: null
    },
    {
      id: 2,
      title: 'Algorithm Analysis Report',
      course: 'Computer Science 101',
      dueDate: '2024-02-20',
      status: 'Submitted',
      type: 'Report',
      maxScore: 50,
      score: 45
    },
    {
      id: 3,
      title: 'Database Design Project',
      course: 'Database Management',
      dueDate: '2024-02-28',
      status: 'Pending',
      type: 'Project',
      maxScore: 100,
      score: null
    },
    {
      id: 4,
      title: 'Web Development Assignment',
      course: 'Web Technologies',
      dueDate: '2024-02-15',
      status: 'Graded',
      type: 'Programming',
      maxScore: 50,
      score: 48
    },
    {
      id: 5,
      title: 'Software Testing Report',
      course: 'Software Engineering',
      dueDate: '2024-02-18',
      status: 'Submitted',
      type: 'Report',
      maxScore: 30,
      score: null
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Assignments" 
        description="Track and submit your course assignments"
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

      {/* Assignments List */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">All Assignments</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {assignments.map((assignment) => (
                <tr key={assignment.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-3" />
                      <span className="text-sm text-slate-300">{assignment.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assignment.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assignment.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{assignment.dueDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      assignment.status === 'Submitted' ? 'bg-blue-100 text-blue-800' :
                      assignment.status === 'Graded' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {assignment.score !== null ? `${assignment.score}/${assignment.maxScore}` : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    {assignment.status === 'Pending' && (
                      <button className="flex items-center text-blue-400 hover:text-blue-300 transition-colors">
                        <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
                        Submit
                      </button>
                    )}
                    {assignment.status === 'Submitted' && (
                      <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                        View
                      </button>
                    )}
                    {assignment.status === 'Graded' && (
                      <button className="text-green-400 hover:text-green-300 transition-colors">
                        Feedback
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upcoming Deadlines */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Upcoming Deadlines</h2>
        <div className="space-y-4">
          {assignments
            .filter(assignment => assignment.status === 'Pending')
            .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
            .map(assignment => (
              <div key={assignment.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center">
                  <div className="bg-blue-500/10 p-2 rounded-lg mr-4">
                    <ClockIcon className="h-6 w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{assignment.title}</h3>
                    <p className="text-sm text-slate-300 mt-1">{assignment.course}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-300">Due: {assignment.dueDate}</p>
                  <button className="mt-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Start Now
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
