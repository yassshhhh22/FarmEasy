import React from 'react';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const MarketInsight = () => {
  const priceData = [
    {
      crop: 'Tomatoes',
      currentPrice: 35,
      previousPrice: 32,
      change: 9.4,
      trend: 'up',
      volume: '2.3k tons'
    },
    {
      crop: 'Carrots',
      currentPrice: 22,
      previousPrice: 25,
      change: -12.0,
      trend: 'down',
      volume: '1.8k tons'
    },
    {
      crop: 'Rice',
      currentPrice: 48,
      previousPrice: 45,
      change: 6.7,
      trend: 'up',
      volume: '5.2k tons'
    },
    {
      crop: 'Corn',
      currentPrice: 18,
      previousPrice: 19,
      change: -5.3,
      trend: 'down',
      volume: '3.1k tons'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <span>Market Insights</span>
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">Last 24 hours</span>
      </div>

      <div className="space-y-4">
        {priceData.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {item.crop.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {item.crop}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Volume: {item.volume}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  ${item.currentPrice}/kg
                </span>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium ${
                  item.trend === 'up' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                }`}>
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{Math.abs(item.change)}%</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                From ${item.previousPrice}/kg
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
          Market Forecast
        </h3>
        <p className="text-sm text-blue-700 dark:text-blue-400">
          Tomato prices expected to rise 15% next week due to seasonal demand. 
          Consider securing contracts early for better rates.
        </p>
      </div>
    </div>
  );
};

export default MarketInsight;
