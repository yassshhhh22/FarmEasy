import React from 'react';
import { FileText, Clock, CheckCircle, TrendingUp } from 'lucide-react';

const ContractSummaryCard = () => {
  const stats = [
    {
      title: 'Active Contracts',
      count: 12,
      icon: FileText,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      change: '+2 this week'
    },
    {
      title: 'Pending Contracts',
      count: 5,
      icon: Clock,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
      change: '+1 today'
    },
    {
      title: 'Completed Contracts',
      count: 28,
      icon: CheckCircle,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      change: '+3 this month'
    },
    {
      title: 'Total Value',
      count: '$45,230',
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      change: '+12% this month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="text-sm text-green-600 dark:text-green-400 font-medium">
                {stat.change}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.count}
            </h3>
            
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ContractSummaryCard;
