import React from 'react';
import { MapPin, Star, Truck } from 'lucide-react';

const CropCard = ({ crop }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img
          src={crop.image || "/placeholder.svg"}
          alt={crop.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {crop.availability}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {crop.name}
        </h3>
        
        <div className="flex items-center space-x-2 mb-2">
          <img
            src={crop.farmer.avatar || "/placeholder.svg"}
            alt={crop.farmer.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {crop.farmer.name}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {crop.farmer.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {crop.region}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${crop.price}/kg
            </span>
            {crop.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${crop.originalPrice}/kg
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1 text-green-600 dark:text-green-400">
            <Truck className="w-4 h-4" />
            <span className="text-sm">Free delivery</span>
          </div>
        </div>

        <div className="flex space-x-2">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
            Add to Cart
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const CropGrid = () => {
  const crops = [
    {
      id: 1,
      name: 'Organic Tomatoes',
      price: 35,
      originalPrice: 45,
      availability: 'In Stock',
      region: 'California Valley',
      image: '/placeholder.svg?height=200&width=300',
      farmer: {
        name: 'Green Valley Farm',
        rating: 4.8,
        avatar: '/placeholder.svg?height=40&width=40'
      }
    },
    {
      id: 2,
      name: 'Fresh Carrots',
      price: 22,
      availability: 'Limited',
      region: 'Oregon Fields',
      image: '/placeholder.svg?height=200&width=300',
      farmer: {
        name: 'Sunrise Agriculture',
        rating: 4.6,
        avatar: '/placeholder.svg?height=40&width=40'
      }
    },
    {
      id: 3,
      name: 'Premium Rice',
      price: 48,
      availability: 'In Stock',
      region: 'Texas Plains',
      image: '/placeholder.svg?height=200&width=300',
      farmer: {
        name: 'Golden Fields',
        rating: 4.9,
        avatar: '/placeholder.svg?height=40&width=40'
      }
    },
    {
      id: 4,
      name: 'Sweet Corn',
      price: 18,
      availability: 'In Stock',
      region: 'Iowa Valley',
      image: '/placeholder.svg?height=200&width=300',
      farmer: {
        name: 'Valley Fresh',
        rating: 4.7,
        avatar: '/placeholder.svg?height=40&width=40'
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {crops.map((crop) => (
        <CropCard key={crop.id} crop={crop} />
      ))}
    </div>
  );
};

export default CropGrid;
