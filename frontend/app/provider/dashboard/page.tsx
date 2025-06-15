"use client"

import { Search, Bell, User, Star, MapPin, Calendar, DollarSign, Clock, LogOut } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface Provider {
  business_name: string
  service_type: string
  hourly_rate: string
  location: string
  working_hours: string
  email: string
  profile_photo: string
}

interface Booking {
  id: number
  providerId: number
  customerName: string
  service: string
  date: string
  duration: string
  price: string
  status: string
}

interface Review {
  id: number
  providerId: number
  customerName: string
  rating: number
  comment: string
  date: string
}

export default function ProviderDashboard() {
  const router = useRouter()
  const [provider, setProvider] = useState<Provider | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProviderData = async () => {
      try {
        const token = localStorage.getItem('accessToken')
        const providerId = localStorage.getItem('providerId')
        
        if (!token || !providerId) {
          router.push('/signup/provider/signin')
          return
        }

        const response = await fetch(`http://127.0.0.1:8000/api/providers/${providerId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'accept': 'application/json'
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch provider data')
        }

        const data = await response.json()
        setProvider(data)
      } catch (error) {
        console.error('Error fetching provider data:', error)
        router.push('/signup/provider/signin')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProviderData()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('currentProvider')
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-700">Loading...</div>
      </div>
    )
  }

  if (!provider) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 px-4 py-4 relative">
        {/* Top row: progress and bell icons */}
        <div className="flex items-center justify-between mb-4">
          {/* Progress Icon (left) */}
          <button
            className="flex items-center"
            onClick={() => router.push('/provider/dashboard/progress')}
          >
            <div className="w-9 h-9 text-gray-600 bg-[#E4E6EB] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M12 3v18M3 12h18M12 3l4 4M12 3l-4 4M12 21l4-4M12 21l-4-4" />
              </svg>
            </div>
          </button>
          {/* Bell Icon (right) */}
          <button
            className="flex items-center"
            onClick={() => router.push('/provider/notifications')}
          >
            <div className="w-9 h-9 text-gray-600 bg-[#E4E6EB] rounded-full flex items-center justify-center relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
          </button>
        </div>
        {/* Search Input centered below */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full text-base"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                // Add your search/filter logic here
              }}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>

      {/* Desktop/Tablet Header (hidden on mobile) */}
      <div className="hidden md:block">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-500">
                  {provider.profile_photo ? (
                    <img 
                      src={`http://127.0.0.1:8000${provider.profile_photo}`} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                    Welcome back! 👋
                  </h1>
                  <p className="text-gray-600">{provider.business_name} - {provider.service_type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="search" 
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onChange={(e) => {
                      const searchTerm = e.target.value.toLowerCase();
                      // Filter provider data based on search term
                      const filteredResults = provider.business_name.toLowerCase().includes(searchTerm) ||
                                           provider.service_type.toLowerCase().includes(searchTerm) ||
                                           provider.location.toLowerCase().includes(searchTerm);
                      
                      // Update UI to show filtered results
                      if (filteredResults) {
                        // Show matching provider data
                        console.log("Found matches:", filteredResults);
                      } else {
                        // Show "no results found" message
                        console.log("No matches found");
                      }
                    }}
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                </div>
                <button 
                  onClick={() => router.push('/provider/notifications')}
                  className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg"
                >
                  <Bell className="w-5 h-5 text-gray-600" />
                </button>
                <button
                className="p-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-lg"
                onClick={() => router.push('/provider/dashboard/progress')}>
              <div className="w-5 h-5 text-gray-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path d="M12 3v18M3 12h18M12 3l4 4M12 3l-4 4M12 21l4-4M12 21l-4-4" />
                </svg>
              </div>
            </button>
                <button 
                  onClick={handleLogout}
                  className="p-3 bg-gradient-to-br from-red-400 to-red-600 rounded-xl hover:from-red-500 hover:to-red-700 transition-all duration-300 shadow-lg"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Provider Info Card */}
        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Business Information</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Business Name:</span> {provider.business_name}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Service Type:</span> {provider.service_type}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Hourly Rate:</span> ${provider.hourly_rate}/hr
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Location:</span> {provider.location}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Working Hours:</span> {provider.working_hours}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {provider.email}
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Today's Earnings</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  ${bookings
                    .filter(booking => booking.status === "confirmed")
                    .reduce((total, booking) => total + parseInt(booking.price.replace('$', '')), 0)}
                </h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Upcoming Bookings</p>
                <h3 className="text-2xl font-bold text-gray-900">{bookings.length}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Average Rating</p>
                <h3 className="text-2xl font-bold text-gray-900">
                  {reviews.length > 0
                    ? (reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1)
                    : "0.0"}
                </h3>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Bookings */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Upcoming Bookings</h2>
            <button className="text-green-600 hover:text-green-700 font-semibold">View all</button>
          </div>
          <div className="space-y-4">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{booking.customerName}</h3>
                        <p className="text-gray-600">{booking.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{booking.price}</p>
                      <p className="text-sm text-gray-500">{booking.duration}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{booking.date}</span>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">No upcoming bookings.</div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Reviews</h2>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-gray-900">{review.customerName}</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm text-gray-500">{review.rating}.0</span>
                    </div>
                  </div>
                  <div className="text-gray-700 mb-1">{review.comment}</div>
                  <div className="text-xs text-gray-500">{review.date}</div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-600">No reviews yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}