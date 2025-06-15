"use client";
import { Wrench, Sparkles, Zap, Paintbrush, Leaf, Droplet } from "lucide-react";
import { useRouter } from "next/navigation";

const categories = [
  {
    name: "Home Repair",
    slug: "home-repair",
    icon: <Wrench className="w-8 h-8" />, 
    bg: "bg-blue-100",
    iconBg: "bg-blue-500",
  },
  {
    name: "Cleaning",
    slug: "cleaning",
    icon: <Sparkles className="w-8 h-8" />, 
    bg: "bg-green-100",
    iconBg: "bg-green-500",
  },
  {
    name: "Electrical",
    slug: "electrical",
    icon: <Zap className="w-8 h-8" />, 
    bg: "bg-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    name: "Painting",
    slug: "painting",
    icon: <Paintbrush className="w-8 h-8" />, 
    bg: "bg-pink-100",
    iconBg: "bg-pink-500",
  },
  {
    name: "Gardening",
    slug: "gardening",
    icon: <Leaf className="w-8 h-8" />, 
    bg: "bg-yellow-100",
    iconBg: "bg-orange-400",
  },
  {
    name: "Plumbing",
    slug: "plumbing",
    icon: <Droplet className="w-8 h-8" />, 
    bg: "bg-teal-100",
    iconBg: "bg-teal-500",
  },
];

export default function AllCategoriesPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#eaf2ff] py-12 px-2">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">All Categories</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => router.push(`/categories/${cat.slug}`)}
              className={`rounded-2xl shadow-md flex flex-col items-center justify-center p-8 ${cat.bg} transition-transform duration-200 hover:scale-105 hover:shadow-xl cursor-pointer`}
            >
              <div className={`mb-4 rounded-xl p-4 shadow ${cat.iconBg} text-white flex items-center justify-center`}>
                {cat.icon}
              </div>
              <div className="text-lg font-semibold text-gray-800 text-center">{cat.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
