import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api"; // add this
import { useAuth } from "../../contexts/AuthContext";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import {
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  Loader2,
  X,
} from "lucide-react";

const ManageListings = () => {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch farmer's crops
  useEffect(() => {
    if (isAuthenticated && user?.userType === "farmer") {
      fetchFarmerCrops();
    } else if (!isAuthenticated) {
      setError("Please log in to view your crops");
      setLoading(false);
    } else if (user?.userType !== "farmer") {
      setError("Only farmers can view crop listings");
      setLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchFarmerCrops = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await api("/api/crops/my-crops"); // use api wrapper
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to fetch crops");
      }
      const data = await res.json();

      console.log("Fetched crops:", data); // Debug log
      setCrops(data.data || data.crops || []); // Handle different response formats
    } catch (err) {
      console.error("Error fetching crops:", err);
      setError(err.message);
      setCrops([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCrop = async (cropId) => {
    setDeleteLoading(true);

    try {
      const res = await api(`/api/crops/delete/${cropId}`, {
        method: "DELETE",
      }); // use api wrapper
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to delete crop");
      }

      setCrops(crops.filter((crop) => crop._id !== cropId));
      setShowDeleteModal(false);
      setSelectedCrop(null);
      // Removed alert - will add toast later
    } catch (err) {
      console.error("Error deleting crop:", err.message);
      // Removed alert - will add toast later
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteClick = (crop) => {
    setSelectedCrop(crop);
    setShowDeleteModal(true);
  };

  const handleEditCrop = (crop) => {
    setSelectedCrop({ ...crop });
    setShowEditModal(true);
  };

  const handleViewCrop = (crop) => {
    setSelectedCrop(crop);
    setShowViewModal(true);
  };

  const handleUpdateCrop = async (e) => {
    e.preventDefault();
    setEditLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crops/edit/${selectedCrop._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            cropName: selectedCrop.cropName,
            price: selectedCrop.price,
            quantity: selectedCrop.quantity,
            category: selectedCrop.category,
            region: selectedCrop.region,
            description: selectedCrop.description,
            status: selectedCrop.status,
            isFlashDeal: selectedCrop.isFlashDeal,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update crop");
      }

      // Update the crop in the local state
      setCrops(
        crops.map((crop) =>
          crop._id === selectedCrop._id ? data.data || data.crop : crop
        )
      );

      setShowEditModal(false);
      setSelectedCrop(null);
      // Removed alert - will add toast later
    } catch (err) {
      console.error("Error updating crop:", err.message);
      // Removed alert - will add toast later
    } finally {
      setEditLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSelectedCrop((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      case "Sold":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
      case "Expired":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
      default:
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
    }
  };

  const filteredListings = crops.filter((crop) => {
    const matchesSearch =
      crop.cropName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || crop.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6">
            <div className="flex items-center justify-center h-64">
              <div className="flex items-center space-x-2">
                <Loader2 className="w-6 h-6 animate-spin text-green-600" />
                <span className="text-gray-600 dark:text-gray-400">
                  Loading your listings...
                </span>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Show authentication error if not logged in
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔒</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                Please log in to view your crop listings
              </p>
              <button
                onClick={() => navigate("/login")}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Go to Login
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Show error if user is not a farmer
  if (user?.userType !== "farmer") {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
        <Sidebar />
        <div className="flex-1">
          <Topbar />
          <main className="p-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Only farmers can view crop listings
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 relative">
        {/* Main Content - gets blurred when modal is open */}
        <div
          className={`${
            showEditModal || showViewModal || showDeleteModal ? "blur-sm" : ""
          } transition-all duration-300`}
        >
          <Topbar />

          <main className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Manage Listings
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  View and manage your crop listings
                </p>
              </div>
              <button
                onClick={() => navigate("/dashboard/add-new-crop")}
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
                <span>Add New Listing</span>
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                <p>{error}</p>
                <button
                  onClick={fetchFarmerCrops}
                  className="mt-2 text-sm underline hover:no-underline"
                >
                  Try again
                </button>
              </div>
            )}

            {/* Filters and Search */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search listings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Filter className="w-5 h-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All Status</option>
                      <option value="active">Active</option>
                      <option value="sold">Sold</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>

                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredListings.length} of {crops.length} listings
                </div>
              </div>
            </div>

            {/* Listings Table */}
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                    <tr>
                      <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">
                        Product
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">
                        Category
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">
                        Quantity
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">
                        Price/unit
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">
                        Region
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">
                        Status
                      </th>
                      <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {filteredListings.map((crop) => (
                      <tr
                        key={crop._id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                              <span className="text-green-600 font-semibold text-lg">
                                {crop.cropName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">
                                {crop.cropName}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                Added{" "}
                                {new Date(crop.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-gray-900 dark:text-white">
                          {crop.category || "N/A"}
                        </td>
                        <td className="py-4 px-6 text-gray-900 dark:text-white">
                          {crop.quantity} units
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-green-600 dark:text-green-400">
                            ${crop.price}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-900 dark:text-white">
                          {crop.region}
                        </td>
                        <td className="py-4 px-6">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              crop.status
                            )}`}
                          >
                            {crop.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleViewCrop(crop)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="View details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditCrop(crop)}
                              className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                              title="Edit crop"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(crop)}
                              className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                              title="Delete crop"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {filteredListings.length === 0 && !loading && (
              <div className="text-center py-12">
                {crops.length === 0 ? (
                  <div className="space-y-4">
                    <div className="text-6xl">🌱</div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      No crop listings yet
                    </p>
                    <p className="text-gray-400 dark:text-gray-500">
                      Start by adding your first crop listing
                    </p>
                    <button
                      onClick={() => navigate("/dashboard/add-new-crop")}
                      className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Add Your First Crop
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400">
                    No listings found matching your criteria.
                  </p>
                )}
              </div>
            )}
          </main>
        </div>

        {/* View Crop Modal - Now positioned over the blurred content */}
        {showViewModal && selectedCrop && (
          <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Crop Details
                  </h2>
                  <button
                    onClick={() => setShowViewModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Crop Name
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedCrop.cropName}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedCrop.category || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Price per unit
                      </label>
                      <p className="text-gray-900 dark:text-white font-semibold">
                        ${selectedCrop.price}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedCrop.quantity} units
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Region
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedCrop.region}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          selectedCrop.status
                        )}`}
                      >
                        {selectedCrop.status}
                      </span>
                    </div>
                  </div>

                  {selectedCrop.description && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Description
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedCrop.description}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Flash Deal
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {selectedCrop.isFlashDeal ? "Yes" : "No"}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Created At
                      </label>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(selectedCrop.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedCrop && (
          <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Delete Crop Listing
                  </h2>
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex-shrink-0">
                      <Trash2 className="w-8 h-8 text-red-600" />
                    </div>
                    <div>
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        Are you sure you want to delete this crop listing?
                      </p>
                      <p className="text-red-600 dark:text-red-400 text-sm mt-1">
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <span className="text-green-600 font-semibold">
                          {selectedCrop.cropName.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {selectedCrop.cropName}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {selectedCrop.quantity} units • ${selectedCrop.price}{" "}
                          per unit
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowDeleteModal(false)}
                    disabled={deleteLoading}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteCrop(selectedCrop._id)}
                    disabled={deleteLoading}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                  >
                    {deleteLoading && (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    <span>{deleteLoading ? "Deleting..." : "Delete Crop"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Crop Modal - Now positioned over the blurred content */}
        {showEditModal && selectedCrop && (
          <div className="absolute inset-0 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Crop
                  </h2>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateCrop} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Crop Name *
                      </label>
                      <input
                        type="text"
                        value={selectedCrop.cropName}
                        onChange={(e) =>
                          handleInputChange("cropName", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Category
                      </label>
                      <input
                        type="text"
                        value={selectedCrop.category || ""}
                        onChange={(e) =>
                          handleInputChange("category", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Price per unit *
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={selectedCrop.price}
                        onChange={(e) =>
                          handleInputChange("price", parseFloat(e.target.value))
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Quantity *
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={selectedCrop.quantity}
                        onChange={(e) =>
                          handleInputChange(
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Region *
                      </label>
                      <input
                        type="text"
                        value={selectedCrop.region}
                        onChange={(e) =>
                          handleInputChange("region", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Status
                      </label>
                      <select
                        value={selectedCrop.status}
                        onChange={(e) =>
                          handleInputChange("status", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Sold">Sold</option>
                        <option value="Expired">Expired</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={selectedCrop.description || ""}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isFlashDeal"
                      checked={selectedCrop.isFlashDeal}
                      onChange={(e) =>
                        handleInputChange("isFlashDeal", e.target.checked)
                      }
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label
                      htmlFor="isFlashDeal"
                      className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Mark as Flash Deal
                    </label>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={editLoading}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center space-x-2"
                    >
                      {editLoading && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                      <span>{editLoading ? "Updating..." : "Update Crop"}</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageListings;
