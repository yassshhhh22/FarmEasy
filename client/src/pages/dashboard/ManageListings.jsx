"use client"

import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import Topbar from "../../components/Topbar"
import { Edit, Trash2, Eye, Plus, Search, Filter } from "lucide-react"

const ManageListings = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  const listings = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      quantity: "500 kg",
      pricePerKg: 35,
      status: "Active",
      views: 124,
      inquiries: 8,
      dateAdded: "2024-01-15",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 2,
      name: "Sweet Corn",
      category: "Vegetables",
      quantity: "800 kg",
      pricePerKg: 18,
      status: "Active",
      views: 89,
      inquiries: 5,
      dateAdded: "2024-01-20",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 3,
      name: "Fresh Carrots",
      category: "Vegetables",
      quantity: "300 kg",
      pricePerKg: 22,
      status: "Sold Out",
      views: 156,
      inquiries: 12,
      dateAdded: "2024-01-10",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: 4,
      name: "Premium Rice",
      category: "Grains",
      quantity: "1000 kg",
      pricePerKg: 48,
      status: "Draft",
      views: 0,
      inquiries: 0,
      dateAdded: "2024-01-25",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
      case "Sold Out":
        return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
      case "Draft":
        return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
      default:
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
    }
  }

  const filteredListings = listings.filter((listing) => {
    const matchesSearch = listing.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || listing.status.toLowerCase() === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 ">
        <Topbar />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Manage Listings</h1>
              <p className="text-gray-600 dark:text-gray-400">View and manage your crop listings</p>
            </div>
            <button className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              <span>Add New Listing</span>
            </button>
          </div>

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
                    <option value="sold out">Sold Out</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                Showing {filteredListings.length} of {listings.length} listings
              </div>
            </div>
          </div>

          {/* Listings Table */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <tr>
                    <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">Product</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">Category</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">Quantity</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">Price/kg</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">Status</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">Performance</th>
                    <th className="text-left py-3 px-6 font-medium text-gray-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-3">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{listing.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Added {new Date(listing.dateAdded).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">{listing.category}</td>
                      <td className="py-4 px-6 text-gray-900 dark:text-white">{listing.quantity}</td>
                      <td className="py-4 px-6">
                        <span className="font-semibold text-green-600 dark:text-green-400">${listing.pricePerKg}</span>
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(listing.status)}`}
                        >
                          {listing.status}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm">
                          <p className="text-gray-900 dark:text-white">{listing.views} views</p>
                          <p className="text-gray-600 dark:text-gray-400">{listing.inquiries} inquiries</p>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
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

          {filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">No listings found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default ManageListings
