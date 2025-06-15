"use client"

import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useRouter } from 'next/navigation'

const dummyNotifications = [
  {
    id: 1,
    type: 'success',
    title: 'Booking Confirmed',
    message: 'Your booking with John Doe has been confirmed for tomorrow at 2 PM',
    time: '2 hours ago',
    icon: <CheckCircle className="w-5 h-5 text-green-500" />
  },
  {
    id: 2,
    type: 'alert',
    title: 'Payment Reminder',
    message: 'Please complete the payment for your recent service booking',
    time: '5 hours ago',
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />
  },
  {
    id: 3,
    type: 'info',
    title: 'New Service Available',
    message: 'Check out our new premium cleaning service package',
    time: '1 day ago',
    icon: <Info className="w-5 h-5 text-blue-500" />
  }
]

export default function NotificationsPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#eaf2ff] pt-16">
      <div className="max-w-4xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-center mb-4 sm:mb-6">
          <h1 className="text-gray-900 text-xl sm:text-2xl font-bold">
            Notifications Page
          </h1>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-3 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Bell className="w-6 h-6 text-gray-600" />
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Notifications</h1>
            </div>
            <button
              onClick={() => router.push('/categories')}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto"
            >
              Back to Categories
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {dummyNotifications.map((notification) => (
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