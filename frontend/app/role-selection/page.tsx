"use client"

import { Shield, Star, Clock, Users, Briefcase, ArrowRight, ArrowLeft } from "lucide-react"

export default function RoleSelection() {
  const handleCustomerSelect = () => {
    window.location.href = "/signup/customer/signin"
  }

  const handleProviderSelect = () => {
    window.location.href = "/signup/provider/signin"
  }

  const handleSignIn = () => {
    window.location.href = "/signin"
  }

  const handleBack = () => {
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-4">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-2">
              Service<span className="text-blue-600">Hub</span>
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto">Your trusted marketplace for services</p>
          </div>

          {/* Feature badges */}
          <div className="flex sm:flex-row justify-center items-center gap-6 lg:gap-12 mb-4">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Shield className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <span className="text-sm lg:text-base font-medium text-gray-700">Verified</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Star className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <span className="text-sm lg:text-base font-medium text-gray-700">Rated</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Clock className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
              </div>
              <span className="text-sm lg:text-base font-medium text-gray-700">Fast</span>
            </div>
          </div>

          {/* Role selection title */}
          <div className="text-center mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">How would you like to get started?</h2>
            <p className="text-lg text-gray-600">Choose your role to continue</p>
          </div>

          {/* Role options */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-8 lg:mb-12">
            {/* Customer option */}
            <button
              onClick={handleCustomerSelect}
              className="group p-6 lg:p-8 bg-white/80 backdrop-blur-sm border-2 border-blue-200 rounded-2xl lg:rounded-3xl hover:border-blue-400 hover:bg-white transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Users className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">I'm a Customer</h3>
                <p className="text-gray-600 mb-4 lg:mb-6">Looking for services and professionals</p>
                <ul className="text-sm lg:text-base text-gray-500 space-y-2 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Browse service categories
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Compare providers
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Book services instantly
                  </li>
                </ul>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors mt-4 lg:mt-6" />
              </div>
            </button>

            {/* Provider option */}
            <button
              onClick={handleProviderSelect}
              className="group p-6 lg:p-8 bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-2xl lg:rounded-3xl hover:border-green-400 hover:bg-white transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 lg:mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Briefcase className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">I'm a Provider</h3>
                <p className="text-gray-600 mb-4 lg:mb-6">Offering services to customers</p>
                <ul className="text-sm lg:text-base text-gray-500 space-y-2 text-left">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Showcase your skills
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Manage bookings
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                    Grow your business
                  </li>
                </ul>
                <ArrowRight className="w-6 h-6 text-gray-400 group-hover:text-green-600 transition-colors mt-4 lg:mt-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
