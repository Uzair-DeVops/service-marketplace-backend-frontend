"use client"

import { Heart, Star, MapPin } from "lucide-react"
import { useEffect, useState } from "react"

interface Provider {
  id: string
  business_name: string
  service_type: string
  hourly_rate: string
  location: string
  working_hours: string
  profile_photo: string
  email: string
}

export default function AllProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/providers", {
          headers: {
            'accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch providers')
        }

        const data = await response.json()
        setProviders(data)
      } catch (error) {
        console.error('Error fetching providers:', error)
        setError('Failed to load providers')
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#eaf2ff] py-12 px-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-gray-600">Loading providers...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#eaf2ff] py-12 px-2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#eaf2ff] py-12 px-2">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Providers</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => (
            <div
              key={provider.id}
              className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <img
                      src={`http://127.0.0.1:8000${provider.profile_photo}`}
                      alt={provider.business_name}
                      className="w-16 h-16 rounded-2xl object-cover shadow-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{provider.business_name}</h3>
                    <p className="text-gray-600">{provider.service_type}</p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                  <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-500 text-sm">{provider.location}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">${provider.hourly_rate}/hr</p>
                  <p className="text-gray-500 text-sm">Starting price</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
