"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import { Bell, Check, Trash2, Filter, Clock, Package, User, AlertCircle } from "lucide-react"

const Notifications = () => {
  const [filter, setFilter] = useState("all")

  const notifications = [
    {
      id: 1,
      type: "contract",
      title: "New Contract Request",
      message: "Metro Fresh Markets has requested a contract for 300kg of Organic Lettuce",
      time: "2 hours ago",
      read: false,
      icon: Package,
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30",
    },
    {
      id: 2,
      type: "order",
      title: "Order Delivered",
      message: "Your order of Sweet Corn (500kg) has been successfully delivered",
      time: "4 hours ago",
      read: false,
      icon: Check,
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-100 dark:bg-green-900/30",
    },
    {
      id: 3,
      type: "system",
      title: "Price Alert",
      message: "Tomato prices have increased by 15% in your region",
      time: "6 hours ago",
      read: true,
      icon: AlertCircle,
      color: "text-orange-600 dark:text-orange-400",
      bgColor: "bg-orange-100 dark:bg-orange-900/30",
    },
    {
      id: 4,
      type: "message",
      title: "New Message",
      message: "Green Valley Farm sent you a message about your contract inquiry",
      time: "1 day ago",
      read: true,
      icon: User,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30",
    },
    {
      id: 5,
      type: "contract",
      title: "Contract Expiring Soon",
      message: "Your contract with City Supermarket expires in 3 days",
      time: "2 days ago",
      read: false,
      icon: Clock,
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-100 dark:bg-red-900/30",
    },
  ]

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true
    if (filter === "unread") return !notification.read
    return notification.type === filter
  })

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id) => {
    console.log("Marking notification as read:", id)
  }

  const deleteNotification = (id) => {
    console.log("Deleting notification:", id)
  }

  const markAllAsRead = () => {
    console.log("Marking all notifications as read")
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 ">
        <Topbar />

        <main className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Notifications</h1>
              <p className="text-gray-600 dark:text-gray-400">Stay updated with your latest activities</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>Mark All Read</span>
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <Bell className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{notifications.length}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{unreadCount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Package className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {notifications.filter((n) => n.type === "contract").length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Contracts</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <User className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {notifications.filter((n) => n.type === "message").length}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Messages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex space-x-2">
                {[
                  { value: "all", label: "All" },
                  { value: "unread", label: "Unread" },
                  { value: "contract", label: "Contracts" },
                  { value: "order", label: "Orders" },
                  { value: "message", label: "Messages" },
                  { value: "system", label: "System" },
                ].map((filterOption) => (
                  <button
                    key={filterOption.value}
                    onClick={() => setFilter(filterOption.value)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === filterOption.value
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon
              return (
                <div
                  key={notification.id}
                  className={`bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all hover:shadow-md ${
                    !notification.read ? "border-l-4 border-l-blue-500" : ""
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${notification.bgColor}`}>
                      <Icon className={`w-6 h-6 ${notification.color}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3
                            className={`text-lg font-semibold ${
                              !notification.read ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                            }`}
                          >
                            {notification.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mt-1">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                        </div>

                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {filteredNotifications.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg">No notifications found</p>
              <p className="text-gray-400 dark:text-gray-500">
                {filter === "unread" ? "You're all caught up!" : "Check back later for updates"}
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Notifications
