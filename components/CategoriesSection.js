"use client";
import Link from 'next/link';

export default function CategoriesSection() {
  const categories = [
    { name: "🔥 Electronics", desc: "Gadget terbaru", icon: "📱", color: "from-blue-600 to-cyan-600" },
    { name: "👕 Fashion", desc: "Style terkini", icon: "👗", color: "from-pink-600 to-rose-600" },
    { name: "🏠 Home & Living", desc: "Dekorasi rumah", icon: "🏡", color: "from-green-600 to-emerald-600" },
    { name: "🎮 Gaming", desc: "Gaming gear", icon: "🕹️", color: "from-purple-600 to-violet-600" },
    { name: "💄 Beauty", desc: "Kosmetik premium", icon: "💋", color: "from-red-600 to-pink-600" },
    { name: "🚗 Automotive", desc: "Aksesoris mobil", icon: "🏎️", color: "from-orange-600 to-yellow-600" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🛍️ KATEGORI PRODUK
          </h2>
          <p className="text-xl text-gray-300">Temukan produk impianmu di berbagai kategori!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              href="/categories"
              className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-xl border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                  {category.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}