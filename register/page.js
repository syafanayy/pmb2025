// app/register/page.js - Registration Page with Firebase
"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser } from '@/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter');
      setLoading(false);
      return;
    }

    try {
      const result = await registerUser({
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user' // Default role
      });

      if (result.success) {
        // Registration successful, redirect to login
        router.push('/login?message=Registration successful! Please login.');
      } else {
        // Handle errors
        let errorMessage = result.error;
        if (result.error.includes('email-already-in-use')) {
          errorMessage = 'Email sudah terdaftar';
        } else if (result.error.includes('weak-password')) {
          errorMessage = 'Password terlalu lemah';
        } else if (result.error.includes('invalid-email')) {
          errorMessage = 'Format email tidak valid';
        } else if (result.error.includes('Username already exists')) {
          errorMessage = 'Username sudah digunakan';
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError('Terjadi kesalahan saat mendaftar');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.1),transparent)]"></div>
      
      <div className="relative z-10 container mx-auto p-4 lg:p-8 min-h-screen flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border max-w-md w-full">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              HYPEZONE
            </h1>
            <p className="text-gray-300">
              Buat akun baru Anda
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg mb-6">
              <p className="text-red-300 text-sm">❌ {error}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-600 px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Pilih username unik"
                required
                disabled={loading}
                minLength={3}
              />
              <p className="text-xs text-gray-400 mt-1">Minimal 3 karakter, hanya huruf, angka, dan underscore</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-600 px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Masukkan nama lengkap"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-600 px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-600 px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Minimal 6 karakter"
                required
                disabled={loading}
                minLength={6}
              />
              <p className="text-xs text-gray-400 mt-1">Minimal 6 karakter</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Konfirmasi Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-white/10 border border-gray-600 px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Ulangi password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Mendaftar...
                </div>
              ) : (
                '✨ Daftar Sekarang'
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-sm text-gray-400">
              Sudah punya akun? 
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 ml-1">
                Masuk di sini
              </Link>
            </div>
            
            <div className="text-sm">
              <Link href="/" className="text-blue-400 hover:text-blue-300">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <p className="text-xs text-gray-400 text-center">
              Dengan mendaftar, Anda menyetujui <span className="text-cyan-400">Syarat & Ketentuan</span> dan <span className="text-cyan-400">Kebijakan Privasi</span> kami.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}