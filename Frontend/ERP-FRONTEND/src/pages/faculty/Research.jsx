import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  DocumentTextIcon,
  BookOpenIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  PlusIcon,
  LinkIcon,
  ArrowTrendingUpIcon,
  BeakerIcon,
} from '@heroicons/react/24/outline';

const Research = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Publications',
      value: '24',
      icon: <DocumentTextIcon className="h-6 w-6 text-blue-500" />,
      trend: 4,
      description: 'Published papers',
      color: 'blue'
    },
    {
      title: 'Citations',
      value: '1,245',
      icon: <BookOpenIcon className="h-6 w-6 text-purple-500" />,
      trend: 15,
      description: 'Total citations',
      color: 'purple'
    },
    {
      title: 'Research Students',
      value: '8',
      icon: <UserGroupIcon className="h-6 w-6 text-green-500" />,
      trend: 2,
      description: 'Under supervision',
      color: 'green'
    },
    {
      title: 'Grant Amount',
      value: '$250K',
      icon: <CurrencyDollarIcon className="h-6 w-6 text-yellow-500" />,
      trend: 20,
      description: 'Research funding',
      color: 'yellow'
    }
  ];

  const publications = [
    {
      id: 1,
      title: 'Advanced Machine Learning Algorithms for Big Data Analytics',
      journal: 'International Journal of Computer Science',
      year: 2024,
      citations: 45,
      type: 'Journal',
      status: 'Published',
      coAuthors: ['Dr. Sarah Johnson', 'Dr. Michael Chen']
    },
    {
      id: 2,
      title: 'Novel Approach to Quantum Computing Optimization',
      journal: 'IEEE Quantum Computing',
      year: 2023,
      citations: 32,
      type: 'Conference',
      status: 'Published',
      coAuthors: ['Dr. James Wilson']
    },
    {
      id: 3,
      title: 'Blockchain Technology in Healthcare Systems',
      journal: 'Journal of Healthcare Informatics',
      year: 2024,
      citations: 12,
      type: 'Journal',
      status: 'Under Review',
      coAuthors: ['Dr. Emily Brown', 'Dr. David Lee']
    }
  ];

  const researchStudents = [
    {
      id: 1,
      name: 'John Smith',
      topic: 'AI in Healthcare',
      level: 'PhD',
      year: 3,
      status: 'On Track'
    },
    {
      id: 2,
      name: 'Emma Davis',
      topic: 'Quantum Computing',
      level: 'PhD',
      year: 2,
      status: 'On Track'
    },
    {
      id: 3,
      name: 'Michael Wilson',
      topic: 'Blockchain Security',
      level: 'Masters',
      year: 1,
      status: 'Review Needed'
    }
  ];

  const grants = [
    {
      id: 1,
      title: 'AI Research Initiative',
      agency: 'National Science Foundation',
      amount: 150000,
      startDate: '2024-01',
      duration: '3 years',
      status: 'Active'
    },
    {
      id: 2,
      title: 'Quantum Computing Research',
      agency: 'Department of Defense',
      amount: 100000,
      startDate: '2023-09',
      duration: '2 years',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Research Dashboard" 
        description="Manage your research activities, publications, and students"
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
            color={stat.color}
          />
        ))}
      </div>

      {/* Publications */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Publications</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Publication
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Journal/Conference</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Citations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {publications.map((pub) => (
                <tr key={pub.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-3" />
                      <div>
                        <div className="text-sm text-white">{pub.title}</div>
                        <div className="text-xs text-slate-400">{pub.coAuthors.join(', ')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{pub.journal}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{pub.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{pub.citations}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{pub.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      pub.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {pub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors mr-4">
                      <LinkIcon className="h-5 w-5" />
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Research Students */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Research Students</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              <UserGroupIcon className="h-5 w-5 mr-2" />
              Add Student
            </button>
          </div>
          <div className="space-y-4">
            {researchStudents.map((student) => (
              <div key={student.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{student.name}</h3>
                    <p className="text-sm text-slate-300 mt-1">{student.topic}</p>
                  </div>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    student.status === 'On Track' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {student.status}
                  </span>
                </div>
                <div className="mt-4 flex items-center text-sm text-slate-300">
                  <BeakerIcon className="h-4 w-4 mr-2" />
                  {student.level} • Year {student.year}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Research Grants */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Research Grants</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              <CurrencyDollarIcon className="h-5 w-5 mr-2" />
              Add Grant
            </button>
          </div>
          <div className="space-y-4">
            {grants.map((grant) => (
              <div key={grant.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">{grant.title}</h3>
                    <p className="text-sm text-slate-300 mt-1">{grant.agency}</p>
                  </div>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {grant.status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-slate-300">
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                    ${grant.amount.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="h-4 w-4 mr-2" />
                    {grant.duration}
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

export default Research;
