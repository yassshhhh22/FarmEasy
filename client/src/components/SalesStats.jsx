import React from 'react';
import { DollarSign, Package, TrendingUp, Users } from 'lucide-react';

const SalesStats = () => {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$24,580',
      change: '+12.5%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      title: 'Orders Today',
      value: '18',
      change: '+3 from yesterday',
      changeType: 'increase',
      icon: Package,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      title: 'Pending Orders',
      value: '7',
      change: '-2 from yesterday',
      changeType: 'decrease',
      icon: TrendingUp,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/30'
    },
    {
      title: 'Active Buyers',
      value: '142',
      change: '+8 this week',
      changeType: 'increase',
      icon: Users,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    }
  ];

  const recentSales = [
    {
      buyer: 'Fresh Market Co.',
      crop: 'Organic Tomatoes',
      quantity: '500 kg',
      amount: '$1,750',
      status: 'Delivered',
      time: '2 hours ago'
    },
    {
      buyer: 'Green Grocers',
      crop: 'Sweet Corn',
      quantity: '300 kg',
      amount: '$540',
      status: 'In Transit',
      time: '4 hours ago'
    },
    {
      buyer: 'City Supermarket',
      crop: 'Fresh Carrots',
      quantity: '800 kg',
      amount: '$1,760',
      status: 'Processing',
      time: '6 hours ago'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <span className={`text-sm font-medium ${
                  stat.changeType === 'increase' 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.change}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Sales */}
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Recent Sales
        </h2>
        
        <div className="space-y-4">
          {recentSales.map((sale, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {sale.buyer.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {sale.buyer}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sale.crop} • {sale.quantity}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900 dark:text-white">
                  {sale.amount}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    sale.status === 'Delivered' 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : sale.status === 'In Transit'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                  }`}>
                    {sale.status}
                  </span>
                  <span className="text-xs text-gray-500">
                    {sale.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesStats;
