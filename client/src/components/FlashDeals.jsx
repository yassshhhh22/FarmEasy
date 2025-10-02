import React, { useState, useEffect } from "react";
import { Clock, Star } from "lucide-react";
import { api } from "../lib/api"; // add this

const FlashDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFlashDeals = async () => {
      try {
        setLoading(true);
        const res = await api("/api/crops/flash-deals"); // use api wrapper
        if (!res.ok) {
          throw new Error("Failed to fetch flash deals");
        }
        const data = await res.json();
        setDeals(data.data || data);
        setError(null);
      } catch (err) {
        setError("Failed to load flash deals");
        console.error("Error loading flash deals:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFlashDeals();
  }, []);

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center h-48">
          <div className="text-gray-500 dark:text-gray-400">
            Loading flash deals...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-center h-48">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          ⚡ Flash Deals
        </h2>
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Limited time offers
        </span>
      </div>

      {deals.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No flash deals available at the moment
        </div>
      ) : (
        <div className="flex space-x-4 overflow-x-auto pb-4">
          {deals.map((deal) => (
            <div
              key={deal._id}
              className="flex-shrink-0 w-72 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border border-orange-200 dark:border-orange-800 p-4 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="relative mb-3">
                <img
                  src={deal.images?.[0] || "/placeholder.svg"}
                  alt={deal.cropName}
                  className="w-full h-32 object-cover rounded-lg"
                />
                {deal.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    -{deal.discount}%
                  </div>
                )}
                {deal.flashDeal?.timeLeft && (
                  <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 px-2 py-1 rounded-full flex items-center space-x-1">
                    <Clock className="w-3 h-3 text-red-500" />
                    <span className="text-xs font-medium text-red-500">
                      {deal.flashDeal.timeLeft}
                    </span>
                  </div>
                )}
              </div>

              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                {deal.cropName}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {deal.farmer?.name || deal.farmerName}
              </p>

              {deal.rating && (
                <div className="flex items-center space-x-1 mb-2">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {deal.rating}
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-2 mb-2">
                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                  ${deal.discountPrice || deal.pricePerUnit}/kg
                </span>
                {deal.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${deal.originalPrice}/kg
                  </span>
                )}
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                {deal.quantity} {deal.unit || "kg"} available
              </p>

              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg font-medium transition-colors">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FlashDeals;
