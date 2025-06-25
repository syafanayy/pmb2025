"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "🔥 MEGA SALE 2025",
      subtitle: "Diskon Gila-gilaan hingga 90% untuk semua kategori produk!",
      bg: "from-red-600 via-orange-500 to-yellow-400",
      cta: "BORONG SEKARANG!",
    },
    {
      title: "⚡ FLASH SALE",
      subtitle: "24 Jam saja! Produk premium dengan harga fantastis",
      bg: "from-purple-600 via-pink-500 to-red-500",
      cta: "SERBU SEKARANG!",
    },
    {
      title: "🚀 GRATIS ONGKIR",
      subtitle: "Ke seluruh Indonesia tanpa minimum pembelian!",
      bg: "from-blue-600 via-cyan-400 to-green-400",
      cta: "BELANJA GRATIS!",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${heroSlides[currentSlide].bg} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 animate-bounce delay-100">💎</div>
        <div className="absolute top-40 right-20 animate-bounce delay-300">⚡</div>
        <div className="absolute bottom-40 left-20 animate-bounce delay-500">🔥</div>
        <div className="absolute bottom-20 right-10 animate-bounce delay-700">🚀</div>
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-6xl md:text-8xl font-black mb-6 animate-pulse">
          {heroSlides[currentSlide].title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90">
          {heroSlides[currentSlide].subtitle}
        </p>
        <Link
          href="/deals"
          className="inline-block px-12 py-4 bg-white text-black font-black text-xl rounded-2xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 animate-glow"
        >
          {heroSlides[currentSlide].cta}
        </Link>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}