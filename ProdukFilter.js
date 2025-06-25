'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ProdukFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State untuk filter
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    kategori: searchParams.get('kategori') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || ''
  });

  // Kategori options - sesuai dengan data dari API
  const kategoris = [
    'Elektronik',
    'Smartphone', 
    'Aksesoris',
    'Olahraga',
    'Fashion',
    'Gaming'
  ];

  const sortOptions = [
    { value: '', label: 'Sort By' },
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'price-asc', label: 'Price Low to High' },
    { value: 'price-desc', label: 'Price High to Low' },
    { value: 'newest', label: 'Newest First' }
  ];

  // Update URL ketika filter berubah
  const updateURL = (newFilters) => {
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        params.set(key, value);
      }
    });

    const queryString = params.toString();
    const url = queryString ? `/products?${queryString}` : '/products';
    
    router.push(url);
  };

  // Handle filter change
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    updateURL(newFilters);
  };

  // Reset filters
  const resetFilters = () => {
    const resetFilters = {
      search: '',
      kategori: '',
      minPrice: '',
      maxPrice: '',
      sortBy: ''
    };
    setFilters(resetFilters);
    router.push('/products');
  };

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (filters.search !== searchParams.get('search')) {
        updateURL(filters);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Check if any filter is active
  const hasActiveFilters = filters.search || filters.kategori || filters.minPrice || filters.maxPrice || filters.sortBy;

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Filter Products</h2>
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-sm bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 hover:text-white rounded-xl transition-all duration-200 border border-purple-500/30"
        >
          Reset Filters
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
        />
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Kategori Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Category</label>
          <select
            value={filters.kategori}
            onChange={(e) => handleFilterChange('kategori', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
          >
            <option value="" className="bg-gray-800">All Categories</option>
            {kategoris.map((kategori) => (
              <option key={kategori} value={kategori} className="bg-gray-800">
                {kategori}
              </option>
            ))}
          </select>
        </div>

        {/* Min Price Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Min Price</label>
          <input
            type="number"
            placeholder="0"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>

        {/* Max Price Filter */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Max Price</label>
          <input
            type="number"
            placeholder="999999"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
          />
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-300">Sort By</label>
          <select
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-gray-800">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-300">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <span className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30">
                Search: "{filters.search}"
                <button 
                  onClick={() => handleFilterChange('search', '')}
                  className="ml-2 hover:text-white text-lg leading-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.kategori && (
              <span className="inline-flex items-center px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full border border-blue-500/30">
                Category: {filters.kategori}
                <button 
                  onClick={() => handleFilterChange('kategori', '')}
                  className="ml-2 hover:text-white text-lg leading-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.minPrice && (
              <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30">
                Min: Rp {Number(filters.minPrice).toLocaleString('id-ID')}
                <button 
                  onClick={() => handleFilterChange('minPrice', '')}
                  className="ml-2 hover:text-white text-lg leading-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.maxPrice && (
              <span className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-300 text-sm rounded-full border border-green-500/30">
                Max: Rp {Number(filters.maxPrice).toLocaleString('id-ID')}
                <button 
                  onClick={() => handleFilterChange('maxPrice', '')}
                  className="ml-2 hover:text-white text-lg leading-none"
                >
                  ×
                </button>
              </span>
            )}
            {filters.sortBy && (
              <span className="inline-flex items-center px-3 py-1 bg-orange-500/20 text-orange-300 text-sm rounded-full border border-orange-500/30">
                Sort: {sortOptions.find(opt => opt.value === filters.sortBy)?.label}
                <button 
                  onClick={() => handleFilterChange('sortBy', '')}
                  className="ml-2 hover:text-white text-lg leading-none"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}