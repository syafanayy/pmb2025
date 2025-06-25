"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-purple-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">🔥 HYPEZONE</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">
              Kategori
            </Link>
            <Link href="/deals" className="text-gray-300 hover:text-white transition-colors">
              Flash Sale
            </Link>
            <Link href="/promo" className="text-gray-300 hover:text-white transition-colors">
              Promo
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/login" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link href="/categories" className="block text-gray-300 hover:text-white py-2">
              Kategori
            </Link>
            <Link href="/deals" className="block text-gray-300 hover:text-white py-2">
              Flash Sale
            </Link>
            <Link href="/promo" className="block text-gray-300 hover:text-white py-2">
              Promo
            </Link>
            <Link href="/contact" className="block text-gray-300 hover:text-white py-2">
              Contact
            </Link>
            <Link href="/login" className="block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-center">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
