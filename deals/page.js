"use client";
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashDeals = [
    {
      name: "iPhone 15 Pro Max 256GB",
      originalPrice: "Rp 19.999.000",
      salePrice: "Rp 15.999.000",
      discount: "20%",
      image: "📱",
      sold: 1247,
      stock: 500,
      rating: 4.9
    },
    {
      name: "MacBook Pro M3 14 inch",
      originalPrice: "Rp 32.999.000",
      salePrice: "Rp 25.999.000",
      discount: "21%",
      image: "💻",
      sold: 456,
      stock: 200,
      rating: 4.8
    },
    {
      name: "PlayStation 5 Console",
      originalPrice: "Rp 9.999.000",
      salePrice: "Rp 7.999.000",
      discount: "20%",
      image: "🎮",
      sold: 2341,
      stock: 150,
      rating: 4.9
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      originalPrice: "Rp 18.999.000",
      salePrice: "Rp 14.999.000",
      discount: "21%",
      image: "📱",
      sold: 876,
      stock: 300,
      rating: 4.7
    },
    {
      name: "iPad Pro M2 11 inch",
      originalPrice: "Rp 15.999.000",
      salePrice: "Rp 12.799.000",
      discount: "20%",
      image: "📱",
      sold: 654,
      stock: 250,
      rating: 4.8
    },
    {
      name: "Nintendo Switch OLED",
      originalPrice: "Rp 4.999.000",
      salePrice: "Rp 3.999.000",
      discount: "20%",
      image: "🎮",
      sold: 1543,
      stock: 400,
      rating: 4.6
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.1),transparent)]"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            ⚡ FLASH SALE
          </h1>
          <p className="text-2xl text-gray-300 mb-8">Diskon gila-gilaan dalam waktu terbatas!</p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center space-x-6 mb-8">
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-6 min-w-[100px] transform hover:scale-105 transition-transform">
              <div className="text-4xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm text-red-100 font-semibold">JAM</div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-6 min-w-[100px] transform hover:scale-105 transition-transform">
              <div className="text-4xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm text-red-100 font-semibold">MENIT</div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-3xl p-6 min-w-[100px] transform hover:scale-105 transition-transform">
              <div className="text-4xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm text-red-100 font-semibold">DETIK</div>
            </div>
          </div>
          
          <div className="inline-block bg-red-500/20 border border-red-500/50 rounded-2xl px-6 py-3">
            <p className="text-red-300 font-semibold">🔥 Penawaran berakhir dalam hitungan jam!</p>
          </div>
        </div>
      </section>

      {/* Flash Deals Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashDeals.map((deal, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              >
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold z-10">
                  -{deal.discount}
                </div>

                {/* Product Image */}
                <div className="text-center mb-6">
                  <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {deal.image}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(deal.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-gray-400 text-sm ml-2">({deal.rating})</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-4 text-center">{deal.name}</h3>
                
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-gray-400 line-through text-sm mb-1">{deal.originalPrice}</div>
                  <div className="text-3xl font-black text-red-400">{deal.salePrice}</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Terjual: {deal.sold}</span>
                    <span>Sisa: {deal.stock}</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${(deal.sold / (deal.sold + deal.stock)) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-center text-xs text-gray-400 mt-1">
                    {Math.round((deal.sold / (deal.sold + deal.stock)) * 100)}% Terjual
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105">
                  🛒 BELI SEKARANG
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
