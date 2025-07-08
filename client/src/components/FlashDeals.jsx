import React from 'react';
import { Clock, Star } from 'lucide-react';

const FlashDeals = () => {
  const deals = [
    {
      id: 1,
      crop: 'Organic Tomatoes',
      farmer: 'Green Valley Farm',
      originalPrice: 45,
      discountPrice: 35,
      discount: 22,
      timeLeft: '2h 30m',
      rating: 4.8,
      image: '/placeholder.svg?height=200&width=300',
      quantity: '500 kg available'
    },
    {
      id: 2,
      crop: 'Fresh Carrots',
      farmer: 'Sunrise Agriculture',
      originalPrice: 30,
      discountPrice: 22,
      discount: 27,
      timeLeft: '5h 15m',
      rating: 4.6,
      image: '/placeholder.svg?height=200&width=300',
      quantity: '800 kg available'
    },
    {
      id: 3,
      crop: 'Premium Rice',
      farmer: 'Golden Fields',
      originalPrice: 60,
      discountPrice: 48,
      discount: 20,
      timeLeft: '1h 45m',
      rating: 4.9,
      image: '/placeholder.svg?height=200&width=300',
      quantity: '1000 kg available'
    },
    {
      id: 4,
      crop: 'Sweet Corn',
      farmer: 'Valley Fresh',
      originalPrice: 25,
      discountPrice: 18,
      discount: 28,
      timeLeft: '3h 20m',
      rating: 4.7,
      image: '/placeholder.svg?height=200&width=300',
      quantity: '600 kg available'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">⚡ Flash Deals</h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">Limited time offers</span>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="flex-shrink-0 w-72 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800 p-4 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="relative mb-3">
              <img
                src={deal.image || "/placeholder.svg"}
                alt={deal.crop}
                className="w-full h-32 object-cover rounded-lg"
              />
              <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                -{deal.discount}%
              </div>
              <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full flex items-center space-x-1">
                <Clock className="w-3 h-3 text-red-500" />
                <span className="text-xs font-medium text-red-500">{deal.timeLeft}</span>
              </div>
            </div>

            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{deal.crop}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{deal.farmer}</p>
            
            <div className="flex items-center space-x-1 mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{deal.rating}</span>
            </div>

            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                ${deal.discountPrice}/kg
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${deal.originalPrice}/kg
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">{deal.quantity}</p>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashDeals;
