import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/common/PageHeader';
import StatsCard from '../../components/common/StatsCard';
import {
  CurrencyDollarIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  CreditCardIcon,
  DocumentTextIcon,
  BanknotesIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';

const Fees = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Total Fees',
      value: '$12,000',
      icon: <CurrencyDollarIcon className="h-6 w-6 text-blue-500" />,
      trend: 0,
      description: 'Current semester'
    },
    {
      title: 'Paid Amount',
      value: '$8,000',
      icon: <CheckCircleIcon className="h-6 w-6 text-green-500" />,
      trend: 15,
      description: 'Payment complete'
    },
    {
      title: 'Due Amount',
      value: '$4,000',
      icon: <XCircleIcon className="h-6 w-6 text-red-500" />,
      trend: -10,
      description: 'Payment pending'
    },
    {
      title: 'Next Due',
      value: '15 Days',
      icon: <ClockIcon className="h-6 w-6 text-yellow-500" />,
      trend: 0,
      description: 'Until deadline'
    }
  ];

  const feeBreakdown = [
    {
      id: 1,
      type: 'Tuition Fee',
      amount: 8000,
      paid: 6000,
      due: 2000,
      dueDate: '2024-03-15'
    },
    {
      id: 2,
      type: 'Library Fee',
      amount: 500,
      paid: 500,
      due: 0,
      dueDate: '2024-02-15'
    },
    {
      id: 3,
      type: 'Laboratory Fee',
      amount: 1500,
      paid: 750,
      due: 750,
      dueDate: '2024-03-15'
    },
    {
      id: 4,
      type: 'Development Fee',
      amount: 1000,
      paid: 500,
      due: 500,
      dueDate: '2024-03-15'
    },
    {
      id: 5,
      type: 'Exam Fee',
      amount: 1000,
      paid: 250,
      due: 750,
      dueDate: '2024-03-15'
    }
  ];

  const transactions = [
    {
      id: 1,
      date: '2024-02-15',
      type: 'Payment',
      amount: 2000,
      method: 'Credit Card',
      status: 'Success',
      reference: 'TXN123456'
    },
    {
      id: 2,
      date: '2024-01-15',
      type: 'Payment',
      amount: 3000,
      method: 'Bank Transfer',
      status: 'Success',
      reference: 'TXN123455'
    },
    {
      id: 3,
      date: '2023-12-15',
      type: 'Payment',
      amount: 3000,
      method: 'Credit Card',
      status: 'Success',
      reference: 'TXN123454'
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Fee Management" 
        description="View and manage your fee payments"
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

      {/* Quick Pay */}
      <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">Quick Pay</h2>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
            <CreditCardIcon className="h-5 w-5 mr-2" />
            Pay Now
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white/5 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <CreditCardIcon className="h-6 w-6 text-blue-400 mr-3" />
              <span className="text-slate-300">Credit Card</span>
            </div>
            <button className="text-blue-400 hover:text-blue-300">Select</button>
          </div>
          <div className="p-4 bg-white/5 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <BanknotesIcon className="h-6 w-6 text-green-400 mr-3" />
              <span className="text-slate-300">Bank Transfer</span>
            </div>
            <button className="text-blue-400 hover:text-blue-300">Select</button>
          </div>
          <div className="p-4 bg-white/5 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <DocumentTextIcon className="h-6 w-6 text-purple-400 mr-3" />
              <span className="text-slate-300">Online Banking</span>
            </div>
            <button className="text-blue-400 hover:text-blue-300">Select</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fee Breakdown */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Fee Breakdown</h2>
            <button className="flex items-center px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
              Download Receipt
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Total Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Paid</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Due</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {feeBreakdown.map((fee) => (
                  <tr key={fee.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{fee.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">${fee.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">${fee.paid}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">${fee.due}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{fee.dueDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        fee.due === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {fee.due === 0 ? 'Paid' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-1 bg-white/5 backdrop-blur-xl rounded-xl p-6">
          <h2 className="text-xl font-semibold text-white mb-6">Recent Transactions</h2>
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-4 bg-white/5 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {transaction.status}
                    </span>
                    <h3 className="text-white font-medium mt-2">${transaction.amount}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-300">{transaction.date}</p>
                    <p className="text-xs text-slate-400 mt-1">{transaction.method}</p>
                  </div>
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  Reference: {transaction.reference}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;
