// GET ALL PRODUCTS - app/api/products/route.js
import { NextResponse } from 'next/server';

// Mock database - Replace with actual database connection
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

let nextId = 3;

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: products,
      total: products.length
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch products'
    }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    
    // Generate SKU if not provided
    if (!data.sku) {
      data.sku = `PRD-${String(nextId).padStart(3, '0')}`;
    }
    
    // Create new product
    const newProduct = {
      id: nextId++,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    products.push(newProduct);
    
    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to create product'
    }, { status: 500 });
  }
}