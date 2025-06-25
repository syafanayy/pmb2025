'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatRupiah } from '@/utils/formatRupiah';

export default function ProdukList({ produkData }) {
  if (!produkData.success) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {produkData.message}</p>
      </div>
    );
  }

  if (produkData.data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Tidak ada produk yang ditemukan.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">
          Menampilkan {produkData.data.length} produk
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {produkData.data.map((produk) => (
          <div
            key={produk.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
          >
            <Link href={`/produk/${produk.id}`}>
              <div className="relative h-48">
                <Image
                  src={produk.gambar}
                  alt={produk.nama}
                  fill
                  className="object-cover hover:scale-105 transition duration-300"
                />
              </div>
              
              <div className="p-4">
                <div className="mb-2">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {produk.kategori}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 text-gray-900 hover:text-blue-600">
                  {produk.nama}
                </h3>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {produk.deskripsi}
                </p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-lg font-bold text-green-600">
                      {formatRupiah(produk.harga)}
                    </div>
                    <div className="text-xs text-gray-500">
                      Stok: {produk.stok}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm text-gray-600 ml-1">
                      {produk.rating}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}