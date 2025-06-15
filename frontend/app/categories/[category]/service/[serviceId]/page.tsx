"use client";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";

// Updated mockServices with full details
const mockServices: { [key: string]: Array<{
  id: number;
  name: string;
  workerName: string;
  shortDescription: string;
  longDescription: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  phone: string;
  email: string;
}> } = {
  "home-repair": [
    {
      id: 1,
      name: "Door Fixing",
      workerName: "John Doe",
      shortDescription: "Expert door repair and installation services.",
      longDescription: "We provide professional door repair, installation, and maintenance for all types of doors. Our experienced technicians ensure quality and safety for your home.",
      price: "$40/hr",
      rating: 4.8,
      reviews: 52,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 123-4567",
      email: "john.doe@example.com"
    },
    {
      id: 2,
      name: "Window Repair",
      workerName: "Jane Smith",
      shortDescription: "Quick and reliable window repair.",
      longDescription: "Our team specializes in repairing all types of windows, ensuring your home is secure and energy efficient.",
      price: "$35/hr",
      rating: 4.7,
      reviews: 34,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 987-6543",
      email: "jane.smith@example.com"
    },
    {
      id: 3,
      name: "Furniture Assembly",
      workerName: "Mike Johnson",
      shortDescription: "Professional furniture assembly for your home.",
      longDescription: "We assemble all types of furniture quickly and correctly, so you can enjoy your new pieces without the hassle.",
      price: "$30/hr",
      rating: 4.9,
      reviews: 61,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 222-3344",
      email: "mike.johnson@example.com"
    },
  ],
  cleaning: [
    {
      id: 1,
      name: "Deep Cleaning",
      workerName: "Alice Brown",
      shortDescription: "Thorough cleaning for your entire home.",
      longDescription: "Our deep cleaning service covers every corner of your home, leaving it spotless and fresh.",
      price: "$50/hr",
      rating: 4.9,
      reviews: 80,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 333-4455",
      email: "alice.brown@example.com"
    },
    {
      id: 2,
      name: "Carpet Cleaning",
      workerName: "Bob Lee",
      shortDescription: "Professional carpet and rug cleaning services.",
      longDescription: "We use safe and effective methods to clean your carpets and rugs, removing stains and allergens.",
      price: "$45/hr",
      rating: 4.8,
      reviews: 60,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 444-5566",
      email: "bob.lee@example.com"
    },
  ],
  electrical: [
    {
      id: 1,
      name: "Light Installation",
      workerName: "Emily Clark",
      shortDescription: "Safe and efficient light fixture installation.",
      longDescription: "We install all types of light fixtures, ensuring safety and proper function in your home.",
      price: "$60/hr",
      rating: 4.7,
      reviews: 40,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 555-6677",
      email: "emily.clark@example.com"
    },
    {
      id: 2,
      name: "Wiring Repair",
      workerName: "David Kim",
      shortDescription: "Expert electrical wiring repair and troubleshooting.",
      longDescription: "Our certified electricians can repair and troubleshoot any wiring issues in your home.",
      price: "$70/hr",
      rating: 4.8,
      reviews: 35,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 666-7788",
      email: "david.kim@example.com"
    },
  ],
  painting: [
    {
      id: 1,
      name: "Interior Painting",
      workerName: "Sophia Turner",
      shortDescription: "High-quality interior wall and ceiling painting.",
      longDescription: "We use premium paints and expert techniques to give your interiors a flawless finish.",
      price: "$55/hr",
      rating: 4.9,
      reviews: 50,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 777-8899",
      email: "sophia.turner@example.com"
    },
    {
      id: 2,
      name: "Exterior Painting",
      workerName: "Chris Evans",
      shortDescription: "Durable and beautiful exterior painting services.",
      longDescription: "Protect and beautify your home's exterior with our professional painting services.",
      price: "$65/hr",
      rating: 4.8,
      reviews: 42,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 888-9900",
      email: "chris.evans@example.com"
    },
  ],
  gardening: [
    {
      id: 1,
      name: "Lawn Mowing",
      workerName: "Olivia Green",
      shortDescription: "Keep your lawn neat and healthy.",
      longDescription: "Our lawn mowing service ensures your yard looks its best all season long.",
      price: "$25/hr",
      rating: 4.7,
      reviews: 30,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 999-1122",
      email: "olivia.green@example.com"
    },
    {
      id: 2,
      name: "Garden Design",
      workerName: "Liam White",
      shortDescription: "Custom garden design and landscaping.",
      longDescription: "We create beautiful, functional gardens tailored to your preferences and space.",
      price: "$80/hr",
      rating: 4.9,
      reviews: 22,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 111-2233",
      email: "liam.white@example.com"
    },
  ],
  plumbing: [
    {
      id: 1,
      name: "Leak Repair",
      workerName: "Noah Black",
      shortDescription: "Fast and reliable leak detection and repair.",
      longDescription: "We quickly find and fix leaks to prevent water damage and save you money.",
      price: "$50/hr",
      rating: 4.8,
      reviews: 45,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 222-3344",
      email: "noah.black@example.com"
    },
    {
      id: 2,
      name: "Drain Cleaning",
      workerName: "Emma Blue",
      shortDescription: "Professional drain cleaning services.",
      longDescription: "We clear clogged drains quickly and efficiently, restoring flow to your plumbing.",
      price: "$40/hr",
      rating: 4.7,
      reviews: 38,
      image: "/placeholder.svg?height=80&width=80",
      phone: "+1 (555) 333-4455",
      email: "emma.blue@example.com"
    },
  ],
};

export default function ServiceDetailPage() {
  const params = useParams();
  const { category, serviceId } = params;

  // Find the service in your mockServices object
  const serviceList = mockServices[category as string] || [];
  const service = serviceList.find((s: any) => String(s.id) === String(serviceId));

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#eaf2ff]">
        <div className="text-center text-gray-600">Service not found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eaf2ff] py-12 px-2">
      <div className="max-w-xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200">
        <img
          src={service.image}
          alt={service.name}
          className="w-24 h-24 rounded-xl object-cover mb-6 shadow-lg mx-auto"
        />
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-1">{service.workerName}</h2>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">{service.name}</h1>
        <p className="text-gray-600 mb-2 text-center">{service.shortDescription}</p>
        <div className="flex items-center gap-2 mb-2 justify-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="font-semibold">{service.rating}</span>
          <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
        </div>
        <div className="text-2xl font-bold text-blue-600 mb-2 text-center">{service.price}</div>
        <p className="text-gray-700 mb-4 text-center">{service.longDescription}</p>
        <div className="mb-4 text-center">
          <div className="text-gray-700"><b>Phone:</b> {service.phone}</div>
          <div className="text-gray-700"><b>Email:</b> {service.email}</div>
        </div>
        <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl">
          Book Service
        </button>
      </div>
    </div>
  );
} 