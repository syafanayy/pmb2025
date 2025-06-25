"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DealsSection() {
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

  const deals = [
    {
      name: "iPhone 15 Pro Max",
      originalPrice: "Rp 19.999.000",
      salePrice: "Rp 15.999.000",
      discount: "20%",
      image: "📱",
      sold: 1247,
      stock: 500
    },
    {
      name: "MacBook Pro M3",
      originalPrice: "Rp 32.999.000",
      salePrice: "Rp 25.999.000",
      discount: "21%",
      image: "💻",
      sold: 456,
      stock: 200
    },
    {
      name: "PlayStation 5",
      originalPrice: "Rp 9.999.000",
      salePrice: "Rp 7.999.000",
      discount: "20%",
      image: "🎮",
      sold: 2341,
      stock: 150
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(239,68,68,0.1),transparent)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
            ⚡ FLASH SALE
          </h2>
          <p className="text-xl text-gray-300 mb-8">Buruan! Penawaran terbatas waktu!</p>
          
          {/* Countdown Timer */}
          <div className="flex justify-center space-x-4 mb-8">
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-4 min-w-[80px]">
              <div className="text-3xl font-black text-white">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="text-sm text-red-100">JAM</div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-4 min-w-[80px]">
              <div className="text-3xl font-black text-white">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="text-sm text-red-100">MENIT</div>
            </div>
            <div className="bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl p-4 min-w-[80px]">
              <div className="text-3xl font-black text-white">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="text-sm text-red-100">DETIK</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {deals.map((deal, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-3xl p-6 border border-red-500/30 hover:border-red-400/50 transition-all duration-300 transform hover:scale-105"
            >
              <div className="text-center mb-6">
                <div className="text-8xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {deal.image}
                </div>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{deal.discount}
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-4 text-center">{deal.name}</h3>
              
              <div className="text-center mb-4">
                <div className="text-gray-400 line-through text-sm mb-1">{deal.originalPrice}</div>
                <div className="text-2xl font-black text-red-400">{deal.salePrice}</div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Terjual: {deal.sold}</span>
                  <span>Sisa: {deal.stock}</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                    style={{ width: `${(deal.sold / (deal.sold + deal.stock)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <Link
                href="/deals"
                className="block w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-center rounded-xl hover:from-red-700 hover:to-orange-700 transition-all duration-300"
              >
                🛒 BELI SEKARANG
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/deals"
            className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-lg rounded-2xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105"
          >
            🔥 LIHAT SEMUA FLASH SALE
          </Link>
        </div>
      </div>
    </section>
  );
}