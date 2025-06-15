"use client"

import { Wrench, Sparkles, Zap, Paintbrush, Leaf, Droplet, LogOut, Heart, Star, MapPin, Search, Bell, User } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useEffect, useState } from "react"

const categories = [
  {
    name: "Home Repair", 
    slug: "home-repair",
    icon: <Wrench className="w-8 h-8" />,
    bg: "bg-blue-100",
    iconBg: "bg-blue-500",
    bgImage: "https://imgs.search.brave.com/evXly9DbLcPj17ZBsjNmAYsDqXhmoGDdn3GBhnN6JgY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/NTQ0OTYwMC9waG90/by9wbHVtYmVyLWV4/cGxhaW5pbmctdG8t/YS1jbGllbnQtdGhl/LXByb2JsZW0td2l0/aC1oZXIta2l0Y2hl/bi1zaW5rLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1LRkk4/Zjk3Tk9RQlNBTWdk/Ty1obGRWQTM5ckVT/ckQwN043T1pVMUxR/NnMwPQ"
  },
  {
    name: "Cleaning",
    slug: "cleaning", 
    icon: <Sparkles className="w-8 h-8" />,
    bg: "bg-green-100",
    iconBg: "bg-green-500",
    bgImage: "https://imgs.search.brave.com/xzdPYrpWoif6612VxY5heglL0RrgHg6Am3QwPVhrBtE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQx/NzgzMzIwMC9waG90/by9oYXBweS1wcm9m/ZXNzaW9uYWwtY2xl/YW5lcnMtY2xlYW5p/bmctYS1iYXRocm9v/bS1hdC1hbi1hcGFy/dG1lbnQuanBnP3M9/NjEyeDYxMiZ3PTAm/az0yMCZjPTk4c3VK/TnF3YVFubHpSZWls/Y2RjZkdEel9HN1FO/R1VtaGEyR20tNll6/dWc9"
  },
  {
    name: "Electrical",
    slug: "electrical",
    icon: <Zap className="w-8 h-8" />,
    bg: "bg-purple-100", 
    iconBg: "bg-purple-500",
    bgImage: "https://imgs.search.brave.com/McPpzouGgrw6isijdpShv6n_2RmWsWMgGImmoQ54DKU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/NzQ5MzAwNS9waG90/by9lbGVjdHJpY2lh/bi1pbnN0YWxsaW5n/LXNvbGFyLXBhbmVs/LXN5c3RlbS13aXJp/bmctaW52ZXJ0ZXIt/YW5kLWVsZWN0cmlj/LWJveC5qcGc_cz02/MTJ4NjEyJnc9MCZr/PTIwJmM9bDBpOWVJ/Y0daTExKLXN5QlZx/eWpSZG9WeGt3WEJn/X1ViUVdZMUx2UnRt/VT0"
  },
  {
    name: "Painting",
    slug: "painting",
    icon: <Paintbrush className="w-8 h-8" />,
    bg: "bg-pink-100",
    iconBg: "bg-pink-500",
    bgImage: "https://imgs.search.brave.com/yRBMgkRB0SrusztmZJKSKJb2or9ZNdyxy9GtKzRnVX8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQz/NDY0ODkwNy9waG90/by9tYW4tcGFpbnRp/bmctd2FsbC13aXRo/LWEtcm9sbGVyLWlu/LWhvbWUtcmVub3Zh/dGlvbi1wcm9qZWN0/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz16WURXNklxSlB4/Z1JUOTBVWWhYWVI0/ZHlGS25kcEppSDJr/ajZvQlhRZmt3PQ"
  },
  {
    name: "Gardening", 
    slug: "gardening",
    icon: <Leaf className="w-8 h-8" />,
    bg: "bg-yellow-100",
    iconBg: "bg-orange-400",
    bgImage: "https://imgs.search.brave.com/jbU_-m2oXcnL-e9RkUyWI-MVxI49dqUZIHHT-Kn-chg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ2/OTc2MDU5Mi9waG90/by9jYXVjYXNpYW4t/Z2FyZGVuLWFuZC1s/YW5kc2NhcGluZy1z/ZXJ2aWNlcy1jb250/cmFjdG9yLmpwZz9z/PTYxMng2MTImdz0w/Jms9MjAmYz1Ndkk4/TTlKUTdSNjFUSTVs/ZGZObnM0WnJiYjEx/TVJfeVVCMHlGc1Ni/MW8wPQ"
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    icon: <Droplet className="w-8 h-8" />,
    bg: "bg-teal-100",
    iconBg: "bg-teal-500",
    bgImage: "https://imgs.search.brave.com/8mG7iMZeU2kuNcI8UrpSkcgc5rXHIYftHtoUADO0Nk0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNTEz/MDU0MjE2L3Bob3Rv/L25vdy1pdC1zaG91/bGQtYmUtb2suanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPW9n/SGVSMTB6LU42LV9p/elI1S1JpekJDUXV1/RUsyWUdmQUt2dHVl/dTZQYVE9"
  },
]

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

export default function CategoriesPage() {
  const router = useRouter()
  const params = useParams()
  const category = params.category
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [email, setEmail] = useState("user@example.com")
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const [filteredCategories, setFilteredCategories] = useState(categories)




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
        // Only take the first 3 providers for the featured section
        setProviders(data.slice(0, 3))
      } catch (error) {
        console.error('Error fetching providers:', error)
        setError('Failed to load providers')
      } finally {
        setLoading(false)
      }
    }

    fetchProviders()
  }, [])

  const handleLogout = () => {
    // Clear any auth/session here
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#eaf2ff]">
      {/* Mobile Header */}
      <div className="md:hidden bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10 px-4 py-4">
        {/* Top row: profile and bell icons */}
        <div className="flex items-center justify-between mb-4">
          {/* Profile Icon */}
          <button
            className="flex items-center"
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          >
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-6 h-6 text-gray-600" />
            </div>
          </button>
          {/* Bell Icon */}
          <button
            className="flex items-center"
            onClick={() => router.push('/notifications')}
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
              placeholder="Search services..."
              className="pl-10 pr-4 h-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-base"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = categories.filter(cat =>
                  cat.name.toLowerCase().includes(searchTerm) ||
                  cat.slug.toLowerCase().includes(searchTerm)
                );
                setFilteredCategories(filtered.length > 0 ? filtered : categories);
              }}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
        {showProfileDropdown && (
          <div className="absolute left-4 top-16 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm text-gray-600">Signed in as</p>
              <p className="text-sm font-medium text-gray-900">{email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Desktop/Tablet Header (hidden on mobile) */}
      <div className="hidden md:flex items-center justify-between px-8 py-6 bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <h1 className="text-2xl font-bold text-gray-900">SYS AI PLATFORM</h1>
        <div className="flex items-center gap-6">
          <div className="relative">
            <input
              type="search" 
              placeholder="Search services..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                const filtered = categories.filter(cat => {
                  // Search in name and slug
                  return cat.name.toLowerCase().includes(searchTerm) ||
                         cat.slug.toLowerCase().includes(searchTerm);
                });
                setFilteredCategories(filtered.length > 0 ? filtered : categories);
              }}
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <button 
            className="relative"
            onClick={() => router.push('/notifications')}
          >
            <Bell className="w-6 h-6 text-gray-600 hover:text-gray-900" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </button>
          <button
            className="relative"
            onClick={() => router.push('/progress')}
          >
            <div className="w-8 h-8 text-gray-600 bg-[#E4E6EB] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M12 3v18M3 12h18M12 3l4 4M12 3l-4 4M12 21l4-4M12 21l-4-4" />
              </svg>
            </div>
          </button>
          <div className="relative group">
            <button 
              className="flex items-center gap-2"
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </div>
            </button>
            <div className={`absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 ${showProfileDropdown ? 'block' : 'hidden'}`}>
              <div className="px-4 py-2 border-b border-gray-200">
                <p className="text-sm text-gray-600">Signed in as</p>
                <p className="text-sm font-medium text-gray-900">user@example.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories Header */}
      <div className="flex items-center justify-between max-w-5xl mx-auto px-4 pt-12 pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Service Categories</h1>
        <button
          className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          onClick={() => router.push('/categories/all_categories')}
        >
          See all
        </button>
      </div>

      {/* Categories Grid */}
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredCategories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => router.push(`/categories/${cat.slug}`)}
            className="relative rounded-2xl shadow-md overflow-hidden group cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-xl"
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${cat.bgImage})` }}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-200" />
            </div>
            
            {/* Content */}
            <div className="relative p-8 flex flex-col items-center justify-center min-h-[200px]">
              <div className={`mb-4 rounded-xl p-4 shadow ${cat.iconBg} text-white flex items-center justify-center`}>
                {cat.icon}
              </div>
              <div className="text-lg font-semibold text-white text-center">{cat.name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Providers */}
      <div className="max-w-6xl mx-auto px-4 py-7">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">Featured Providers</h2>
          <button
            onClick={() => router.push('/categories/all_providers')}
            className="text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            View all
          </button>
        </div>

        {loading ? (
          <div className="text-center text-gray-600">Loading providers...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
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
        )}
      </div>
    </div>
  )
}