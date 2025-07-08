"use client"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { Calendar, MapPin, Package, User, Check, X, Eye } from "lucide-react"

const PendingContracts = () => {
  const pendingContracts = [
    {
      id: "PC-2024-001",
      buyer: "Metro Fresh Markets",
      crop: "Organic Lettuce",
      quantity: "300 kg",
      pricePerKg: 28,
      totalValue: 8400,
      requestedDate: "2024-02-01",
      deliveryDate: "2024-03-01",
      location: "California Valley",
      message: "Looking for premium quality organic lettuce for our chain of stores.",
      urgency: "High",
    },
    {
      id: "PC-2024-002",
      buyer: "Farm to Table Co.",
      crop: "Bell Peppers",
      quantity: "600 kg",
      pricePerKg: 32,
      totalValue: 19200,
      requestedDate: "2024-01-28",
      deliveryDate: "2024-02-28",
      location: "Texas Plains",
      message: "Need consistent supply for restaurant chain. Long-term partnership opportunity.",
      urgency: "Medium",
    },
    {
      id: "PC-2024-003",
      buyer: "Healthy Harvest Inc.",
      crop: "Cherry Tomatoes",
      quantity: "400 kg",
      pricePerKg: 42,
      totalValue: 16800,
      requestedDate: "2024-01-30",
      deliveryDate: "2024-03-05",
      location: "Florida Farms",
      message: "Premium cherry tomatoes needed for specialty grocery stores.",
      urgency: "Low",
    },
    {
      id: "PC-2024-004",
      buyer: "Green Valley Distributors",
      crop: "Spinach",
      quantity: "250 kg",
      pricePerKg: 24,
      totalValue: 6000,
      requestedDate: "2024-02-02",
      deliveryDate: "2024-02-25",
      location: "Oregon Fields",
      message: "Fresh spinach for local farmers market distribution.",
      urgency: "High",
    },
  ]

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "High":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
      case "Medium":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
      case "Low":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
      default:
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
    }
  }

  const handleAccept = (contractId) => {
    console.log("Accepting contract:", contractId)
    // Handle contract acceptance
  }

  const handleReject = (contractId) => {
    console.log("Rejecting contract:", contractId)
    // Handle contract rejection
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 ">
        <Topbar />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pending Contracts</h1>
            <p className="text-gray-600 dark:text-gray-400">Review and respond to buyer contract requests</p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Total Pending</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{pendingContracts.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Potential Value</h3>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${pendingContracts.reduce((sum, contract) => sum + contract.totalValue, 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">High Priority</h3>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {pendingContracts.filter((c) => c.urgency === "High").length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Avg. Value</h3>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                $
                {Math.round(
                  pendingContracts.reduce((sum, contract) => sum + contract.totalValue, 0) / pendingContracts.length,
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Pending Contracts List */}
          <div className="space-y-6">
            {pendingContracts.map((contract) => (
              <div
                key={contract.id}
                className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{contract.crop}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Request ID: {contract.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUrgencyColor(contract.urgency)}`}>
                      {contract.urgency} Priority
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Buyer</p>
                      <p className="font-medium text-gray-900 dark:text-white">{contract.buyer}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Package className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Quantity</p>
                      <p className="font-medium text-gray-900 dark:text-white">{contract.quantity}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Delivery Date</p>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {new Date(contract.deliveryDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                      <p className="font-medium text-gray-900 dark:text-white">{contract.location}</p>
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Buyer Message:</p>
                  <p className="text-gray-900 dark:text-white">{contract.message}</p>
                </div>

                {/* Contract Value and Actions */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Offered Value</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                      ${contract.totalValue.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500">${contract.pricePerKg}/kg</p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAccept(contract.id)}
                      className="flex items-center space-x-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      <span>Accept</span>
                    </button>
                    <button
                      onClick={() => handleReject(contract.id)}
                      className="flex items-center space-x-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <Eye className="w-4 h-4" />
                      <span>Details</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default PendingContracts
