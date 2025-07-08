"use client"

import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Topbar from "../components/Topbar"
import { Minus, Plus, Trash2, ShoppingBag, CreditCard, MapPin } from "lucide-react"

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      farmer: "Green Valley Farm",
      pricePerKg: 35,
      quantity: 10,
      image: "/placeholder.svg?height=80&width=80",
      location: "California Valley",
      availability: "In Stock",
    },
    {
      id: 2,
      name: "Sweet Corn",
      farmer: "Valley Fresh",
      pricePerKg: 18,
      quantity: 15,
      image: "/placeholder.svg?height=80&width=80",
      location: "Iowa Valley",
      availability: "Limited",
    },
    {
      id: 3,
      name: "Fresh Carrots",
      farmer: "Sunrise Agriculture",
      pricePerKg: 22,
      quantity: 8,
      image: "/placeholder.svg?height=80&width=80",
      location: "Oregon Fields",
      availability: "In Stock",
    },
  ])

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.pricePerKg * item.quantity, 0)
  const deliveryFee = 25
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />

      <div className="flex-1 ">
        <Topbar />

        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
            <p className="text-gray-600 dark:text-gray-400">Review your selected items before checkout</p>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-400 dark:text-gray-500 mb-6">Add some fresh crops to get started</p>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                Browse Crops
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Cart Items ({cartItems.length})
                  </h2>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">by {item.farmer}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <MapPin className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{item.location}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                item.availability === "In Stock"
                                  ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                                  : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400"
                              }`}
                            >
                              {item.availability}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
                              {item.quantity}kg
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="font-semibold text-gray-900 dark:text-white">
                              ${(item.pricePerKg * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-500">${item.pricePerKg}/kg</p>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Order Summary</h2>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-medium text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Delivery Fee</span>
                      <span className="font-medium text-gray-900 dark:text-white">${deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                      <span className="font-medium text-gray-900 dark:text-white">${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
                        <span className="text-lg font-bold text-green-600 dark:text-green-400">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Proceed to Checkout</span>
                  </button>
                </div>

                {/* Delivery Info */}
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Delivery Information</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">• Free delivery on orders over $500</p>
                    <p className="text-gray-600 dark:text-gray-400">• Estimated delivery: 2-3 business days</p>
                    <p className="text-gray-600 dark:text-gray-400">• Fresh guarantee on all produce</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Cart
