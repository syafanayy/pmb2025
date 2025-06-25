// app/unauthorized/page.js
"use client";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function UnauthorizedPage() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleGoBack = () => {
    if (session?.user?.role === 'admin') {
      router.push('/dashboard');
    } else if (session?.user?.role === 'user') {
      router.push('/profile');
    } else {
      router.push('/');
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-red-900/30 backdrop-blur-xl border border-red-500/30 rounded-2xl p-8 text-center">
        
        {/* Icon */}
        <div className="text-6xl mb-6">🚫</div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-red-300">
          Akses Ditolak!
        </h1>
        
        {/* Message */}
        <p className="text-red-100 mb-6">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>

        {/* User Info */}
        {session && (
          <div className="bg-red-800/30 border border-red-600/30 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold mb-2 text-red-200">Informasi Akun Anda:</h3>
            <div className="space-y-1 text-sm">
              <p>👤 <span className="text-blue-300">Username:</span> {session.user.username}</p>
              <p>📧 <span className="text-green-300">Email:</span> {session.user.email}</p>
              <p>🏷️ <span className="text-purple-300">Role:</span> {session.user.role}</p>
            </div>
          </div>
        )}

        {/* Admin Warning */}
        {session?.user?.role === 'admin' && (
          <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <p className="text-purple-200 text-sm">
              📢 Anda adalah admin dan mencoba mengakses halaman user. 
              Gunakan fitur "Login as User" jika tersedia untuk mengakses area user.
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleGoBack}
            className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🏠 Kembali ke Area Anda
          </button>
          
          <Link 
            href="/"
            className="block w-full bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors text-center"
          >
            🌐 Ke Beranda
          </Link>
          
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            🚪 Logout
          </button>
        </div>

        {/* Role Info */}
        <div className="mt-6 p-4 bg-white/5 rounded-lg text-left">
          <h4 className="font-semibold mb-2 text-sm">ℹ️ Informasi Role:</h4>
          <div className="text-xs text-gray-300 space-y-1">
            <p><span className="text-red-300">Admin:</span> Akses ke /dashboard dan area admin</p>
            <p><span className="text-blue-300">User:</span> Akses ke /profile dan area user</p>
          </div>
        </div>
      </div>
    </div>
  );
}