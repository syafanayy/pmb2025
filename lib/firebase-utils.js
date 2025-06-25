// lib/firebase-utils.js - Utility functions for Firebase operations
import { 
    collection, 
    doc, 
    getDocs, 
    getDoc, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    query, 
    where, 
    orderBy, 
    limit,
    serverTimestamp 
  } from 'firebase/firestore';
  import { db } from './firebase';
  
  // Products Collection Reference
  const PRODUCTS_COLLECTION = 'products';
  
  // Get all products
  export const getAllProducts = async () => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(productsRef, orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || new Date().toISOString().split('T')[0]
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products:', error);
      throw error;
    }
  };
  
  // Get single product by ID
  export const getProductById = async (productId) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return {
          id: productSnap.id,
          ...productSnap.data(),
          createdAt: productSnap.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || new Date().toISOString().split('T')[0]
        };
      } else {
        throw new Error('Product not found');
      }
    } catch (error) {
      console.error('Error getting product:', error);
      throw error;
    }
  };
  
  // Add new product
  export const addProduct = async (productData) => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const docRef = await addDoc(productsRef, {
        ...productData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };
  
  // Update product
  export const updateProduct = async (productId, updateData) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      await updateDoc(productRef, {
        ...updateData,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };
  
  // Delete product
  export const deleteProduct = async (productId) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      await deleteDoc(productRef);
      
      return true;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };
  
  // Get products by category
  export const getProductsByCategory = async (category) => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(
        productsRef, 
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || new Date().toISOString().split('T')[0]
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products by category:', error);
      throw error;
    }
  };
  
  // Get products by status
  export const getProductsByStatus = async (status) => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(
        productsRef, 
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || new Date().toISOString().split('T')[0]
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error getting products by status:', error);
      throw error;
    }
  };
  
  // Get low stock products (stock < 10)
  export const getLowStockProducts = async () => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(
        productsRef, 
        where('stock', '<', 10),
        where('stock', '>', 0),
        orderBy('stock', 'asc')
      );
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || new Date().toISOString().split('T')[0]
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error getting low stock products:', error);
      throw error;
    }
  };
  
  // Get out of stock products
  export const getOutOfStockProducts = async () => {
    try {
      const productsRef = collection(db, PRODUCTS_COLLECTION);
      const q = query(
        productsRef, 
        where('stock', '==', 0),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      
      const products = [];
      snapshot.forEach((doc) => {
        products.push({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.()?.split('T')[0] || new Date().toISOString().split('T')[0]
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error getting out of stock products:', error);
      throw error;
    }
  };
  
  // Update product stock
  export const updateProductStock = async (productId, newStock) => {
    try {
      const productRef = doc(db, PRODUCTS_COLLECTION, productId);
      
      // Determine status based on stock
      let status = 'Active';
      if (newStock === 0) {
        status = 'Out of Stock';
      }
      
      await updateDoc(productRef, {
        stock: newStock,
        status: status,
        updatedAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error('Error updating product stock:', error);
      throw error;
    }
  };
  
  // Search products
  export const searchProducts = async (searchTerm) => {
    try {
      // Firebase doesn't support full-text search, so we'll get all products
      // and filter on client side. For production, consider using Algolia or similar.
      const products = await getAllProducts();
      
      const filteredProducts = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return filteredProducts;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  };
  
  // Get product statistics
  export const getProductStats = async () => {
    try {
      const products = await getAllProducts();
      
      const stats = {
        total: products.length,
        active: products.filter(p => p.status === 'Active').length,
        inactive: products.filter(p => p.status === 'Inactive').length,
        outOfStock: products.filter(p => p.stock === 0).length,
        lowStock: products.filter(p => p.stock > 0 && p.stock < 10).length,
        totalValue: products.reduce((sum, p) => sum + (p.price * p.stock), 0),
        categories: [...new Set(products.map(p => p.category))].length
      };
      
      return stats;
    } catch (error) {
      console.error('Error getting product stats:', error);
      throw error;
    }
  };
  
  // Bulk update products
  export const bulkUpdateProducts = async (updates) => {
    try {
      const updatePromises = updates.map(({ id, data }) => {
        const productRef = doc(db, PRODUCTS_COLLECTION, id);
        return updateDoc(productRef, {
          ...data,
          updatedAt: serverTimestamp()
        });
      });
      
      await Promise.all(updatePromises);
      return true;
    } catch (error) {
      console.error('Error bulk updating products:', error);
      throw error;
    }
  };
  
  // Add sample products (for testing)
  export const addSampleProducts = async () => {
    const sampleProducts = [
      {
        name: 'Smartphone Samsung Galaxy S24',
        category: 'Electronics',
        price: 12000000,
        stock: 25,
        status: 'Active',
        image: '/api/placeholder/100/100',
        description: 'Smartphone flagship terbaru dengan kamera canggih dan performa tinggi'
      },
      {
        name: 'Laptop ASUS ROG Strix',
        category: 'Electronics',
        price: 18500000,
        stock: 8,
        status: 'Active',
        image: '/api/placeholder/100/100',
        description: 'Laptop gaming dengan spesifikasi tinggi untuk performa maksimal'
      },
      {
        name: 'Sepatu Nike Air Max',
        category: 'Fashion',
        price: 2500000,
        stock: 45,
        status: 'Active',
        image: '/api/placeholder/100/100',
        description: 'Sepatu olahraga nyaman dengan teknologi Air Max'
      },
      {
        name: 'Kemeja Formal Pria',
        category: 'Fashion',
        price: 350000,
        stock: 0,
        status: 'Out of Stock',
        image: '/api/placeholder/100/100',
        description: 'Kemeja formal berkualitas tinggi untuk acara resmi'
      },
      {
        name: 'Headset Gaming Logitech',
        category: 'Electronics',
        price: 1200000,
        stock: 15,
        status: 'Active',
        image: '/api/placeholder/100/100',
        description: 'Headset gaming dengan kualitas suara premium'
      }
    ];
  
    try {
      const addPromises = sampleProducts.map(product => addProduct(product));
      await Promise.all(addPromises);
      return true;
    } catch (error) {
      console.error('Error adding sample products:', error);
      throw error;
    }
  };