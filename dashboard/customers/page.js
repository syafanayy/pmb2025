// app/dashboard/customers/page.js - Customers Management Page
"use client";
import { useState } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState([
    {
      id: 'CUST001',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+62812-3456-7890',
      joinDate: '2024-01-15',
      totalOrders: 12,
      totalSpent: 4200000,
      status: 'Active',
      lastOrder: '2024-06-18',
      address: 'Jl. Sudirman No. 123, Jakarta Selatan',
      birthDate: '1990-05-15'
    },
    {
      id: 'CUST002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+62813-9876-5432',
      joinDate: '2024-02-20',
      totalOrders: 8,
      totalSpent: 2800000,
      status: 'Active',
      lastOrder: '2024-06-17',
      address: 'Jl. Thamrin No. 456, Jakarta Pusat',
      birthDate: '1992-08-22'
    },
    {
      id: 'CUST003',
      name: 'Ahmad Rizki',
      email: 'ahmad@example.com',
      phone: '+62814-5555-7777',
      joinDate: '2024-03-10',
      totalOrders: 15,
      totalSpent: 5600000,
      status: 'VIP',
      lastOrder: '2024-06-18',
      address: 'Jl. Gatot Subroto No. 789, Bandung',
      birthDate: '1988-12-03'
    },
    {
      id: 'CUST004',
      name: 'Siti Nurhaliza',
      email: 'siti@example.com',
      phone: '+62815-1111-2222',
      joinDate: '2024-04-05',
      totalOrders: 5,
      totalSpent: 1200000,
      status: 'Active',
      lastOrder: '2024-06-15',
      address: 'Jl. Asia Afrika No. 321, Bandung',
      birthDate: '1995-03-18'
    },
    {
      id: 'CUST005',
      name: 'Budi Santoso',
      email: 'budi@example.com',  
      phone: '+62816-9999-8888',
      joinDate: '2024-05-12',
      totalOrders: 3,
      totalSpent: 890000,
      status: 'Inactive',
      lastOrder: '2024-05-25',
      address: 'Jl. Dipatiukur No. 654, Bandung',
      birthDate: '1985-11-07'
    },
    {
      id: 'CUST006',
      name: 'Lisa Wang',
      email: 'lisa@example.com',
      phone: '+62817-3333-4444',
      joinDate: '2024-06-01',
      totalOrders: 7,
      totalSpent: 3200000,
      status: 'Active',
      lastOrder: '2024-06-16',
      address: 'Jl. Braga No. 987, Bandung',
      birthDate: '1993-07-25'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'vip': return 'bg-purple-100 text-purple-800';
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'vip': return '👑';
      case 'active': return '✅';
      case 'inactive': return '❌';
      default: return '👤';
    }
  };

  const getCustomerTier = (totalSpent) => {
    if (totalSpent >= 5000000) return 'VIP';
    if (totalSpent >= 2000000) return 'Gold';
    if (totalSpent >= 1000000) return 'Silver';
    return 'Bronze';
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || customer.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const calculateDaysSinceJoin = (joinDate) => {
    const today = new Date();
    const join = new Date(joinDate);
    const diffTime = Math.abs(today - join);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Pelanggan</h1>
            <p className="text-gray-600 mt-1">Kelola data pelanggan dan riwayat pembelian</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <span>📊</span>
              <span>Export Data</span>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <span>📧</span>
              <span>Kirim Newsletter</span>
            </button>
          </div>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Pelanggan</p>
              <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">✅</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pelanggan Aktif</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.status === 'Active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">👑</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pelanggan VIP</p>
              <p className="text-2xl font-bold text-gray-900">
                {customers.filter(c => c.status === 'VIP').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Rata-rata Pembelian</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(customers.reduce((acc, c) => acc + c.totalSpent, 0) / customers.length)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Pelanggan</label>
            <input
              type="text"
              placeholder="Cari nama, email, atau ID pelanggan..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Semua Status</option>
              <option value="active">Active</option>
              <option value="vip">VIP</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Daftar Pelanggan ({filteredCustomers.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kontak
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pesanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Pembelian
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Terakhir Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCustomers.map(customer => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-500">
                          {customer.id} • {getCustomerTier(customer.totalSpent)}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{customer.email}</div>
                    <div className="text-sm text-gray-500">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <span className="text-lg font-semibold">{customer.totalOrders}</span>
                      <span className="ml-1 text-gray-500">pesanan</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                      <span className="mr-1">{getStatusIcon(customer.status)}</span>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(customer.lastOrder).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedCustomer(customer)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Detail
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        Email
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Detail Modal */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Detail Pelanggan</h3>
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Customer Info */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Informasi Pribadi</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCustomer.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">ID Pelanggan</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCustomer.id}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCustomer.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Telepon</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCustomer.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tanggal Lahir</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedCustomer.birthDate).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bergabung</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedCustomer.joinDate).toLocaleDateString('id-ID')}
                        <span className="text-gray-500 ml-1">
                          ({calculateDaysSinceJoin(selectedCustomer.joinDate)} hari yang lalu)
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700">Alamat</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedCustomer.address}</p>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="text-2xl">📦</span>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Total Pesanan</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCustomer.totalOrders}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="text-2xl">💰</span>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Total Pembelian</p>
                      <p className="text-lg font-bold text-gray-900">
                        {formatCurrency(selectedCustomer.totalSpent)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="text-2xl">🏆</span>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Tier Pelanggan</p>
                      <p className="text-lg font-bold text-gray-900">
                        {getCustomerTier(selectedCustomer.totalSpent)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <span className="text-2xl">📅</span>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-600">Terakhir Order</p>
                      <p className="text-sm font-bold text-gray-900">
                        {new Date(selectedCustomer.lastOrder).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedCustomer(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Tutup
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                Kirim Email
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Lihat Riwayat Pesanan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}