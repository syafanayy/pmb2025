// app/api/products/[id]/route.js - Individual Product API (GET, PUT, PATCH, DELETE)
import { NextResponse } from 'next/server';

// Mock database - Should match the one in your main products route
let products = [
  {
    id: 1,
    name: 'Laptop Gaming',
    sku: 'LPT-001',
    category: 'Electronics',
    description: 'Laptop gaming dengan spesifikasi tinggi',
    price: 15000000,
    stock: 5,
    status: 'Active',
    supplier: 'Tech Supplier',
    barcode: '1234567890123',
    tags: ['gaming', 'laptop', 'high-spec'],
    created_at: new Date('2024-01-01').toISOString(),
    updated_at: new Date('2024-01-01').toISOString()
  },
  {
    id: 2,
    name: 'Mouse Wireless',
    sku: 'MSE-002',
    category: 'Electronics',
    description: 'Mouse wireless dengan teknologi terbaru',
    price: 250000,
    stock: 25,
    status: 'Active',
    supplier: 'Peripheral Co',
    barcode: '1234567890124',
    tags: ['mouse', 'wireless', 'computer'],
    created_at: new Date('2024-01-02').toISOString(),
    updated_at: new Date('2024-01-02').toISOString()
  }
];

// GET - Get single product by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id);

    // Validate ID
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid product ID'
      }, { status: 400 });
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: product
    });

  } catch (error) {
    console.error('GET /api/products/[id] error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// PUT - Update entire product (replace)
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id);
    const body = await request.json();

    // Validate ID
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid product ID'
      }, { status: 400 });
    }

    // Find product index
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 });
    }

    // Validate required fields
    const requiredFields = ['name', 'category', 'price', 'stock'];
    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json({
          success: false,
          error: 'Validation Error',
          details: [`${field} is required`]
        }, { status: 400 });
      }
    }

    // Update product (replace entire object but keep id and timestamps)
    const updatedProduct = {
      ...body,
      id: productId,
      created_at: products[productIndex].created_at,
      updated_at: new Date().toISOString()
    };

    products[productIndex] = updatedProduct;

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// PATCH - Partial update product
export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id);
    const body = await request.json();

    // Validate ID
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid product ID'
      }, { status: 400 });
    }

    // Find product index
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 });
    }

    // Remove undefined fields
    const updateData = Object.fromEntries(
      Object.entries(body).filter(([_, value]) => value !== undefined)
    );

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No data provided for update'
      }, { status: 400 });
    }

    // Update product (merge with existing data)
    const updatedProduct = {
      ...products[productIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };

    products[productIndex] = updatedProduct;

    return NextResponse.json({
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    });

  } catch (error) {
    console.error('PATCH /api/products/[id] error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}

// DELETE - Delete product
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const productId = parseInt(id);

    // Validate ID
    if (isNaN(productId)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid product ID'
      }, { status: 400 });
    }

    // Find product index
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
      return NextResponse.json({
        success: false,
        error: 'Product not found'
      }, { status: 404 });
    }

    // Remove product from array
    const deletedProduct = products.splice(productIndex, 1)[0];

    return NextResponse.json({
      success: true,
      data: deletedProduct,
      message: 'Product deleted successfully'
    });

  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}