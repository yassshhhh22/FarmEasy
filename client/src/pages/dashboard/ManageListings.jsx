import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext"; // Add this import
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { Edit, Trash2, Eye, Plus, Search, Filter, Loader2 } from "lucide-react";

const ManageListings = () => {
  const { user, isAuthenticated } = useAuth(); // Add auth context
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crops/my-crops`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Use cookies for authentication
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch crops");
      }

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
    if (!window.confirm("Are you sure you want to delete this crop listing?")) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/crops/${cropId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // Use cookies for authentication
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete crop");
      }

      // Remove the deleted crop from state
      setCrops(crops.filter((crop) => crop._id !== cropId));
      alert("Crop deleted successfully!");
    } catch (err) {
      alert("Error deleting crop: " + err.message);
    }
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

      <div className="flex-1 ">
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
                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                            title="Edit crop"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCrop(crop._id)}
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
    </div>
  );
};

export default ManageListings;
