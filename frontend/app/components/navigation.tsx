"use client"

import { useRouter } from "next/navigation"
import { User, LogOut } from "lucide-react"

export default function Navigation() {
  const router = useRouter()
  const currentProvider = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentProvider') || 'null') : null

  const handleLogout = () => {
    localStorage.removeItem('currentProvider')
    router.push('/')
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
              Service<span className="text-green-600">Hub</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            {currentProvider ? (
              <>
                <button 
                  onClick={() => router.push('/provider/dashboard')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-gradient-to-br from-red-400 to-red-600 rounded-xl hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => router.push('/signup/provider/signin')}
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium"
                >
                  Provider Sign In
                </button>
                <button 
                  onClick={() => router.push('/signup/provider')}
                  className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Become a Provider
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 