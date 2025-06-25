// lib/models/Product.js
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: [true, 'Nama produk harus diisi'],
    trim: true,
    maxlength: [100, 'Nama produk tidak boleh lebih dari 100 karakter']
  },
  sku: {
    type: String,
    unique: true,
    sparse: true, // Allow null values but ensure uniqueness when present
    trim: true,
    uppercase: true
  },
  kategori: {
    type: String,
    required: [true, 'Kategori harus dipilih'],
    enum: {
      values: ['Elektronik', 'Fashion', 'Makanan', 'Kesehatan', 'Olahraga', 'Buku', 'Rumah'],
      message: 'Kategori tidak valid'
    }
  },
  deskripsi: {
    type: String,
    trim: true,
    maxlength: [500, 'Deskripsi tidak boleh lebih dari 500 karakter']
  },
  harga: {
    type: Number,
    required: [true, 'Harga harus diisi'],
    min: [0, 'Harga tidak boleh negatif']
  },
  stok: {
    type: Number,
    required: [true, 'Stok harus diisi'],
    min: [0, 'Stok tidak boleh negatif'],
    default: 0
  },
  status: {
    type: String,
    enum: {
      values: ['Active', 'Inactive', 'Discontinued'],
      message: 'Status tidak valid'
    },
    default: 'Active'
  },
  gambar: {
    type: String,
    default: '/api/placeholder/100/100'
  },
  publicId: {
    type: String,
    default: ''
  },
  rating: {
    type: Number,
    min: [0, 'Rating tidak boleh negatif'],
    max: [5, 'Rating tidak boleh lebih dari 5'],
    default: 0
  },
  reviewCount: {
    type: Number,
    min: [0, 'Review count tidak boleh negatif'],
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  supplier: {
    type: String,
    trim: true
  },
  barcode: {
    type: String,
    trim: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for stock status
ProductSchema.virtual('stockStatus').get(function() {
  if (this.stok === 0) return 'Out of Stock';
  if (this.stok < 10) return 'Low Stock';
  return 'In Stock';
});

// Pre-save middleware to generate SKU if not provided
ProductSchema.pre('save', function(next) {
  if (!this.sku) {
    // Generate SKU based on category and timestamp
    const categoryPrefix = this.kategori.substring(0, 3).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    this.sku = `${categoryPrefix}-${timestamp}`;
  }
  next();
});

// Indexes for better query performance
ProductSchema.index({ nama: 1 });
ProductSchema.index({ kategori: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ sku: 1 });
ProductSchema.index({ createdAt: -1 });

// Prevent model recompilation in development
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export default Product;