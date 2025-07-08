import React from 'react';
import { DollarSign, Calendar, TrendingUp } from 'lucide-react';

const SpendingOverview = () => {
  const spendingData = [
    { category: 'Vegetables', amount: 12500, percentage: 35, color: 'bg-green-500' },
    { category: 'Grains', amount: 8900, percentage: 25, color: 'bg-yellow-500' },
    { category: 'Fruits', amount: 7200, percentage: 20, color: 'bg-red-500' },
    { category: 'Dairy', amount: 5400, percentage: 15, color: 'bg-blue-500' },
    { category: 'Others', amount: 1800, percentage: 5, color: 'bg-gray-500' }
  ];

  const totalSpending = spendingData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          <span>Spending Overview</span>
        </h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>This Month</span>
        </div>
      </div>

      {/* Total Spending */}
      <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Spending</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              ${totalSpending.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">+8.2%</span>
          </div>
        </div>
      </div>

      {/* Spending Breakdown */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900 dark:text-white">Category Breakdown</h3>
        
        {spendingData.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.category}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                ${item.amount.toLocaleString()} ({item.percentage}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${item.color}`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">Avg. Order Value</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">$1,250</p>
        </div>
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <p className="text-xs text-gray-600 dark:text-gray-400">Orders This Month</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">28</p>
        </div>
      </div>
    </div>
  );
};

export default SpendingOverview;
