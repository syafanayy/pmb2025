// File: app/components/DealsSection.js - Update untuk menerima data dari API
"use client";
import { useState } from 'react';

export default function DealsSection({ 
  products = [], 
  loading = false, 
  error = null, 
  onRetry = null 
}) {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper functions
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // Get unique categories dari products
  const categories = ['all', ...new Set(products.map(p => p.category))];
  
  // Filter products berdasarkan kategori yang dipilih
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Jika ada error, tampilkan error message
  if (error) {
    return (
      <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              🔥 <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                FLASH DEALS
              </span>
            </h2>
          </div>
          
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              Oops! Ada masalah memuat produk
            </h3>
            <p className="text-red-300 mb-6">
              {error}
            </p>
            {onRetry && (
              <button 
                onClick={onRetry}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300"
              >
                🔄 Coba Lagi
              </button>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            🔥 <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FLASH DEALS
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            Produk terpopuler dengan diskon gila-gilaan!
          </p>
          
          {/* API Status Badge */}
          <div className="inline-flex items-center gap-2 bg-gray-800/50 rounded-full px-4 py-2 border border-gray-700">
            <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
            <span className="text-sm text-gray-300">
              {loading ? 'Loading...' : `${products.length} produk dari API`}
            </span>
          </div>
        </div>

        {/* Category Filter */}
        {!loading && categories.length > 1 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {category === 'all' ? '🛍️ Semua' : `📱 ${category}`}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-gray-800/50 rounded-2xl p-6 animate-pulse">
                <div className="bg-gray-700 h-48 rounded-xl mb-4"></div>
                <div className="bg-gray-700 h-6 rounded mb-3"></div>
                <div className="bg-gray-700 h-4 rounded mb-3"></div>
                <div className="bg-gray-700 h-8 rounded mb-3"></div>
                <div className="bg-gray-700 h-10 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/8b5cf6/ffffff?text=${encodeURIComponent(product.title)}`;
                    }}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isHot && (
                      <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        🔥 HOT
                      </span>
                    )}
                    {product.discount && product.discount > 0 && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                        -{product.discount}%
                      </span>
                    )}
                  </div>

                  {/* Stock Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      product.stock > 10 
                        ? 'bg-green-500/80 text-green-100' 
                        : product.stock > 0 
                        ? 'bg-yellow-500/80 text-yellow-100' 
                        : 'bg-red-500/80 text-red-100'
                    }`}>
                      {product.stock > 0 ? `${product.stock} tersisa` : 'Sold Out'}
                    </span>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-purple-400 transition-colors line-clamp-2">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  {product.features && product.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-gray-700/50 text-gray-300 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          {i < Math.floor(product.rating) ? '⭐' : '☆'}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-400 ml-2 text-sm">
                      ({product.rating})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-gray-500 text-sm line-through mb-1">
                        {formatPrice(product.originalPrice)}
                      </div>
                    )}
                    <div className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button 
                    className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-300 ${
                      product.stock === 0
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white hover:shadow-lg hover:shadow-purple-500/25'
                    }`}
                    disabled={product.stock === 0}
                  >
                    {product.stock === 0 ? '❌ Sold Out' : '🛒 Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Products Found */}
        {!loading && filteredProducts.length === 0 && products.length > 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              Tidak ada produk ditemukan
            </h3>
            <p className="text-gray-500 mb-4">
              Coba pilih kategori yang berbeda
            </p>
            <button 
              onClick={() => setSelectedCategory('all')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Lihat Semua Produk
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-400 mb-2">
              Belum ada produk
            </h3>
            <p className="text-gray-500">
              Produk akan muncul di sini setelah data dimuat dari API
            </p>
          </div>
        )}
      </div>
    </section>
  );
}