"use client";
import { useSession, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    address: '',
    birthDate: '',
    gender: ''
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (session?.user?.role === 'admin') {
      router.push('/dashboard');
    }
  }, [status, session, router]);

  // Mock data untuk demo
  const orderHistory = [
    { id: 'ORD001', date: '2024-06-15', total: 'Rp 250.000', status: 'Selesai', items: 2 },
    { id: 'ORD002', date: '2024-06-10', total: 'Rp 150.000', status: 'Dikirim', items: 1 },
    { id: 'ORD003', date: '2024-06-05', total: 'Rp 400.000', status: 'Dibatalkan', items: 3 }
  ];

  const wishlistItems = [
    { id: 1, name: 'Gaming Mouse RGB', price: 'Rp 180.000', image: '🖱️' },
    { id: 2, name: 'Mechanical Keyboard', price: 'Rp 350.000', image: '⌨️' },
    { id: 3, name: 'Gaming Headset', price: 'Rp 220.000', image: '🎧' }
  ];

  const addressBook = [
    { id: 1, label: 'Rumah', address: 'Jl. Sudirman No. 123, Jakarta Pusat', phone: '081234567890', isDefault: true },
    { id: 2, label: 'Kantor', address: 'Jl. Thamrin No. 456, Jakarta Pusat', phone: '081234567891', isDefault: false }
  ];

  // Show loading state
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Memuat...
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session) {
    return null;
  }

  const handleSaveProfile = () => {
    // Logic untuk save profile
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'selesai': return 'text-green-400';
      case 'dikirim': return 'text-blue-400';
      case 'dibatalkan': return 'text-red-400';
      case 'diproses': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(34,211,238,0.1),transparent)]"></div>
      
      <div className="relative z-10 container mx-auto p-4 lg:p-8">
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                👤
              </div>
              <button className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-600 p-2 rounded-full text-sm transition-colors">
                📷
              </button>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              {session.user.username || session.user.name}
            </h1>
            <p className="text-gray-300 text-lg">
              Kelola akun HYPEZONE kamu
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: 'profile', label: 'Profil', icon: '👤' },
              { id: 'orders', label: 'Pesanan', icon: '📦' },
              { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
              { id: 'address', label: 'Alamat', icon: '📍' },
              { id: 'settings', label: 'Pengaturan', icon: '⚙️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' 
                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {/* Content based on active tab */}
          {activeTab === 'profile' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Account Info */}
              <div className="bg-blue-500/20 p-6 rounded-xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-blue-300">Informasi Akun</h3>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm transition-colors"
                  >
                    {isEditing ? '💾 Simpan' : '✏️ Edit'}
                  </button>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Username', value: session.user.username || session.user.name, key: 'username' },
                    { label: 'Email', value: session.user.email, key: 'email' },
                    { label: 'Nama Lengkap', value: profileData.fullName || 'Belum diisi', key: 'fullName' },
                    { label: 'No. Telepon', value: profileData.phone || 'Belum diisi', key: 'phone' },
                    { label: 'Tanggal Lahir', value: profileData.birthDate || 'Belum diisi', key: 'birthDate' },
                    { label: 'Jenis Kelamin', value: profileData.gender || 'Belum diisi', key: 'gender' }
                  ].map(field => (
                    <div key={field.key}>
                      <label className="block text-sm font-semibold text-gray-300 mb-1">{field.label}</label>
                      {isEditing && field.key !== 'username' && field.key !== 'email' ? (
                        field.key === 'gender' ? (
                          <select 
                            className="w-full bg-white/10 px-4 py-2 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                            value={profileData[field.key]}
                            onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                          >
                            <option value="">Pilih</option>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        ) : (
                          <input 
                            type={field.key === 'birthDate' ? 'date' : 'text'}
                            className="w-full bg-white/10 px-4 py-2 rounded-lg border border-gray-600 focus:border-cyan-500 focus:outline-none"
                            value={profileData[field.key]}
                            onChange={(e) => setProfileData({...profileData, [field.key]: e.target.value})}
                          />
                        )
                      ) : (
                        <div className="bg-white/10 px-4 py-2 rounded-lg">
                          {field.value}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="bg-cyan-500/20 p-6 rounded-xl">
                <h3 className="text-xl font-bold mb-4 text-cyan-300">Statistik Akun</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-400">12</div>
                    <div className="text-sm text-gray-300">Total Pesanan</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">3</div>
                    <div className="text-sm text-gray-300">Wishlist</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">Rp 2.1M</div>
                    <div className="text-sm text-gray-300">Total Belanja</div>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-400">Gold</div>
                    <div className="text-sm text-gray-300">Member Status</div>
                  </div>
                </div>
                
                {/* Loyalty Points */}
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-600/20 to-yellow-500/20 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">💎 Poin Loyalitas</span>
                    <span className="text-yellow-400 font-bold">1,250 Poin</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-2 rounded-full" style={{width: '75%'}}></div>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">250 poin lagi untuk naik ke Platinum</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-teal-500/20 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-teal-300">Riwayat Pesanan</h3>
              <div className="space-y-4">
                {orderHistory.map(order => (
                  <div key={order.id} className="bg-white/10 p-4 rounded-lg">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
                      <div>
                        <div className="font-semibold">#{order.id}</div>
                        <div className="text-sm text-gray-400">{order.date} • {order.items} item</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold">{order.total}</div>
                          <div className={`text-sm ${getStatusColor(order.status)}`}>{order.status}</div>
                        </div>
                        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg text-sm transition-colors">
                          Detail
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-pink-500/20 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-pink-300">Wishlist Saya</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistItems.map(item => (
                  <div key={item.id} className="bg-white/10 p-4 rounded-lg">
                    <div className="text-4xl mb-2 text-center">{item.image}</div>
                    <h4 className="font-semibold mb-2">{item.name}</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 font-bold">{item.price}</span>
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors">
                          🛒
                        </button>
                        <button className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors">
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'address' && (
            <div className="bg-green-500/20 p-6 rounded-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-green-300">Buku Alamat</h3>
                <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  ➕ Tambah Alamat
                </button>
              </div>
              <div className="space-y-4">
                {addressBook.map(addr => (
                  <div key={addr.id} className="bg-white/10 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{addr.label}</span>
                        {addr.isDefault && (
                          <span className="px-2 py-1 bg-blue-600 text-xs rounded">Default</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-blue-400 hover:text-blue-300">✏️</button>
                        <button className="text-red-400 hover:text-red-300">🗑️</button>
                      </div>
                    </div>
                    <div className="text-gray-300 mb-1">{addr.address}</div>
                    <div className="text-sm text-gray-400">{addr.phone}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-purple-500/20 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-purple-300">Pengaturan</h3>
              <div className="space-y-6">
                {/* Security Settings */}
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4">🔒 Keamanan</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      🔑 Ubah Password
                    </button>
                    <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      📱 Two-Factor Authentication
                    </button>
                    <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      📧 Ubah Email
                    </button>
                  </div>
                </div>

                {/* Notification Settings */}
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4">🔔 Notifikasi</h4>
                  <div className="space-y-3">
                    {[
                      'Email Marketing',
                      'Notifikasi Pesanan',
                      'Promo & Diskon',
                      'Newsletter'
                    ].map(setting => (
                      <div key={setting} className="flex justify-between items-center">
                        <span>{setting}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked />
                          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Privacy Settings */}
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-semibold mb-4">🛡️ Privasi</h4>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      📊 Data Pribadi
                    </button>
                    <button className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      🗑️ Hapus Akun
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
              href="/"
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 text-center"
            >
              🏠 Kembali ke Beranda
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105"
            >
              🚪 Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}