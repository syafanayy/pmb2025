// File: app/page.js - Modifikasi dari yang sudah ada
"use client";
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import DealsSection from './components/DealsSection';
import PromoSection from './components/PromoSection';
import Footer from './components/Footer';

export default function HomePage() {
  // State untuk menyimpan data dari API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data dari API saat component pertama kali dimuat
  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch dari API internal
      const response = await fetch('/api/products');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
        console.log('✅ Products loaded successfully:', data.data.length, 'items');
      } else {
        throw new Error(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      console.error('❌ Error fetching products:', err);
      setError(err.message);
      
      // Fallback data jika API gagal
      setProducts([
        {
          id: 1,
          title: "Sample Product",
          price: 1000000,
          description: "This is a fallback product when API fails",
          category: "Electronics",
          image: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Fallback+Product",
          rating: 4.5,
          stock: 5,
          isHot: true
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      
      {/* Pass data API ke DealsSection */}
      <DealsSection 
        products={products}
        loading={loading}
        error={error}
        onRetry={fetchProductsData}
      />
      
      {/* Pass data API ke PromoSection juga */}
      <PromoSection 
        products={products}
        loading={loading}
      />
      
      <Footer />
      
    {/* Advanced Debug Info - Hapus ini setelah testing */}
    {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-sm max-w-sm z-50 max-h-96 overflow-y-auto">
          <div className="font-bold mb-2">🔧 Debug Info:</div>
          <div>Products: {products.length}</div>
          <div>Loading: {loading ? 'Yes' : 'No'}</div>
          <div>Error: {error ? 'Yes' : 'No'}</div>
          
          {/* Tampilkan detail error dengan lokasi */}
          {error && (
            <div className="mt-2 p-2 bg-red-900 rounded">
              <div className="text-red-400 font-semibold">Error Details:</div>
              
              {/* Error message */}
              <div className="text-red-300 text-xs mt-1 break-words">
                <strong>Message:</strong> {typeof error === 'string' ? error : error.message || 'Unknown error'}
              </div>
              
              {/* Error type */}
              {error.name && (
                <div className="text-red-300 text-xs mt-1">
                  <strong>Type:</strong> {error.name}
                </div>
              )}
              
              {/* HTTP Status jika ada */}
              {error.status && (
                <div className="text-red-300 text-xs mt-1">
                  <strong>HTTP Status:</strong> {error.status}
                </div>
              )}
              
              {/* URL yang error */}
              {error.url && (
                <div className="text-red-300 text-xs mt-1">
                  <strong>Failed URL:</strong> {error.url}
                </div>
              )}
              
              {/* Stack trace dengan highlight */}
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-red-400 cursor-pointer text-xs">📍 Stack Trace (Click to expand)</summary>
                  <pre className="text-xs mt-1 text-red-200 overflow-auto max-h-32 bg-red-800 p-2 rounded">
                    {error.stack}
                  </pre>
                </details>
              )}
              
              {/* Jika error adalah object, tampilkan semua properties */}
              {typeof error === 'object' && error !== null && (
                <details className="mt-2">
                  <summary className="text-red-400 cursor-pointer text-xs">🔍 Full Error Object</summary>
                  <pre className="text-xs mt-1 text-red-200 overflow-auto max-h-32 bg-red-800 p-2 rounded">
                    {JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}
                  </pre>
                </details>
              )}
            </div>
          )}
          
          {/* API Status Check */}
          <div className="mt-2 text-xs text-gray-300">
            <div className="font-semibold">🌐 System Info:</div>
            <div>Timestamp: {new Date().toLocaleTimeString()}</div>
            <div>Environment: {process.env.NODE_ENV}</div>
            <div>URL: {window.location.pathname}</div>
            <div>Origin: {window.location.origin}</div>
          </div>
          
          {/* Network Status */}
          <div className="mt-2 text-xs">
            <div className="font-semibold text-blue-400">📡 Network Status:</div>
            <div className={navigator.onLine ? 'text-green-400' : 'text-red-400'}>
              Connection: {navigator.onLine ? 'Online' : 'Offline'}
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="mt-3 flex gap-2">
            {error && (
              <button 
                onClick={() => {
                  // setError(null); // uncomment if you have setError
                  console.log('🧹 Error cleared from debug panel');
                }}
                className="px-2 py-1 bg-red-600 hover:bg-red-700 rounded text-xs"
              >
                Clear Error
              </button>
            )}
            
            <button 
              onClick={() => {
                console.log('🔄 Manual refresh triggered');
                window.location.reload();
              }}
              className="px-2 py-1 bg-blue-600 hover:bg-blue-700 rounded text-xs"
            >
              Refresh
            </button>
            
            <button 
              onClick={async () => {
                console.log('🧪 Testing API connection...');
                try {
                  const response = await fetch(window.location.origin + '/api/test');
                  console.log('API Test Response:', response.status);
                } catch (err) {
                  console.error('API Test Failed:', err);
                }
              }}
              className="px-2 py-1 bg-green-600 hover:bg-green-700 rounded text-xs"
            >
              Test API
            </button>
          </div>
          
          {/* Debugging tip */}
          <div className="mt-2 text-xs text-yellow-300 bg-yellow-900 bg-opacity-30 p-2 rounded">
            💡 <strong>Debug Tip:</strong> Check browser Console (F12) for more details
          </div>
        </div>
      )}
    </div>
  );
}