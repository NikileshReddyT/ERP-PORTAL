import React from 'react';
import { CalendarIcon, ClockIcon, DocumentTextIcon, AcademicCapIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';

const Exams = () => {
  // Sample data - replace with actual API calls
  const examStats = {
    upcoming: 3,
    completed: 8,
    avgScore: 85,
    nextExam: '2 days'
  };

  const stats = [
    {
      title: 'Upcoming Exams',
      value: examStats.upcoming.toString(),
      icon: <CalendarIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'Next 30 days'
    },
    {
      title: 'Completed Exams',
      value: examStats.completed.toString(),
      icon: <DocumentTextIcon className="h-6 w-6 text-purple-500" />,
      trend: 0,
      description: 'This semester'
    },
    {
      title: 'Average Score',
      value: examStats.avgScore + '%',
      icon: <AcademicCapIcon className="h-6 w-6 text-green-500" />,
      trend: 5,
      description: 'Overall performance'
    },
    {
      title: 'Next Exam',
      value: examStats.nextExam,
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      trend: 0,
      description: 'Time remaining'
    }
  ];

  const upcomingExams = [
    { id: 1, subject: 'Database Management', date: '2024-02-15', time: '09:00 AM', duration: '3 hours', venue: 'Hall A1' },
    { id: 2, subject: 'Software Engineering', date: '2024-02-18', time: '02:00 PM', duration: '3 hours', venue: 'Hall B2' },
    { id: 3, subject: 'Computer Networks', date: '2024-02-20', time: '10:00 AM', duration: '3 hours', venue: 'Hall C3' }
  ];

  const pastExams = [
    { id: 4, subject: 'Operating Systems', date: '2024-01-15', score: 88, status: 'Published' },
    { id: 5, subject: 'Data Structures', date: '2024-01-10', score: 92, status: 'Published' },
    { id: 6, subject: 'Web Development', date: '2024-01-05', score: 85, status: 'Published' }
  ];

  const downloadHallTicket = () => {
    toast.success('Hall ticket downloaded successfully');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Examinations" 
        description="View and manage your examination schedule and results"
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

      {/* Upcoming Exams Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Upcoming Examinations</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Venue</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {upcomingExams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.time}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.venue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Past Exams Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Past Examinations</h2>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-700">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Score</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {pastExams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.subject}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">{exam.score}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {exam.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Quick Actions</h2>
        </div>
        <div className="p-4">
          <button
            onClick={downloadHallTicket}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <DocumentTextIcon className="h-5 w-5 mr-2" />
            Download Hall Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exams;
