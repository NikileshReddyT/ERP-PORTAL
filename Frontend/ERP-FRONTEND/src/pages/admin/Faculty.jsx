import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AcademicCapIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const Faculty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const faculty = [
    { id: 1, name: 'Dr. Robert Wilson', department: 'Computer Science', email: 'robert.wilson@example.com', status: 'Active' },
    { id: 2, name: 'Prof. Sarah Chen', department: 'Mathematics', email: 'sarah.chen@example.com', status: 'Active' },
    { id: 3, name: 'Dr. James Brown', department: 'Physics', email: 'james.brown@example.com', status: 'On Leave' },
  ];

  const handleAddFaculty = () => {
    navigate('/register', { 
      state: { 
        role: 'FACULTY'
      } 
    });
  };

  return (
    <div className="h-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-500/10 rounded-xl p-2">
              <AcademicCapIcon className="h-6 w-6 text-purple-500" />
            </div>
            <h1 className="text-2xl font-semibold text-white">Faculty Management</h1>
          </div>
          <button 
            onClick={handleAddFaculty}
            className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl transition-all duration-200 shadow-lg shadow-purple-500/20"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Faculty
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 mb-6">
          <div className="relative max-w-md">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search faculty..."
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Faculty List */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-700/50">
            <thead className="bg-slate-700/30">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {faculty.map((member) => (
                <tr key={member.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{member.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-300">{member.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-slate-300">{member.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      member.status === 'Active' 
                        ? 'bg-green-500/10 text-green-400'
                        : member.status === 'On Leave'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-indigo-400 hover:text-indigo-300 mr-3">
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button className="text-red-400 hover:text-red-300">
                      <TrashIcon className="h-5 w-5" />
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

export default Faculty;
