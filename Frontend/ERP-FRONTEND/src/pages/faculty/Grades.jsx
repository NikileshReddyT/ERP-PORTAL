import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  AcademicCapIcon,
  ChartBarIcon,
  StarIcon,
  ArrowTrendingUpIcon,
  CloudArrowUpIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

const Grades = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Class Average',
      value: '78%',
      icon: <ChartBarIcon className="h-6 w-6 text-blue-500" />,
      trend: 3,
      description: 'Overall performance'
    },
    {
      title: 'Highest Grade',
      value: '95%',
      icon: <StarIcon className="h-6 w-6 text-green-500" />,
      trend: 5,
      description: 'Top score'
    },
    {
      title: 'Pass Rate',
      value: '92%',
      icon: <ArrowTrendingUpIcon className="h-6 w-6 text-purple-500" />,
      trend: 2,
      description: 'Students passing'
    },
    {
      title: 'Pending Grades',
      value: '12',
      icon: <AcademicCapIcon className="h-6 w-6 text-yellow-500" />,
      trend: -4,
      description: 'Need grading'
    }
  ];

  const students = [
    {
      id: 1,
      name: 'John Smith',
      rollNo: 'CS101',
      assignments: 85,
      midterm: 78,
      finals: 88,
      total: 84,
      grade: 'A',
      status: 'Published'
    },
    {
      id: 2,
      name: 'Emma Johnson',
      rollNo: 'CS102',
      assignments: 92,
      midterm: 85,
      finals: 90,
      total: 89,
      grade: 'A',
      status: 'Published'
    },
    {
      id: 3,
      name: 'Michael Brown',
      rollNo: 'CS103',
      assignments: 78,
      midterm: 72,
      finals: 75,
      total: 75,
      grade: 'B',
      status: 'Pending'
    },
    {
      id: 4,
      name: 'Sarah Davis',
      rollNo: 'CS104',
      assignments: 88,
      midterm: 82,
      finals: 85,
      total: 85,
      grade: 'A',
      status: 'Published'
    },
    {
      id: 5,
      name: 'James Wilson',
      rollNo: 'CS105',
      assignments: 75,
      midterm: 68,
      finals: 72,
      total: 72,
      grade: 'B',
      status: 'Pending'
    }
  ];

  const gradeDistribution = [
    { grade: 'A', count: 15, percentage: '33%' },
    { grade: 'B', count: 18, percentage: '40%' },
    { grade: 'C', count: 8, percentage: '18%' },
    { grade: 'D', count: 3, percentage: '7%' },
    { grade: 'F', count: 1, percentage: '2%' }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Grade Management" 
        description="Manage and track student grades"
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

      {/* Grade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Grade Distribution</h2>
          <div className="space-y-4">
            {gradeDistribution.map((item) => (
              <div key={item.grade} className="flex items-center">
                <span className="w-8 text-slate-300">{item.grade}</span>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: item.percentage }}
                    />
                  </div>
                </div>
                <span className="w-16 text-right text-slate-300">{item.count} ({item.percentage})</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <CloudArrowUpIcon className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-slate-300">Upload Grades</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
              <ArrowPathIcon className="h-6 w-6 text-green-400 mr-2" />
              <span className="text-slate-300">Recalculate</span>
            </button>
          </div>
        </div>
      </div>

      {/* Student Grades Table */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-6">Student Grades</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Student</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Assignments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Midterm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Finals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Grade</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.rollNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.assignments}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.midterm}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.finals}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{student.total}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.grade === 'A' ? 'bg-green-100 text-green-800' :
                      student.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      student.grade === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <button className="text-blue-400 hover:text-blue-300 transition-colors mr-4">
                      Edit
                    </button>
                    <button className="text-green-400 hover:text-green-300 transition-colors">
                      Publish
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

export default Grades;
