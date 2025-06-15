"use client";

import { useState } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  ArrowLeft,
  Upload,
  X,
} from "lucide-react";

export default function BookingPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const providerId = searchParams.get("provider_id");
  const userId = searchParams.get("user_id");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);

  const handleBack = () => {
    router.back();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (images.length + files.length > 3) {
      setError("You can only upload up to 3 images");
      return;
    }
    setImages((prev) => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      // Validate required fields
      if (!formData.date || !formData.time || !formData.location) {
        throw new Error("Please fill in all required fields");
      }
      if (!providerId) {
        throw new Error(
          "Provider not specified. Please return to the provider page and try again."
        );
      }
      if (!userId) {
        throw new Error(
          "User not specified. Please return to the user page and try again."
        );
      }

      // Create FormData object to handle file uploads
      const bookingFormData = new FormData();
      bookingFormData.append("provider_id", providerId);
      bookingFormData.append("user_id", userId);
      bookingFormData.append("date", formData.date);
      bookingFormData.append("time", formData.time);
      bookingFormData.append("location", formData.location);
      bookingFormData.append("description", formData.description);

      // Append images if any
      images.forEach((image) => {
        bookingFormData.append("images", image);
      });

      // Make API call to save the booking using /me endpoint
      const response = await fetch("http://127.0.0.1:8000/api/me/bookings", {
        method: "POST",
        body: bookingFormData,
        credentials: "include", // This ensures cookies are sent
      });

      if (response.status === 401) {
        throw new Error("Please login to make a booking");
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      setSuccess(true);
      // Clear form after successful submission
      setFormData({
        date: "",
        time: "",
        location: "",
        description: "",
      });
      setImages([]);

      // Show success message for 3 seconds then redirect
      setTimeout(() => {
        router.push("/categories");
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      if (
        err instanceof Error &&
        err.message === "Please login to make a booking"
      ) {
        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Book Service
            </h1>
            <p className="text-sm text-gray-600">
              Fill in the details to book your service
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Successful!
              </h2>
              <p className="text-gray-600">
                Your request has been sent to the provider.
              </p>
              <p className="text-gray-600 mt-2">
                You will receive a confirmation provider will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Date */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Time
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    value={formData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Upload Images (Max 3)
                </label>
                <div className="space-y-3">
                  {/* Image Preview Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {images.length < 3 && (
                      <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-green-500 transition-colors">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Upload className="w-6 h-6 text-gray-400" />
                      </label>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter any additional details or requirements"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 min-h-[100px]"
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting..." : "Book Service"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
