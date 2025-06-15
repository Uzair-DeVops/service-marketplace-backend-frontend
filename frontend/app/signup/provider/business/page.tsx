"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Building2, Clock, MapPin, DollarSign, Wrench, Image as ImageIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BusinessDetails() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [providerId, setProviderId] = useState("")
  const [formData, setFormData] = useState({
    business_name: "",
    service_type: "",
    hourly_rate: "",
    location: "",
    working_hours: "",
    sa_front_id: null as File | null,
    sa_back_id: null as File | null,
    profile_photo: null as File | null,
  })
  const [previews, setPreviews] = useState({
    sa_front_id: "",
    sa_back_id: "",
    profile_photo: "",
  })

  useEffect(() => {
    const id = localStorage.getItem('providerId')
    if (!id) {
      router.push('/signup/provider')
      return
    }
    setProviderId(id)
  }, [router])

  const handleBack = () => {
    router.push("/signup/provider")
  }

  const handleInputChange = (field: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageChange = (field: string, file: File | null) => {
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError("Please upload only image files")
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size should be less than 5MB")
        return
      }

      // Create preview URL
      const previewUrl = URL.createObjectURL(file)
      setPreviews(prev => ({ ...prev, [field]: previewUrl }))
      handleInputChange(field, file)
    } else {
      setPreviews(prev => ({ ...prev, [field]: "" }))
      handleInputChange(field, null)
    }
  }

  const handleSubmit = async () => {
    try {
      setLoading(true)
      setError("")

      // Validate required fields
      if (!formData.business_name || !formData.service_type || !formData.hourly_rate || 
          !formData.location || !formData.working_hours) {
        throw new Error("Please fill in all required fields")
      }

      // Validate required images
      if (!formData.sa_front_id || !formData.sa_back_id || !formData.profile_photo) {
        throw new Error("Please upload all required images")
      }

      const formDataToSend = new FormData()
      formDataToSend.append('business_name', formData.business_name)
      formDataToSend.append('service_type', formData.service_type)
      formDataToSend.append('hourly_rate', formData.hourly_rate)
      formDataToSend.append('location', formData.location)
      formDataToSend.append('working_hours', formData.working_hours)
      
      if (formData.sa_front_id) {
        formDataToSend.append('sa_front_id', formData.sa_front_id)
      }
      if (formData.sa_back_id) {
        formDataToSend.append('sa_back_id', formData.sa_back_id)
      }
      if (formData.profile_photo) {
        formDataToSend.append('profile_photo', formData.profile_photo)
      }

      const response = await fetch(`http://127.0.0.1:8000/api/providers/${providerId}/business-details`, {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formDataToSend
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Failed to save business details")
      }

      // Store business details in localStorage
      localStorage.setItem('providerBusinessDetails', JSON.stringify({
        business_name: formData.business_name,
        service_type: formData.service_type,
        hourly_rate: formData.hourly_rate,
        location: formData.location,
        working_hours: formData.working_hours
      }))

      // Clear the provider ID as it's no longer needed
      localStorage.removeItem('providerId')
      
      // Show success message and redirect to dashboard
      alert("Registration completed successfully!")
      router.push("/provider/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Cleanup preview URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(previews).forEach(url => {
        if (url) URL.revokeObjectURL(url)
      })
    }
  }, [previews])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Business Details</h1>
            <p className="text-sm text-gray-600">Step 2 of 2</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Business Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your business name"
                  value={formData.business_name}
                  onChange={(e) => handleInputChange("business_name", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service Type</label>
              <div className="relative">
                <Wrench className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={formData.service_type}
                  onChange={(e) => handleInputChange("service_type", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                >
                  <option value="">Select a service type</option>
                  <option value="Home Repair">Home Repair</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Carpentry">Carpentry</option>
                  <option value="Painting">Painting</option>
                  <option value="Gardening">Gardening</option>
                </select>
              </div>
            </div>

            {/* Hourly Rate */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate ($)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  placeholder="Enter your hourly rate"
                  value={formData.hourly_rate}
                  onChange={(e) => handleInputChange("hourly_rate", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter your location"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Working Hours</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g., 9 AM to 5 PM"
                  value={formData.working_hours}
                  onChange={(e) => handleInputChange("working_hours", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>

            {/* ID Card Front */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ID Card Front</label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange("sa_front_id", e.target.files?.[0] || null)}
                  className="w-full py-2"
                />
                {previews.sa_front_id && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={previews.sa_front_id}
                      alt="ID Card Front Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* ID Card Back */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">ID Card Back</label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange("sa_back_id", e.target.files?.[0] || null)}
                  className="w-full py-2"
                />
                {previews.sa_back_id && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={previews.sa_back_id}
                      alt="ID Card Back Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Photo */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Photo</label>
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange("profile_photo", e.target.files?.[0] || null)}
                  className="w-full py-2"
                />
                {previews.profile_photo && (
                  <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                    <img
                      src={previews.profile_photo}
                      alt="Profile Photo Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Saving Details..." : "Complete Registration"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 