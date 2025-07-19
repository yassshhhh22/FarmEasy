import React, { useState } from "react";

const AddNewCrop = () => {
  const [formData, setFormData] = useState({
    cropName: "",
    category: "",
    region: "",
    price: "",
    quantity: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [touched, setTouched] = useState({});

  const categories = [
    {
      value: "Cereals",
      label: "🌾 Cereals",
      description: "Rice, Wheat, Corn, Barley",
    },
    {
      value: "Vegetables",
      label: "🥕 Vegetables",
      description: "Tomato, Potato, Onion, Cabbage",
    },
    {
      value: "Fruits",
      label: "🍎 Fruits",
      description: "Apple, Mango, Orange, Banana",
    },
    {
      value: "Legumes",
      label: "🫘 Legumes",
      description: "Beans, Lentils, Peas, Chickpeas",
    },
    {
      value: "Cash Crops",
      label: "💰 Cash Crops",
      description: "Cotton, Sugarcane, Tobacco",
    },
    {
      value: "Spices",
      label: "🌶️ Spices",
      description: "Chili, Turmeric, Coriander",
    },
    { value: "Herbs", label: "🌿 Herbs", description: "Basil, Mint, Cilantro" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleBlur = (fieldName) => {
    setTouched((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "cropName":
        return value.length < 2
          ? "Crop name must be at least 2 characters"
          : "";
      case "price":
        return value <= 0 ? "Price must be greater than 0" : "";
      case "quantity":
        return value <= 0 ? "Quantity must be greater than 0" : "";
      case "region":
        return value.length < 2 ? "Region must be at least 2 characters" : "";
      default:
        return "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      
      const apiUrl =  `${import.meta.env.VITE_API_URL}/api/crops/add`;
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add crop");
      }

      setSuccess("🎉 Crop added successfully!");
      setFormData({
        cropName: "",
        category: "",
        region: "",
        price: "",
        quantity: "",
        description: "",
      });
      setTouched({});
    } catch (err) {
      setError(err.message);
      console.error("Error adding crop:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="text-2xl">🌱</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Add New Crop
          </h1>
          <p className="text-gray-600 text-lg">
            Share your harvest with the community
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 px-8 py-6">
            <h2 className="text-xl font-semibold text-white">
              Crop Information
            </h2>
            <p className="text-green-100 mt-1">
              Fill in the details about your crop
            </p>
          </div>

          <div className="p-8">
            {/* Alert Messages */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
                <div className="flex items-center">
                  <span className="text-red-400 mr-2">⚠️</span>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✅</span>
                  <p className="text-green-700 font-medium">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Crop Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Crop Name *
                    </label>
                    <input
                      type="text"
                      name="cropName"
                      value={formData.cropName}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("cropName")}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                        touched.cropName &&
                        validateField("cropName", formData.cropName)
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-green-500 focus:bg-green-50"
                      }`}
                      placeholder="e.g., Basmati Rice, Red Tomatoes"
                      required
                    />
                    {touched.cropName &&
                      validateField("cropName", formData.cropName) && (
                        <p className="text-red-500 text-xs mt-1">
                          {validateField("cropName", formData.cropName)}
                        </p>
                      )}
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-green-50 transition-all duration-200 appearance-none bg-white cursor-pointer"
                        required
                      >
                        <option value="" className="text-gray-400">
                          Choose a category...
                        </option>
                        {categories.map((cat) => (
                          <option
                            key={cat.value}
                            value={cat.value}
                            className="py-2"
                          >
                            {cat.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                    {formData.category && (
                      <p className="text-xs text-gray-500 mt-1">
                        {
                          categories.find(
                            (cat) => cat.value === formData.category
                          )?.description
                        }
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Location & Pricing Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Location & Pricing
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Region */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📍 Region *
                    </label>
                    <input
                      type="text"
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("region")}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                        touched.region &&
                        validateField("region", formData.region)
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-green-500 focus:bg-green-50"
                      }`}
                      placeholder="e.g., Punjab, Maharashtra"
                      required
                    />
                    {touched.region &&
                      validateField("region", formData.region) && (
                        <p className="text-red-500 text-xs mt-1">
                          {validateField("region", formData.region)}
                        </p>
                      )}
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💵 Price per Unit ($) *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("price")}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                        touched.price && validateField("price", formData.price)
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-green-500 focus:bg-green-50"
                      }`}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                    {touched.price &&
                      validateField("price", formData.price) && (
                        <p className="text-red-500 text-xs mt-1">
                          {validateField("price", formData.price)}
                        </p>
                      )}
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      📦 Available Quantity *
                    </label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("quantity")}
                      className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none ${
                        touched.quantity &&
                        validateField("quantity", formData.quantity)
                          ? "border-red-300 focus:border-red-500 bg-red-50"
                          : "border-gray-200 focus:border-green-500 focus:bg-green-50"
                      }`}
                      placeholder="e.g., 100 (kg/tons)"
                      min="0"
                      step="0.1"
                      required
                    />
                    {touched.quantity &&
                      validateField("quantity", formData.quantity) && (
                        <p className="text-red-500 text-xs mt-1">
                          {validateField("quantity", formData.quantity)}
                        </p>
                      )}
                  </div>
                </div>
              </div>

              {/* Description Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Additional Details
                </h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📝 Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:bg-green-50 transition-all duration-200 resize-none"
                    placeholder="Describe your crop quality, farming practices, organic certification, harvest date, storage conditions, or any special features..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">
                      Optional but recommended for better visibility
                    </p>
                    <p className="text-xs text-gray-400">
                      {formData.description.length}/500
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative px-12 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-green-300 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed scale-95"
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                  }`}
                >
                  <span className="flex items-center">
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Adding Crop...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🌱</span>
                        Add Crop to Market
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100">
            <div className="text-green-600 text-2xl mb-3">💡</div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Tips for Success
            </h3>
            <p className="text-sm text-gray-600">
              Provide accurate information and high-quality photos to attract
              more buyers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100">
            <div className="text-blue-600 text-2xl mb-3">🚀</div>
            <h3 className="font-semibold text-gray-800 mb-2">Quick Listing</h3>
            <p className="text-sm text-gray-600">
              Your crop will be visible to buyers immediately after submission.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100">
            <div className="text-purple-600 text-2xl mb-3">🤝</div>
            <h3 className="font-semibold text-gray-800 mb-2">Fair Pricing</h3>
            <p className="text-sm text-gray-600">
              Set competitive prices based on market rates and crop quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewCrop;
                     