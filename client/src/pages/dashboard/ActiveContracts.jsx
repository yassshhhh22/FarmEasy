import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import {
  Calendar,
  MapPin,
  Package,
  User,
  Eye,
  MessageCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const ActiveContracts = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api("/api/contracts/active");
      const d = await res.json().catch(() => []);
      if (!res.ok)
        throw new Error(d.message || "Failed to load active contracts");
      setContracts(d.data || d);
    } catch (e) {
      setError(e.message || "Failed to load active contracts");
      setContracts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
      case "Ready for Harvest":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400";
      case "Harvesting":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 ">
        <Topbar />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Active Contracts
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor and manage your ongoing contracts
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Total Active
              </h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {contracts.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Total Value
              </h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                $
                {contracts
                  .reduce((sum, contract) => sum + contract.totalValue, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Avg. Progress
              </h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {Math.round(
                  contracts.reduce(
                    (sum, contract) => sum + contract.progress,
                    0
                  ) / contracts.length
                )}
                %
              </p>
            </div>
          </div>

          {/* Contracts List */}
          <div className="space-y-6">
            {contracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {contract.crop?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Contract ID: {contract.id}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      contract.status
                    )}`}
                  >
                    {contract.status}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Buyer
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {contract.buyer?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Quantity
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {contract.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Delivery Date
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(contract.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Location
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {contract.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Progress
                    </span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {contract.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${contract.progress}%` }}
                    />
                  </div>
                </div>

                {/* Contract Value and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Contract Value
                    </p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${contract.totalValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      ${contract.pricePerKg}/kg
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span>Contact</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ActiveContracts;
