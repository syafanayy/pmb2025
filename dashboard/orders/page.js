// app/dashboard/orders/page.js - Orders Management Page
"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD1001',
      customer: 'John Doe',
      email: 'john@example.com',
      phone: '+62812-3456-7890',
      total: 350000,
      status: 'Pending',
      date: '2024-06-18 10:30',
      items: 2,
      paymentMethod: 'Bank Transfer',
      shippingAddress: 'Jl. Sudirman No. 123, Jakarta'
    },
    {
      id: 'ORD1002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+62813-9876-5432',
      total: 125000,
      status: 'Processing',
      date: '2024-06-18 09:15',
      items: 1,
      paymentMethod: 'Credit Card',
      shippingAddress: 'Jl. Thamrin No. 456, Jakarta'
    },
    {
      id: 'ORD1003',
      customer: 'Ahmad Rizki',
      email: 'ahmad@example.com',
      phone: '+62814-5555-7777',
      total: 780000,
      status: 'Shipped',
      date: '2024-06-18 08:45',
      items: 3,
      paymentMethod: 'E-Wallet',
      shippingAddress: 'Jl. Gatot Subroto No. 789, Bandung'
    },
    {
      id: 'ORD1004',
      customer: 'Siti Nurhaliza',
      email: 'siti@example.com',
      phone: '+62815-1111-2222',
      total: 200000,
      status: 'Delivered',
      date: '2024-06-17 16:20',
      items: 1,
      paymentMethod: 'Bank Transfer',
      shippingAddress: 'Jl. Asia Afrika No. 321, Bandung'
    },
    {
      id: 'ORD1005',
      customer: 'Budi Santoso',
      email: 'budi@example.com',
      phone: '+62816-9999-8888',
      total: 450000,
      status: 'Cancelled',
      date: '2024-06-17 14:10',
      items: 2,
      paymentMethod: 'Credit Card',
      shippingAddress: 'Jl. Dipatiukur No. 654, Bandung'
    },
    {
      id: 'ORD1006',
      customer: 'Lisa Wang',
      email: 'lisa@example.com',
      phone: '+62817-3333-4444',
      total: 920000,
      status: 'Processing',
      date: '2024-06-17 13:45',
      items: 4,
      paymentMethod: 'E-Wallet',
      shippingAddress: 'Jl. Braga No. 987, Bandung'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const getStatusColor = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status.toLowerCase()) {
      case 'delivered': return '✅';
      case 'shipped': return '🚚';
      case 'processing': return '⏳';
      case 'pending': return '🕐';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  const statusOptions = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Pesanan</h1>
            <p className="text-gray-600 mt-1">Kelola semua pesanan pelanggan</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <span>📊</span>
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cari Pesanan</label>
            <input
              type="text"
              placeholder="Cari ID pesanan, nama, atau email..."
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
              {statusOptions.map(status => (
                <option key={status} value={status.toLowerCase()}>{status}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {statusOptions.map(status => {
          const count = orders.filter(order => order.status === status).length;
          return (
            <div key={status} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center">
                <span className="text-2xl mr-3">{getStatusIcon(status)}</span>
                <div>
                  <p className="text-sm font-medium text-gray-600">{status}</p>
                  <p className="text-xl font-bold text-gray-900">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Daftar Pesanan ({filteredOrders.length})
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID Pesanan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pelanggan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <span className="text-indigo-600 font-semibold text-sm">
                          #{order.id.slice(-3)}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{order.id}</div>
                        <div className="text-sm text-gray-500">{order.items} item</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                    <div className="text-sm text-gray-500">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      <span className="mr-1">{getStatusIcon(order.status)}</span>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(order.date).toLocaleDateString('id-ID')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedOrder(order)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        Detail
                      </button>
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1"
                      >
                        {statusOptions.map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Detail Pesanan {selectedOrder.id}</h3>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Pelanggan</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedOrder.customer}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedOrder.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telepon</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedOrder.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Metode Pembayaran</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedOrder.paymentMethod}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Alamat Pengiriman</label>
                <p className="mt-1 text-sm text-gray-900">{selectedOrder.shippingAddress}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total</label>
                  <p className="mt-1 text-lg font-semibold text-gray-900">{formatCurrency(selectedOrder.total)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)} mt-1`}>
                    <span className="mr-1">{getStatusIcon(selectedOrder.status)}</span>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Tutup
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}