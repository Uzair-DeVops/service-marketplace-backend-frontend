"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, CheckCircle2, AlertCircle, User, MapPin, DollarSign } from "lucide-react"

const dummyProviderStatuses = [
  {
    id: 1,
    service: "Home Repair",
    client: "Sarah Johnson",
    status: "completed",
    date: "2024-03-15",
    time: "10:00 AM",
    location: "123 Main St, Apt 4B",
    amount: "$150",
    description: "Fixed leaking kitchen sink and replaced faucet"
  },
  {
    id: 2,
    service: "Electrical",
    client: "Mike Brown",
    status: "in_progress",
    date: "2024-03-20",
    time: "2:30 PM",
    location: "456 Oak Ave, Unit 7",
    amount: "$200",
    description: "Installing new ceiling fan in living room"
  },
  {
    id: 3,
    service: "Cleaning",
    client: "Emma Wilson",
    status: "scheduled",
    date: "2024-03-25",
    time: "9:00 AM",
    location: "789 Pine Rd, Suite 12",
    amount: "$120",
    description: "Deep cleaning of entire apartment"
  }
]

export default function ProviderProgressPage() {
  const router = useRouter()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-6 h-6 text-green-500" />
      case "in_progress":
        return <Clock className="w-6 h-6 text-blue-500" />
      case "scheduled":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      default:
        return ""
    }
  }

  return (
    <div className="min-h-screen bg-[#eaf2ff] p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Dashboard</span>
        </button>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Service Progress</h1>

        <div className="space-y-6">
          {dummyProviderStatuses.map((status) => (
            <div
              key={status.id}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {getStatusIcon(status.status)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{status.service}</h3>
                    <div className="flex items-center gap-2 text-gray-600">
                      <User className="w-4 h-4" />
                      <span>{status.client}</span>
                    </div>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status.status)}`}>
                  {status.status.replace("_", " ")}
                </span>
              </div>
              
              <div className="mt-4 pl-10 space-y-3">
                <p className="text-gray-700">{status.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{status.date} at {status.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <MapPin className="w-4 h-4" />
                    <span>{status.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <DollarSign className="w-4 h-4" />
                    <span>{status.amount}</span>
                  </div>
                </div>

                {status.status === "scheduled" && (
                  <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      Accept
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
                      Reschedule
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
