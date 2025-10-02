import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Truck,
  Calendar,
  Package,
} from "lucide-react";
import { api } from "../lib/api";

const CropDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await api(`/api/crops/${id}`);
        if (!res.ok) throw new Error("Failed to load crop");
        const d = await res.json();
        setCrop(d.data || d);
      } catch (e) {
        setError(e.message || "Failed to load crop");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-gray-500 dark:text-gray-400">
          Loading crop details...
        </div>
      </div>
    );
  }

  if (error || !crop) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">{error || "Crop not found"}</div>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {crop.cropName}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-w-16 aspect-h-12">
              <img
                src={crop.images?.[0] || "/placeholder.svg"}
                alt={crop.cropName}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            {crop.images && crop.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {crop.images.slice(1, 5).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${crop.cropName} ${index + 2}`}
                    className="w-full h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Crop Details */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    ${crop.pricePerUnit}/{crop.unit || "kg"}
                  </span>
                  {crop.originalPrice && (
                    <span className="text-lg text-gray-500 line-through ml-2">
                      ${crop.originalPrice}/{crop.unit || "kg"}
                    </span>
                  )}
                </div>
                <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
                  {crop.status || "Available"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {crop.quantity} {crop.unit || "kg"} available
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">
                    {crop.region || crop.location}
                  </span>
                </div>
                {crop.harvestDate && (
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Harvested:{" "}
                      {new Date(crop.harvestDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Truck className="w-5 h-5 text-green-500" />
                  <span className="text-green-600 dark:text-green-400">
                    Free delivery
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors">
                  Add to Cart
                </button>
                <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  Contact Farmer
                </button>
              </div>
            </div>

            {/* Farmer Info */}
            <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Farmer Information
              </h3>
              <div className="flex items-center space-x-3 mb-3">
                <img
                  src={crop.farmer?.avatar || "/placeholder.svg"}
                  alt={crop.farmer?.name || crop.farmerName}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {crop.farmer?.name || crop.farmerName}
                  </h4>
                  {crop.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {crop.rating} rating
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            {crop.description && (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {crop.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
