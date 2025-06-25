'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUpload from './ImageUpload';

export default function ProductForm({ 
  initialData = null, 
  isEdit = false 
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    deskripsi: '',
    harga: '',
    kategori: '',
    stok: '',
    rating: '',
    gambar: '',
    publicId: ''
  });

  // Kategori options
  const kategoris = [
    'Elektronik',
    'Fashion',
    'Makanan',
    'Kesehatan',
    'Olahraga',
    'Buku',
    'Rumah'
  ];

  // Load initial data for edit
  useEffect(() => {
    if (initialData) {
      setFormData({
        nama: initialData.nama || '',
        deskripsi: initialData.deskripsi || '',
        harga: initialData.harga || '',
        kategori: initialData.kategori || '',
        stok: initialData.stok || '',
        rating: initialData.rating || '',
        gambar: initialData.gambar || '',
        publicId: initialData.publicId || ''
      });
    }
  }, [initialData]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle image upload success
  const handleImageUpload = (imageData) => {
    if (imageData) {
      setFormData(prev => ({
        ...prev,
        gambar: imageData.url,
        publicId: imageData.publicId
      }));
    } else {
      // Image removed
      setFormData(prev => ({
        ...prev,
        gambar: '',
        publicId: ''
      }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validasi form
      if (!formData.nama.trim()) {
        alert('Nama produk harus diisi');
        return;
      }

      if (!formData.harga || parseFloat(formData.harga) <= 0) {
        alert('Harga harus diisi dan lebih dari 0');
        return;
      }

      if (!formData.kategori) {
        alert('Kategori harus dipilih');
        return;
      }

      if (!formData.stok || parseInt(formData.stok) < 0) {
        alert('Stok harus diisi dan tidak boleh negatif');
        return;
      }

      // Prepare data for API
      const submitData = {
        nama: formData.nama.trim(),
        deskripsi: formData.deskripsi.trim(),
        harga: parseFloat(formData.harga),
        kategori: formData.kategori,
        stok: parseInt(formData.stok),
        rating: formData.rating ? parseFloat(formData.rating) : 0,
        gambar: formData.gambar,
        publicId: formData.publicId
      };

      // Submit to API
      const url = isEdit ? `/api/products/${initialData.id}` : '/api/products';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (result.success) {
        alert(isEdit ? 'Produk berhasil diupdate!' : 'Produk berhasil ditambahkan!');
        router.push('/admin/products');
      } else {
        throw new Error(result.error || 'Gagal menyimpan produk');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </button>
          
          <h1 className="text-3xl font-bold text-white mb-2">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-300">
            {isEdit ? 'Update product information and image' : 'Fill in the product details and upload an image'}
          </p>
        </div>

        {/* Form */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-white">Product Image</h3>
              <ImageUpload
                onUploadSuccess={handleImageUpload}
                initialImage={formData.gambar}
                disabled={isLoading}
                className="w-full"
              />
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Produk */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="Enter product name"
                  disabled={isLoading}
                />
              </div>

              {/* Deskripsi */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm resize-none"
                  placeholder="Enter product description"
                  disabled={isLoading}
                />
              </div>

              {/* Harga */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Price (Rp) *
                </label>
                <input
                  type="number"
                  name="harga"
                  value={formData.harga}
                  onChange={handleInputChange}
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="0.00"
                  disabled={isLoading}
                />
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Category *
                </label>
                <select
                  name="kategori"
                  value={formData.kategori}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  disabled={isLoading}
                >
                  <option value="" className="bg-gray-800">Select Category</option>
                  {kategoris.map((kategori) => (
                    <option key={kategori} value={kategori} className="bg-gray-800">
                      {kategori}
                    </option>
                  ))}
                </select>
              </div>

              {/* Stok */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  name="stok"
                  value={formData.stok}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="0"
                  disabled={isLoading}
                />
              </div>

              {/* Rating */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Rating (0-5)
                </label>
                <input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleInputChange}
                  min="0"
                  max="5"
                  step="0.1"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
                  placeholder="0.0"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-xl transition-all duration-200 border border-white/20 font-medium"
                disabled={isLoading}
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isEdit ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {isEdit ? 'Update Product' : 'Save Product'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-300 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Tips for Product Images
          </h3>
          <ul className="text-blue-200 text-sm space-y-2">
            <li>• Use high-quality images (800x600 pixels recommended)</li>
            <li>• Images will be automatically optimized for web</li>
            <li>• Supported formats: PNG, JPG, WebP (max 5MB)</li>
            <li>• Use good lighting and clear product shots</li>
            <li>• Images are stored securely in the cloud</li>
          </ul>
        </div>
      </div>
    </div>
  );
}