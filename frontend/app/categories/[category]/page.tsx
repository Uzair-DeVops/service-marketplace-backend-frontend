"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Wrench,
  Sparkles,
  Zap,
  Paintbrush,
  Leaf,
  Droplet,
  Star,
  MapPin,
} from "lucide-react";

// 1. Define the Provider type
interface Provider {
  id: string;
  business_name: string;
  service_type: string;
  hourly_rate: string;
  location: string;
  working_hours: string;
  profile_photo: string;
  email: string;
}

const categoryIcons = {
  "home-repair": <Wrench className="w-8 h-8 text-blue-500" />,
  cleaning: <Sparkles className="w-8 h-8 text-green-500" />,
  electrical: <Zap className="w-8 h-8 text-purple-500" />,
  painting: <Paintbrush className="w-8 h-8 text-pink-500" />,
  gardening: <Leaf className="w-8 h-8 text-orange-400" />,
  plumbing: <Droplet className="w-8 h-8 text-teal-500" />,
};

export default function CategoryProvidersPage() {
  const router = useRouter();
  const params = useParams();
  const category = params.category as string;
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/providers");
        if (!response.ok) throw new Error("Failed to fetch providers");
        const data = await response.json();
        // Filter by service_type (category)
        const filtered = data.filter(
          (provider: any) =>
            provider.service_type &&
            provider.service_type.replace(/\s+/g, "-").toLowerCase() ===
              category
        );
        setProviders(filtered);
      } catch (err) {
        setError("Failed to fetch providers");
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [category]);

  return (
    <div className="min-h-screen bg-[#eaf2ff] py-12 px-2">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8 justify-center">
          {categoryIcons[category as keyof typeof categoryIcons]}
          <h1 className="text-3xl font-bold text-gray-900 capitalize">
            {category.replace(/-/g, " ")} Providers
          </h1>
        </div>
        {loading ? (
          <div className="text-center text-gray-600">Loading providers...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : providers.length === 0 ? (
          <div className="text-center text-gray-600">
            No providers found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {providers.map((provider) => (
              <div
                key={provider.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-gray-200 flex flex-col items-center hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <img
                  src={`http://127.0.0.1:8000${provider.profile_photo}`}
                  alt={provider.business_name}
                  className="w-16 h-16 rounded-xl object-cover mb-4 shadow-lg"
                />
                <h2 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {provider.business_name}
                </h2>
                <p className="text-gray-600 mb-2 text-center">
                  {provider.service_type}
                </p>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-500 text-sm">
                    {provider.location}
                  </span>
                </div>
                <div className="text-lg font-bold text-blue-600 mb-2">
                  ${provider.hourly_rate}/hr
                </div>
                <div className="flex gap-2 w-full justify-center">
                  <button
                    onClick={() =>
                      router.push(
                        `/categories/${category}/booking?provider_id=${
                          provider.id
                        }&user_id=${userId || "USER_ID_PLACEHOLDER"}`
                      )
                    }
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </button>
                  <button
                    className="px-6 py-2 bg-white border border-green-500 text-green-600 font-semibold rounded-xl transition-all duration-300 shadow hover:bg-green-50"
                    onClick={() =>
                      router.push(
                        `/categories/${category}/service/${provider.id}`
                      )
                    }
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
