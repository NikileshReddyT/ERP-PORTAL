import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  AcademicCapIcon,
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const Grades = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Current GPA',
      value: '3.85',
      icon: <AcademicCapIcon className="h-6 w-6 text-blue-500" />,
      trend: 5,
      description: 'Up from last semester'
    },
    {
      title: 'Total Credits',
      value: '85',
      icon: <ChartBarIcon className="h-6 w-6 text-green-500" />,
      trend: 12,
      description: 'Credits earned'
    },
    {
      title: 'Highest Grade',
      value: 'A+',
      icon: <TrophyIcon className="h-6 w-6 text-yellow-500" />,
      trend: 0,
      description: 'Current semester'
    },
    {
      title: 'Pending Grades',
      value: '2',
      icon: <ClockIcon className="h-6 w-6 text-purple-500" />,
      trend: -1,
      description: 'Awaiting results'
    }
  ];

  const currentGrades = [
    {
      id: 1,
      course: 'Computer Science 101',
      credits: 4,
      midterm: 92,
      finals: 88,
      assignments: 90,
      attendance: 95,
      overall: 'A',
      status: 'Final'
    },
    {
      id: 2,
      course: 'Database Management',
      credits: 3,
      midterm: 88,
      finals: null,
      assignments: 85,
      attendance: 92,
      overall: 'B+',
      status: 'In Progress'
    },
    {
      id: 3,
      course: 'Web Technologies',
      credits: 4,
      midterm: 95,
      finals: null,
      assignments: 94,
      attendance: 98,
      overall: 'A',
      status: 'In Progress'
    },
    {
      id: 4,
      course: 'Software Engineering',
      credits: 3,
      midterm: 90,
      finals: 92,
      assignments: 88,
      attendance: 90,
      overall: 'A-',
      status: 'Final'
    }
  ];

  const gradeHistory = [
    {
      semester: 'Fall 2023',
      gpa: 3.8,
      credits: 16,
      courses: [
        { name: 'Data Structures', grade: 'A', credits: 4 },
        { name: 'Algorithms', grade: 'A-', credits: 4 },
        { name: 'Computer Networks', grade: 'B+', credits: 4 },
        { name: 'Operating Systems', grade: 'A', credits: 4 }
      ]
    },
    {
      semester: 'Spring 2023',
      gpa: 3.9,
      credits: 15,
      courses: [
        { name: 'Programming Languages', grade: 'A', credits: 3 },
        { name: 'Database Systems', grade: 'A', credits: 4 },
        { name: 'Software Design', grade: 'A-', credits: 4 },
        { name: 'Web Development', grade: 'A', credits: 4 }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Academic Performance" 
        description="Track your grades and academic progress"
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

      {/* Current Semester Grades */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Current Semester Grades</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Export Grades
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/10">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Midterm</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Finals</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Assignments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Attendance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Overall</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {currentGrades.map((grade) => (
                <tr key={grade.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <DocumentTextIcon className="h-5 w-5 text-blue-400 mr-3" />
                      <span className="text-sm text-slate-300">{grade.course}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{grade.credits}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{grade.midterm}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{grade.finals ? `${grade.finals}%` : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{grade.assignments}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{grade.attendance}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {grade.overall}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      grade.status === 'Final' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {grade.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grade History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GPA Trend */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">GPA Trend</h2>
          <div className="space-y-4">
            {gradeHistory.map((semester, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-medium">{semester.semester}</h3>
                  <div className="flex items-center">
                    <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 mr-2" />
                    <span className="text-green-400 font-medium">GPA: {semester.gpa}</span>
                  </div>
                </div>
                <div className="text-sm text-slate-300">
                  Credits Completed: {semester.credits}
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {semester.courses.map((course, courseIndex) => (
                    <div key={courseIndex} className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{course.name}</span>
                      <span className="text-sm font-medium text-slate-300">{course.grade}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Distribution */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Grade Distribution</h2>
          <div className="space-y-4">
            {['A+/A', 'A-/B+', 'B/B-', 'C+/C', 'C-/D'].map((grade, index) => (
              <div key={index} className="flex items-center">
                <span className="text-sm text-slate-300 w-20">{grade}</span>
                <div className="flex-1 mx-4">
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: `${[75, 60, 40, 20, 5][index]}%`
                      }}
                    />
                  </div>
                </div>
                <span className="text-sm text-slate-300 w-16 text-right">
                  {[75, 60, 40, 20, 5][index]}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grades;
