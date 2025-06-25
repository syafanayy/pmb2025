'use client';

import { useRouter } from 'next/navigation';
import ProductForm from '@/app/components/ProductForm';
import { toast } from 'react-hot-toast';

export default function AddProductPage() {
  const router = useRouter();

  const handleSubmit = async (formData) => {
    try {
      // Simulasi API call - ganti dengan actual API
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      const result = await response.json();
      
      toast.success('Product created successfully!');
      router.push('/products');
      
    } catch (error) {
      console.error('Create product error:', error);
      throw error; // Re-throw untuk handling di ProductForm
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-6 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-2">
              Fill in the product details and upload images to create a new product.
            </p>
          </div>
          
          <ProductForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
}