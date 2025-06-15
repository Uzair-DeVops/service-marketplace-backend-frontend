"use client"

import { Wrench, Sparkles, Zap, Paintbrush, Leaf, Droplets } from "lucide-react"

export default function ServiceCategories() {
  const categories = [
    {
      name: "Home Repair",
      icon: Wrench,
      gradient: "from-blue-400 to-blue-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
    },
    {
      name: "Cleaning",
      icon: Sparkles,
      gradient: "from-green-400 to-green-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:bg-green-100",
    },
    {
      name: "Electrical",
      icon: Zap,
      gradient: "from-purple-400 to-purple-600",
      bgColor: "bg-purple-50",
      hoverColor: "hover:bg-purple-100",
    },
    {
      name: "Painting",
      icon: Paintbrush,
      gradient: "from-pink-400 to-pink-600",
      bgColor: "bg-pink-50",
      hoverColor: "hover:bg-pink-100",
    },
    {
      name: "Gardening",
      icon: Leaf,
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:bg-yellow-100",
    },
    {
      name: "Plumbing",
      icon: Droplets,
      gradient: "from-teal-400 to-teal-600",
      bgColor: "bg-teal-50",
      hoverColor: "hover:bg-teal-100",
    },
  ]

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Service Categories</h2>
        <button className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors">See all</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {categories.map((category, index) => (
          <button
            key={index}
            className={`group p-6 lg:p-8 ${category.bgColor} ${category.hoverColor} rounded-2xl lg:rounded-3xl transition-all duration-300 hover:shadow-xl hover:scale-105 border border-gray-100`}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <category.icon className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <h3 className="text-sm lg:text-base font-semibold text-gray-900 leading-tight">{category.name}</h3>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
