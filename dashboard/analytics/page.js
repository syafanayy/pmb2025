// app/dashboard/analytics/page.js - Analytics & Reports Page
"use client";
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Sample data for charts
  const revenueData = [
    { date: '2024-06-12', revenue: 2500000, orders: 15, customers: 12 },
    { date: '2024-06-13', revenue: 3200000, orders: 18, customers: 15 },
    { date: '2024-06-14', revenue: 2800000, orders: 16, customers: 14 },
    { date: '2024-06-15', revenue: 4100000, orders: 22, customers: 18 },
    { date: '2024-06-16', revenue: 3600000, orders: 20, customers: 16 },
    { date: '2024-06-17', revenue: 2900000, orders: 17, customers: 13 },
    { date: '2024-06-18', revenue: 3800000, orders: 21, customers: 17 }
  ];

  const categoryData = [
    { name: 'Electronics', value: 45, revenue: 18500000 },
    { name: 'Fashion', value: 30, revenue: 12300000 },
    { name: 'Home & Garden', value: 15, revenue: 6200000 },
    { name: 'Sports', value: 10, revenue: 4100000 }
  ];

  const topProducts = [
    { name: 'Smartphone Samsung Galaxy S24', sold: 45, revenue: 12000000 },
    { name: 'Laptop ASUS ROG Strix', sold: 23, revenue: 8500000 },
    { name: 'Sepatu Nike Air Max', sold: 67, revenue: 5600000 },
    { name: 'Headset Gaming Logitech', sold: 34, revenue: 4200000 },
    { name: 'Kemeja Formal Pria', sold: 89, revenue: 3100000 }
  ];

  const monthlyData = [
    { month: 'Jan', revenue: 45000000, orders: 320, customers: 280 },
    { month: 'Feb', revenue: 52000000, orders: 385, customers: 340 },
    { month: 'Mar', revenue: 48000000, orders: 350, customers: 310 },
    { month: 'Apr', revenue: 61000000, orders: 420, customers: 380 },
    { month: 'May', revenue: 55000000, orders: 390, customers: 350 },
    { month: 'Jun', revenue: 58000000, orders: 410, customers: 370 }
  ];

  const trafficSources = [
    { name: 'Organic Search', visitors: 3500, percentage: 45 },
    { name: 'Social Media', visitors: 2100, percentage: 27 },
    { name: 'Direct', visitors: 1400, percentage: 18 },
    { name: 'Paid Ads', visitors: 800, percentage: 10 }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateGrowth = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  const totalRevenue = revenueData.reduce((acc, day) => acc + day.revenue, 0);
  const totalOrders = revenueData.reduce((acc, day) => acc + day.orders, 0);
  const totalCustomers = revenueData.reduce((acc, day) => acc + day.customers, 0);
  const avgOrderValue = totalRevenue / totalOrders;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Laporan</h1>
            <p className="text-gray-600 mt-1">Analisis performa toko dan laporan penjualan</p>
          </div>
          <div className="flex space-x-3">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7days">7 Hari Terakhir</option>
              <option value="30days">30 Hari Terakhir</option>
              <option value="90days">90 Hari Terakhir</option>
              <option value="1year">1 Tahun Terakhir</option>
            </select>
            <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
              <span>📊</span>
              <span>Export Laporan</span>
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-xl">💰</span>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
              +12.5%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Pendapatan</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-green-600 text-xl">📦</span>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
              +8.3%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{totalOrders}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Pesanan</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-purple-600 text-xl">👥</span>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
              +15.2%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{totalCustomers}</h3>
            <p className="text-gray-600 text-sm mt-1">Total Pelanggan</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-orange-600 text-xl">🛒</span>
            </div>
            <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded-full">
              +5.7%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-2xl font-bold text-gray-900">{formatCurrency(avgOrderValue)}</h3>
            <p className="text-gray-600 text-sm mt-1">Rata-rata Nilai Pesanan</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Tren Pendapatan</h2>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="revenue">Pendapatan</option>
              <option value="orders">Pesanan</option>
              <option value="customers">Pelanggan</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate}
                fontSize={12}
              />
              <YAxis 
                tickFormatter={selectedMetric === 'revenue' ? (value) => formatCurrency(value).slice(0, -3) + 'K' : undefined}
                fontSize={12}
              />
              <Tooltip 
                labelFormatter={(value) => formatDate(value)}
                formatter={(value, name) => [
                  selectedMetric === 'revenue' ? formatCurrency(value) : value,
                  name === 'revenue' ? 'Pendapatan' : name === 'orders' ? 'Pesanan' : 'Pelanggan'
                ]}
              />
              <Line
                type="monotone"
                dataKey={selectedMetric}
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Distribusi Kategori</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name} (${value}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Persentase']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Performa Bulanan</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => formatCurrency(value).slice(0, -3) + 'K'} />
            <Tooltip 
              formatter={(value, name) => [
                name === 'revenue' ? formatCurrency(value) : value,
                name === 'revenue' ? 'Pendapatan' : name === 'orders' ? 'Pesanan' : 'Pelanggan'
              ]}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#3B82F6" name="Pendapatan" />
            <Bar dataKey="orders" fill="#10B981" name="Pesanan" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Produk Terlaris</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <p className="text-gray-600 text-xs">{product.sold} terjual</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">{formatCurrency(product.revenue)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Sumber Traffic</h2>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900">{source.name}</span>
                  <span className="text-sm text-gray-600">{source.visitors.toLocaleString()} ({source.percentage}%)</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Ringkasan Statistik</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600 mb-2">92.5%</div>
            <div className="text-sm text-gray-600">Tingkat Kepuasan Pelanggan</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600 mb-2">24 menit</div>
            <div className="text-sm text-gray-600">Rata-rata Waktu di Situs</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600 mb-2">3.2%</div>
            <div className="text-sm text-gray-600">Tingkat Konversi</div>
          </div>
        </div>
      </div>
    </div>
  );
}