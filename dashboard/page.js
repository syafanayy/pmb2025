// app/dashboard/page.js
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, collection, getDocs, addDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { Upload, Edit2, Trash2, Check, X, Eye, Plus, Search, Filter } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    status: 'active'
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            const userData = { uid: currentUser.uid, email: currentUser.email, ...userDoc.data() };
            
            if (userData.role !== 'admin') {
              router.push('/profile');
              return;
            }
            
            setUser(userData);
            await loadData();
          } else {
            router.push('/login');
          }
        } catch (error) {
          console.error('Error:', error);
          router.push('/login');
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const loadData = async () => {
    try {
      // Load products
      const productsRef = collection(db, 'products');
      const productsSnap = await getDocs(productsRef);
      const productsData = productsSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);

      // Load users
      const usersRef = collection(db, 'users');
      const usersSnap = await getDocs(usersRef);
      const usersData = usersSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'products'), {
        ...productForm,
        price: parseFloat(productForm.price),
        createdAt: new Date(),
        createdBy: user.uid
      });
      
      setProductForm({ name: '', description: '', price: '', category: '', image: '', status: 'active' });
      setShowAddProduct(false);
      await loadData();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      const productRef = doc(db, 'products', editingProduct.id);
      await updateDoc(productRef, {
        ...productForm,
        price: parseFloat(productForm.price),
        updatedAt: new Date()
      });
      
      setEditingProduct(null);
      setProductForm({ name: '', description: '', price: '', category: '', image: '', status: 'active' });
      await loadData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (confirm('Yakin ingin menghapus produk ini?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
        await loadData();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleVerifyUser = async (userId, isVerified) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        isVerified: isVerified,
        verifiedAt: isVerified ? new Date() : null,
        verifiedBy: isVerified ? user.uid : null
      });
      await loadData();
    } catch (error) {
      console.error('Error updating user verification:', error);
    }
  };

  const startEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      status: product.status
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || product.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto p-8">
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-xl rounded-3xl p-8 border">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Dashboard Admin
              </h1>
              <p className="text-gray-300 mt-2">Selamat datang, {user.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 px-4 py-2 rounded-lg text-red-300 transition-colors"
            >
              Logout
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-4 mb-8">
            {['overview', 'products', 'users', 'verification'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-blue-500/30 border border-blue-500/50 text-blue-300'
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Total Products</h3>
                  <p className="text-3xl font-bold text-cyan-400">{products.length}</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Total Users</h3>
                  <p className="text-3xl font-bold text-green-400">{users.length}</p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Verified Users</h3>
                  <p className="text-3xl font-bold text-blue-400">
                    {users.filter(u => u.isVerified).length}
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Active Products</h3>
                  <p className="text-3xl font-bold text-yellow-400">
                    {products.filter(p => p.status === 'active').length}
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
                <p className="text-green-300">✅ Dashboard admin berhasil dimuat!</p>
                <p className="text-sm text-green-400 mt-1">Role: {user.role} | UID: {user.uid}</p>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Manajemen Produk</h2>
                <button
                  onClick={() => setShowAddProduct(true)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 px-4 py-2 rounded-lg text-blue-300 transition-colors flex items-center gap-2"
                >
                  <Plus size={16} />
                  Tambah Produk
                </button>
              </div>

              <div className="flex gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Cari produk..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white"
                  />
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="all">Semua Status</option>
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="bg-white/10 rounded-lg overflow-hidden">
                    <div className="h-48 bg-gray-700 flex items-center justify-center">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400">No Image</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                      <p className="text-cyan-400 font-bold mb-2">Rp {product.price?.toLocaleString()}</p>
                      <p className="text-xs text-gray-400 mb-3">Kategori: {product.category}</p>
                      <div className="flex justify-between items-center">
                        <span className={`px-2 py-1 rounded text-xs ${
                          product.status === 'active' 
                            ? 'bg-green-500/20 text-green-300' 
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                          {product.status}
                        </span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEditProduct(product)}
                            className="p-1 bg-blue-500/20 hover:bg-blue-500/30 rounded text-blue-300"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1 bg-red-500/20 hover:bg-red-500/30 rounded text-red-300"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Manajemen User</h2>
              
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Cari user..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white/10 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white"
                  />
                </div>
              </div>

              <div className="bg-white/10 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-white/20">
                    <tr>
                      <th className="text-left p-4">Nama</th>
                      <th className="text-left p-4">Email</th>
                      <th className="text-left p-4">Role</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-t border-white/10">
                        <td className="p-4">{user.name || 'N/A'}</td>
                        <td className="p-4">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.role === 'admin' 
                              ? 'bg-purple-500/20 text-purple-300'
                              : 'bg-gray-500/20 text-gray-300'
                          }`}>
                            {user.role || 'user'}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.isVerified 
                              ? 'bg-green-500/20 text-green-300'
                              : 'bg-yellow-500/20 text-yellow-300'
                          }`}>
                            {user.isVerified ? 'Terverifikasi' : 'Belum Verifikasi'}
                          </span>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => handleVerifyUser(user.id, !user.isVerified)}
                            className={`p-1 rounded ${
                              user.isVerified
                                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-300'
                                : 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
                            }`}
                          >
                            {user.isVerified ? <X size={14} /> : <Check size={14} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Verification Tab */}
          {activeTab === 'verification' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Verifikasi Pengguna</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-yellow-400">Menunggu Verifikasi</h3>
                  <div className="space-y-3">
                    {users.filter(u => !u.isVerified).map((user) => (
                      <div key={user.id} className="flex justify-between items-center p-3 bg-white/10 rounded">
                        <div>
                          <p className="font-medium">{user.name || 'N/A'}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <button
                          onClick={() => handleVerifyUser(user.id, true)}
                          className="bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 px-3 py-1 rounded text-green-300 text-sm"
                        >
                          Verifikasi
                        </button>
                      </div>
                    ))}
                    {users.filter(u => !u.isVerified).length === 0 && (
                      <p className="text-gray-400">Tidak ada pengguna yang menunggu verifikasi</p>
                    )}
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 text-green-400">Sudah Terverifikasi</h3>
                  <div className="space-y-3">
                    {users.filter(u => u.isVerified).map((user) => (
                      <div key={user.id} className="flex justify-between items-center p-3 bg-white/10 rounded">
                        <div>
                          <p className="font-medium">{user.name || 'N/A'}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                        <button
                          onClick={() => handleVerifyUser(user.id, false)}
                          className="bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 px-3 py-1 rounded text-red-300 text-sm"
                        >
                          Batal Verifikasi
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Tambah Produk Baru</h3>
            <form onSubmit={handleAddProduct}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
                <textarea
                  placeholder="Deskripsi"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  rows="3"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Kategori"
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
                <input
                  type="url"
                  placeholder="URL Gambar"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
                <select
                  value={productForm.status}
                  onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 py-2 rounded-lg text-blue-300"
                >
                  Tambah
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddProduct(false)}
                  className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 py-2 rounded-lg text-gray-300"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Edit Produk</h3>
            <form onSubmit={handleEditProduct}>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  value={productForm.name}
                  onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
                <textarea
                  placeholder="Deskripsi"
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  rows="3"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={productForm.price}
                  onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Kategori"
                  value={productForm.category}
                  onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  required
                />
                <input
                  type="url"
                  placeholder="URL Gambar"
                  value={productForm.image}
                  onChange={(e) => setProductForm({...productForm, image: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                />
                <select
                  value={productForm.status}
                  onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                  className="w-full bg-white/10 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="active">Aktif</option>
                  <option value="inactive">Tidak Aktif</option>
                </select>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 py-2 rounded-lg text-blue-300"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingProduct(null);
                    setProductForm({ name: '', description: '', price: '', category: '', image: '', status: 'active' });
                  }}
                  className="flex-1 bg-gray-500/20 hover:bg-gray-500/30 border border-gray-500/50 py-2 rounded-lg text-gray-300"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}