import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  DocumentIcon,
  VideoCameraIcon,
  BookOpenIcon,
  ArrowUpTrayIcon,
  FolderIcon,
  LinkIcon,
} from '@heroicons/react/24/outline';

const Materials = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Materials',
      value: '234',
      icon: <DocumentIcon className="h-6 w-6 text-blue-500" />,
      trend: 12,
      description: 'All course materials'
    },
    {
      title: 'Video Content',
      value: '45',
      icon: <VideoCameraIcon className="h-6 w-6 text-purple-500" />,
      trend: 8,
      description: 'Video lectures'
    },
    {
      title: 'Study Guides',
      value: '89',
      icon: <BookOpenIcon className="h-6 w-6 text-green-500" />,
      trend: 5,
      description: 'Learning resources'
    },
    {
      title: 'Storage Used',
      value: '75%',
      icon: <FolderIcon className="h-6 w-6 text-yellow-500" />,
      trend: -2,
      description: 'Of total capacity'
    }
  ];

  const materials = [
    {
      id: 1,
      title: 'Introduction to Data Structures',
      type: 'PDF',
      course: 'Computer Science 101',
      size: '2.5 MB',
      uploaded: '2024-02-15',
      downloads: 145
    },
    {
      id: 2,
      title: 'Algorithm Analysis Lecture',
      type: 'Video',
      course: 'Computer Science 101',
      size: '256 MB',
      uploaded: '2024-02-14',
      downloads: 89
    },
    {
      id: 3,
      title: 'Programming Exercise Solutions',
      type: 'Document',
      course: 'Computer Science 101',
      size: '1.2 MB',
      uploaded: '2024-02-13',
      downloads: 167
    },
    {
      id: 4,
      title: 'Study Guide - Midterm',
      type: 'PDF',
      course: 'Computer Science 101',
      size: '3.8 MB',
      uploaded: '2024-02-12',
      downloads: 234
    },
    {
      id: 5,
      title: 'Practice Problems',
      type: 'Document',
      course: 'Computer Science 101',
      size: '890 KB',
      uploaded: '2024-02-11',
      downloads: 123
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Course Materials" 
        description="Manage and share learning resources"
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

      {/* Upload Section */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Upload Materials</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            Upload New
          </button>
        </div>
      </div>

      {/* Materials List */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Course Materials</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Uploaded</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {materials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {material.type === 'PDF' ? (
                        <DocumentIcon className="h-5 w-5 text-red-400 mr-3" />
                      ) : material.type === 'Video' ? (
                        <VideoCameraIcon className="h-5 w-5 text-blue-400 mr-3" />
                      ) : (
                        <BookOpenIcon className="h-5 w-5 text-green-400 mr-3" />
                      )}
                      <span className="text-sm text-slate-300">{material.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.uploaded}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.downloads}</td>
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
    </div>
  );
};

export default Materials;
