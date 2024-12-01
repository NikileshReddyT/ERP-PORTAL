import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  DocumentTextIcon,
  VideoCameraIcon,
  BookOpenIcon,
  CloudArrowDownIcon,
  StarIcon,
  ClockIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FolderIcon,
} from '@heroicons/react/24/outline';

const Materials = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Materials',
      value: '124',
      icon: <DocumentTextIcon className="h-6 w-6 text-blue-500" />,
      trend: 8,
      description: 'All resources'
    },
    {
      title: 'Video Lectures',
      value: '36',
      icon: <VideoCameraIcon className="h-6 w-6 text-green-500" />,
      trend: 4,
      description: 'Recorded sessions'
    },
    {
      title: 'Reading Materials',
      value: '58',
      icon: <BookOpenIcon className="h-6 w-6 text-yellow-500" />,
      trend: 6,
      description: 'Study resources'
    },
    {
      title: 'Downloads',
      value: '230',
      icon: <CloudArrowDownIcon className="h-6 w-6 text-purple-500" />,
      trend: 15,
      description: 'Total downloads'
    }
  ];

  const recentMaterials = [
    {
      id: 1,
      title: 'Data Structures Implementation Guide',
      course: 'Computer Science 101',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Dr. Smith',
      uploadedAt: '2024-02-15',
      downloads: 45
    },
    {
      id: 2,
      title: 'Database Design Principles',
      course: 'Database Management',
      type: 'Video',
      size: '156 MB',
      uploadedBy: 'Prof. Johnson',
      uploadedAt: '2024-02-14',
      downloads: 32
    },
    {
      id: 3,
      title: 'React Components Tutorial',
      course: 'Web Technologies',
      type: 'ZIP',
      size: '4.8 MB',
      uploadedBy: 'Dr. Williams',
      uploadedAt: '2024-02-14',
      downloads: 28
    },
    {
      id: 4,
      title: 'Software Testing Guidelines',
      course: 'Software Engineering',
      type: 'PDF',
      size: '1.2 MB',
      uploadedBy: 'Prof. Davis',
      uploadedAt: '2024-02-13',
      downloads: 56
    }
  ];

  const courseResources = [
    {
      course: 'Computer Science 101',
      materials: [
        { type: 'Lecture Notes', count: 12 },
        { type: 'Video Lectures', count: 8 },
        { type: 'Practice Problems', count: 15 },
        { type: 'Reference Materials', count: 5 }
      ]
    },
    {
      course: 'Database Management',
      materials: [
        { type: 'Lecture Notes', count: 10 },
        { type: 'Lab Manuals', count: 6 },
        { type: 'Video Tutorials', count: 12 },
        { type: 'Sample Databases', count: 4 }
      ]
    },
    {
      course: 'Web Technologies',
      materials: [
        { type: 'Lecture Slides', count: 14 },
        { type: 'Code Examples', count: 20 },
        { type: 'Project Resources', count: 8 },
        { type: 'Reference Links', count: 10 }
      ]
    }
  ];

  const bookmarkedResources = [
    {
      id: 1,
      title: 'Advanced Data Structures',
      type: 'PDF',
      addedOn: '2024-02-10',
      course: 'Computer Science 101'
    },
    {
      id: 2,
      title: 'SQL Optimization Techniques',
      type: 'Video',
      addedOn: '2024-02-12',
      course: 'Database Management'
    },
    {
      id: 3,
      title: 'React Best Practices',
      type: 'PDF',
      addedOn: '2024-02-14',
      course: 'Web Technologies'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Course Materials" 
        description="Access and download your learning resources"
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

      {/* Search Bar */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search materials..."
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Recent Materials */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Recent Materials</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Download All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Uploaded By</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Downloads</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentMaterials.map((material) => (
                <tr key={material.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-3" />
                      <span className="text-sm text-slate-300">{material.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      material.type === 'PDF' ? 'bg-red-100 text-red-800' :
                      material.type === 'Video' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {material.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.size}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.uploadedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{material.downloads}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <button className="text-blue-400 hover:text-blue-300 mr-4">
                      <CloudArrowDownIcon className="h-5 w-5" />
                    </button>
                    <button className="text-yellow-400 hover:text-yellow-300">
                      <StarIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Resources */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Course Resources</h2>
          <div className="space-y-6">
            {courseResources.map((course, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <h3 className="text-white font-medium mb-4">{course.course}</h3>
                <div className="grid grid-cols-2 gap-4">
                  {course.materials.map((material, mIndex) => (
                    <div key={mIndex} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                      <div className="flex items-center">
                        <FolderIcon className="h-5 w-5 text-blue-400 mr-2" />
                        <span className="text-sm text-slate-300">{material.type}</span>
                      </div>
                      <span className="text-sm font-medium text-slate-400">{material.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bookmarked Resources */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Bookmarked Resources</h2>
          <div className="space-y-4">
            {bookmarkedResources.map((resource) => (
              <div key={resource.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{resource.title}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    resource.type === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {resource.type}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-300">
                  <div className="flex items-center">
                    <BookOpenIcon className="h-4 w-4 mr-2" />
                    {resource.course}
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2" />
                    Added {resource.addedOn}
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

export default Materials;
