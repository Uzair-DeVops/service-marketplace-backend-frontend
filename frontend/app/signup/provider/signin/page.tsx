"use client"

import { useState } from "react"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProviderSignin() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignin = async () => {
    try {
      setLoading(true)
      setError("")

      const params = new URLSearchParams()
      params.append('grant_type', '')
      params.append('username', formData.username)
      params.append('password', formData.password)
      params.append('scope', '')
      params.append('client_id', '')
      params.append('client_secret', '')

      const response = await fetch("http://127.0.0.1:8000/api/providers/login", {
        method: "POST",
        headers: {
          "accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: params.toString()
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || "Login failed")
      }

      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('providerId', data.provider_id)
      router.push("/provider/dashboard")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
      {/* Top section: Icon, Heading, Subheading */}
      <div className="flex flex-col items-center mb-8 mt-8">
        <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
          <Mail className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Sign In to Your Account</h2>
        <p className="text-gray-600 text-center text-lg">Access your service marketplace account</p>
      </div>
      {/* Card */}
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-2xl p-8">
        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center">
            {error}
          </div>
        )}
        {/* Form */}
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>
          {/* Password */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-gray-400" />
                ) : (
                  <Eye className="w-4 h-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="#" className="text-green-600 hover:underline text-sm font-medium">Forgot Password?</a>
          </div>
          {/* Sign in button */}
          <button
            onClick={handleSignin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        {/* Sign up link */}
        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <a href="/signup/provider" className="text-green-600 font-semibold hover:underline">Sign Up</a>
        </p>
      </div>
    </div>
  )
} 