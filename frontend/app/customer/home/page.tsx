"use client"

import { Search, Bell, User, Star, MapPin } from "lucide-react"

export default function CustomerHome() {
  const categories = [
    { name: "Cleaning", icon: "🧹", color: "bg-blue-100" },
    { name: "Plumbing", icon: "🔧", color: "bg-green-100" },
    { name: "Electrical", icon: "⚡", color: "bg-yellow-100" },
    { name: "Gardening", icon: "🌱", color: "bg-emerald-100" },
    { name: "Painting", icon: "🎨", color: "bg-purple-100" },
    { name: "Moving", icon: "📦", color: "bg-orange-100" },
  ]

  const featuredProviders = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "House Cleaning",
      rating: 4.9,
      reviews: 127,
      price: "$25/hr",
      distance: "2.3 km",
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      id: 2,
      name: "Mike Chen",
      service: "Plumbing",
      rating: 4.8,
      reviews: 89,
      price: "$45/hr",
      distance: "1.8 km",
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Good morning!</h1>
            <p className="text-gray-600">Find the perfect service for you</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 bg-gray-100 rounded-full">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 bg-gray-100 rounded-full">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-6 py-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="What service do you need?"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Categories</h2>
        <div className="grid grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              className="p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
            >
              <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <span className="text-2xl">{category.icon}</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{category.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Providers */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Featured Providers</h2>
        <div className="space-y-4">
          {featuredProviders.map((provider) => (
            <div key={provider.id} className="bg-white p-4 rounded-xl border border-gray-200">
              <div className="flex items-center space-x-4">
                <img
                  src={provider.image || "/placeholder.svg"}
                  alt={provider.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                  <p className="text-gray-600 text-sm">{provider.service}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{provider.rating}</span>
                      <span className="text-sm text-gray-500">({provider.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{provider.distance}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{provider.price}</p>
                  <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
