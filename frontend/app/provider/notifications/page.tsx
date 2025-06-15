"use client"

import { Bell, CheckCircle, AlertCircle, Info, Clock, Calendar, DollarSign } from 'lucide-react'
import { useRouter } from 'next/navigation'

const providerNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'New Booking Request',
    message: 'John Smith has requested your service for home cleaning tomorrow at 2 PM',
    time: '2 hours ago',
    icon: <Calendar className="w-5 h-5 text-green-500" />
  },
  {
    id: 2,
    type: 'alert',
    title: 'Payment Received',
    message: 'You have received a payment of $150 for the cleaning service',
    time: '5 hours ago',
    icon: <DollarSign className="w-5 h-5 text-yellow-500" />
  },
  {
    id: 3,
    type: 'info',
    title: 'Service Reminder',
    message: 'You have a scheduled service with Sarah Johnson in 30 minutes',
    time: '30 minutes ago',
    icon: <Clock className="w-5 h-5 text-blue-500" />
  },
  {
    id: 4,
    type: 'success',
    title: 'New Review',
    message: 'You received a 5-star review from Michael Brown',
    time: '1 day ago',
    icon: <CheckCircle className="w-5 h-5 text-green-500" />
  }
]

export default function ProviderNotificationsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 pt-16">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Bell className="w-6 h-6 text-gray-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Provider Notifications</h1>
            </div>
            <button
              onClick={() => router.push('/provider/dashboard')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {providerNotifications.map((notification) => (
              <div
                key={notification.id}
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="mt-1">{notification.icon}</div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{notification.title}</h3>
                    <span className="text-xs sm:text-sm text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 