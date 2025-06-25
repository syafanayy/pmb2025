// app/login/page.js - Fixed Version
"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { loginWithEmail, loginWithUsername } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  // Demo accounts
  const demoAccounts = [
    { 
      username: 'admin', 
      email: 'admin@hypezone.com',
      password: 'admin123', 
      role: 'admin', 
      name: 'Administrator' 
    },
    { 
      username: 'user1', 
      email: 'user1@hypezone.com',
      password: 'user123', 
      role: 'user', 
      name: 'Regular User' 
    }
  ];

  // Fixed auth state monitoring
  useEffect(() => {
    let mounted = true;
    let redirectTimer = null;
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('🔥 Auth state changed:', currentUser?.email);
      
      if (!mounted) return;

      try {
        if (currentUser) {
          // Get user data from Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = {
              uid: currentUser.uid,
              email: currentUser.email,
              ...userDoc.data()
            };
            
            console.log('✅ User data loaded:', userData);
            setUser(userData);
            setError('');
            setIsRedirecting(true);
            
            // Clear any existing timer
            if (redirectTimer) clearTimeout(redirectTimer);
            
            // Delayed redirect to prevent loops
            redirectTimer = setTimeout(() => {
              if (mounted) {
                console.log('🔄 Redirecting user based on role:', userData.role);
                if (userData.role === 'admin') {
                  window.location.href = '/dashboard';
                } else {
                  window.location.href = '/profile';
                }
              }
            }, 2000);
            
          } else {
            console.error('❌ User document not found');
            setError('Data pengguna tidak ditemukan di database');
            await signOut(auth);
            setUser(null);
            setIsRedirecting(false);
          }
        } else {
          setUser(null);
          setIsRedirecting(false);
        }
      } catch (error) {
        console.error('❌ Error in auth state:', error);
        setError('Terjadi kesalahan: ' + error.message);
        setUser(null);
        setIsRedirecting(false);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      if (redirectTimer) clearTimeout(redirectTimer);
      unsubscribe();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setError('');

    try {
      const { username, password } = credentials;
      
      if (!username.trim() || !password.trim()) {
        setError('Username dan password harus diisi');
        return;
      }

      console.log('🔄 Attempting login with:', username);
      
      let result;
      if (username.includes('@')) {
        result = await loginWithEmail(username.trim(), password);
      } else {
        result = await loginWithUsername(username.trim(), password);
      }

      if (!result.success) {
        // Translate error messages
        let errorMessage = result.error;
        
        if (errorMessage.includes('auth/user-not-found') || errorMessage.includes('auth/invalid-credential')) {
          errorMessage = 'Username/email atau password salah';
        } else if (errorMessage.includes('auth/wrong-password')) {
          errorMessage = 'Password salah';
        } else if (errorMessage.includes('auth/invalid-email')) {
          errorMessage = 'Format email tidak valid';
        } else if (errorMessage.includes('auth/too-many-requests')) {
          errorMessage = 'Terlalu banyak percobaan login. Coba lagi nanti';
        }
        
        setError(errorMessage);
      } else {
        console.log('✅ Login successful, waiting for auth state change...');
      }
      
    } catch (err) {
      console.error('❌ Login error:', err);
      setError('Terjadi kesalahan saat login: ' + err.message);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleDemoLogin = async (account) => {
    setCredentials({
      username: account.username,
      password: account.password
    });
    
    setLoginLoading(true);
    setError('');

    try {
      const result = await loginWithUsername(account.username, account.password);
      
      if (!result.success) {
        setError(result.error);
      } else {
        console.log('✅ Demo login successful');
      }
    } catch (err) {
      console.error('❌ Demo login error:', err);
      setError('Terjadi kesalahan saat login demo');
    } finally {
      setLoginLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Memuat Firebase...
          </div>
        </div>
      </div>
    );
  }

  // Redirect state
  if (user && isRedirecting) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            Login Berhasil! 🎉
          </div>
          <p className="text-gray-300">Selamat datang, {user.name}!</p>
          <p className="text-sm text-gray-400 mt-2">Role: {user.role}</p>
          <p className="text-xs text-gray-500 mt-4">Mengalihkan ke dashboard...</p>
          
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-green-300 text-sm">✅ Autentikasi berhasil</p>
            <p className="text-xs text-green-400 mt-1">Tunggu sebentar...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20"></div>
      
      <div className="relative z-10 container mx-auto p-4 lg:p-8 min-h-screen flex items-center justify-center">
        <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 border-blue-500/30 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border max-w-md w-full">
          
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🎮</div>
            <h1 className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
              HYPEZONE
            </h1>
            <p className="text-gray-300">Masuk ke akun Anda</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 p-4 rounded-lg mb-6">
              <p className="text-red-300 text-sm">❌ {error}</p>
              <button
                onClick={() => setError('')}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
              >
                Tutup
              </button>
            </div>
          )}

          {/* Firebase Status */}
          <div className="mb-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-xs text-blue-300">
              🔥 Firebase: {auth ? '✅ Terhubung' : '❌ Tidak Terhubung'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Auth State: {user ? '✅ Authenticated' : '❌ Not Authenticated'}
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="mb-6">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="w-full bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 p-3 rounded-lg text-purple-300 transition-colors text-sm"
            >
              🧪 {showDemo ? 'Sembunyikan' : 'Tampilkan'} Akun Demo
            </button>
            
            {showDemo && (
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-400 mb-3">Klik untuk login otomatis:</p>
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => handleDemoLogin(account)}
                    disabled={loginLoading}
                    className="w-full bg-white/5 hover:bg-white/10 border border-gray-600 p-3 rounded-lg text-left transition-colors disabled:opacity-50"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-sm">{account.name}</div>
                        <div className="text-xs text-gray-400">@{account.username}</div>
                        <div className="text-xs text-gray-500">{account.email}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        account.role === 'admin' 
                          ? 'bg-red-500/20 text-red-300' 
                          : 'bg-blue-500/20 text-blue-300'
                      }`}>
                        {account.role}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Username / Email
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full bg-white/10 border border-gray-600 px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Masukkan username atau email"
                required
                disabled={loginLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full bg-white/10 border border-gray-600 px-4 py-3 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors"
                placeholder="Masukkan password"
                required
                disabled={loginLoading}
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              {loginLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Memproses...
                </div>
              ) : (
                '🚀 Masuk'
              )}
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-8 text-center space-y-4">
            <div className="text-sm text-gray-400">
              Belum punya akun? 
              <Link href="/register" className="text-cyan-400 hover:text-cyan-300 ml-1">
                Daftar di sini
              </Link>
            </div>
            
            <div className="text-sm">
              <Link href="/" className="text-blue-400 hover:text-blue-300">
                ← Kembali ke Beranda
              </Link>
            </div>
          </div>

          {/* Debug Info */}
          <div className="mt-6 p-4 bg-white/5 rounded-lg">
            <h4 className="font-semibold mb-2 text-sm">🔧 Debug Info:</h4>
            <div className="text-xs text-gray-400 space-y-1">
              <p>Auth: {auth ? '✅' : '❌'}</p>
              <p>User: {user ? '✅ ' + user.name : '❌ None'}</p>
              <p>Loading: {loading ? '✅' : '❌'}</p>
              <p>Redirecting: {isRedirecting ? '✅' : '❌'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}