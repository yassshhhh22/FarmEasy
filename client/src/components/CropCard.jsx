import React from "react";
import { MapPin, Star, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CropCard = ({ crop }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/crop/${crop._id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      <div className="relative">
        <img
          src={crop.images?.[0] || "/placeholder.svg"}
          alt={crop.cropName}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full">
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {crop.status || "Available"}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {crop.cropName}
        </h3>

        <div className="flex items-center space-x-2 mb-2">
          <img
            src={crop.farmer?.avatar || "/placeholder.svg"}
            alt={crop.farmer?.name || crop.farmerName}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {crop.farmer?.name || crop.farmerName}
          </span>
          {crop.rating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {crop.rating}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1 mb-3">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {crop.region || crop.location}
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${crop.pricePerUnit || crop.price}/{crop.unit || "kg"}
            </span>
            {crop.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${crop.originalPrice}/{crop.unit || "kg"}
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
          <button
            onClick={handleDetailsClick}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

const CropGrid = ({ crops = [] }) => {
  const list = Array.isArray(crops) ? crops : []; // guard
  if (list.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No crops available at the moment
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {list.map((crop) => (
        <CropCard key={crop._id} crop={crop} />
      ))}
    </div>
  );
};

export default CropGrid;
