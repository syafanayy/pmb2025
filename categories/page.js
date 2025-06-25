"use client";
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Semua Kategori', icon: '🌟' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'fashion', name: 'Fashion', icon: '👕' },
    { id: 'home', name: 'Home & Living', icon: '🏠' },
    { id: 'gaming', name: 'Gaming', icon: '🎮' },
    { id: 'beauty', name: 'Beauty', icon: '💄' },
    { id: 'automotive', name: 'Automotive', icon: '🚗' },
  ];

  const products = [
    { name: 'iPhone 15 Pro', price: 'Rp 19.999.000', category: 'electronics', image: '📱', rating: 4.8 },
    { name: 'Gaming Chair RGB', price: 'Rp 2.500.000', category: 'gaming', image: '🪑', rating: 4.9 },
    { name: 'Skincare Set Premium', price: 'Rp 899.000', category: 'beauty', image: '🧴', rating: 4.7 },
    { name: 'Hoodie Oversize', price: 'Rp 299.000', category: 'fashion', image: '👕', rating: 4.6 },
    { name: 'Smart TV 55 inch', price: 'Rp 8.999.000', category: 'electronics', image: '📺', rating: 4.8 },
    { name: 'Sofa Minimalis', price: 'Rp 4.500.000', category: 'home', image: '🛋️', rating: 4.5 },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🛍️ KATEGORI PRODUK
          </h1>
          <p className="text-xl text-gray-300">Temukan produk terbaik dari berbagai kategori</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category.icon} {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900/80 to-black/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="text-center mb-4">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {product.image}
                  </div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}>
                        ⭐
                      </span>
                    ))}
                    <span className="text-gray-400 text-sm ml-2">({product.rating})</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                <p className="text-2xl font-black text-purple-400 mb-4">{product.price}</p>
                
                <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
                  🛒 Tambah ke Keranjang
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