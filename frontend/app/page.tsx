"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function LandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Beautiful service-related images for the carousel
  const carouselImages = [
    {
      url: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Professional Home Services",
      subtitle: "Expert technicians at your doorstep",
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Trusted Service Providers",
      subtitle: "Verified professionals you can rely on",
    },
    {
      url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      title: "Quality Guaranteed",
      subtitle: "Premium services with satisfaction guarantee",
    }
  ]

  // Auto-rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [carouselImages.length])

  const handleGetStarted = () => {
    window.location.href = "/role-selection"
  }

  const goToPrevious = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? carouselImages.length - 1 : currentImageIndex - 1)
  }

  const goToNext = () => {
    setCurrentImageIndex(currentImageIndex === carouselImages.length - 1 ? 0 : currentImageIndex + 1)
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${image.url}')`,
              }}
            />
          </div>
        ))}
      </div>


      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Experience Premium
            <br />
            <span className="text-blue-400">Service Excellence</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
            {carouselImages[currentImageIndex].subtitle}
          </p>

          {/* Feature Pills */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12">
            <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 w-full sm:w-auto text-center">
              ✨ Verified Professionals
            </div>
            <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 w-full sm:w-auto text-center">
              ⚡ Instant Booking
            </div>
            <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full border border-white/30 w-full sm:w-auto text-center">
              🛡️ Quality Guaranteed
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold text-xl px-12 py-6 rounded-2xl transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transform"
          >
            Get Started
            <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}
