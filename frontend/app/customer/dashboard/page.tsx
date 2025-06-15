"use client"

import { Search, Bell, User, Star, MapPin, Filter, Heart } from "lucide-react"
import ServiceCategories from "../../components/service-categories"

export default function CustomerDashboard() {
  const featuredProviders = [
    {
      id: 1,
      name: "Sarah Johnson",
      service: "House Cleaning",
      rating: 4.9,
      reviews: 127,
      price: "$25/hr",
      distance: "2.3 km",
      image: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    {
      id: 2,
      name: "Mike Chen",
      service: "Plumbing",
      rating: 4.8,
      reviews: 89,
      price: "$45/hr",
      distance: "1.8 km",
      image: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
    {
      id: 3,
      name: "Emma Davis",
      service: "Electrical Work",
      rating: 4.9,
      reviews: 156,
      price: "$55/hr",
      distance: "3.1 km",
      image: "/placeholder.svg?height=80&width=80",
      verified: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Good morning! 👋</h1>
              <p className="text-gray-600">Find the perfect service for you</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-3 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="What service do you need?"
              className="w-full pl-12 pr-16 py-4 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg transition-all duration-300"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-xl hover:from-blue-500 hover:to-blue-700 transition-all duration-300">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Service Categories */}
        <div className="mb-12">
          <ServiceCategories />
        </div>

        {/* Featured Providers */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Featured Providers</h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors">
              View all
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProviders.map((provider) => (
              <div
                key={provider.id}
                className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={provider.image || "/placeholder.svg"}
                        alt={provider.name}
                        className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                      />
                      {provider.verified && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-lg">{provider.name}</h3>
                      <p className="text-gray-600">{provider.service}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                    <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                  </button>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{provider.rating}</span>
                      <span className="text-gray-500 text-sm">({provider.reviews})</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-500 text-sm">{provider.distance}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{provider.price}</p>
                    <p className="text-gray-500 text-sm">Starting price</p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
