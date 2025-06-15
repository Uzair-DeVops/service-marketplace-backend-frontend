"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = async () => {
    try {
      const params = new URLSearchParams();
      params.append("grant_type", "");
      params.append("username", formData.email);
      params.append("password", formData.password);
      params.append("scope", "");
      params.append("client_id", "");
      params.append("client_secret", "");

      const response = await fetch("http://127.0.0.1:8000/api/users/login", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Login failed");
      }

      // Store user object and user ID in localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("userId", data.user_id);

      // Redirect to categories page
      router.push("/categories");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Login failed");
    }
  };

  const handleLogout = () => {
    // Clear any auth tokens/session
    console.log("Logging out");
    router.push("/");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-[#eaf2ff] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full mx-auto">
        {/* Centered Icon, Heading, and Subtitle */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Mail className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            Sign In to Your Account
          </h2>
          <p className="text-gray-600 text-center text-lg">
            Access your service marketplace account
          </p>
        </div>
        {/* Sign In Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-xl border border-gray-200">
          <div className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
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
            <div className="text-right">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password?
              </button>
            </div>
            {/* Sign In button */}
            <button
              onClick={handleSignIn}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
            {/* Sign up link */}
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button
                  onClick={() => router.push("/signup/customer")}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Sign Up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
