// components/AdminUserSwitcher.js - COMPLETED VERSION
"use client";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminUserSwitcher() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [showUserList, setShowUserList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isImpersonating, setIsImpersonating] = useState(false);

  // Mock user list - replace with actual API call
  const availableUsers = [
    { id: '2', username: 'user1', name: 'Regular User', email: 'user1@example.com' },
    { id: '3', username: 'johndoe', name: 'John Doe', email: 'john@example.com' }
  ];

  useEffect(() => {
    // Check if currently impersonating
    const originalSession = localStorage.getItem('originalAdminSession');
    setIsImpersonating(!!originalSession);
  }, []);

  // Only show for admin users
  if (!session || session.user.role !== 'admin') {
    return null;
  }

  const handleLoginAsUser = async (user) => {
    setLoading(true);
    
    try {
      // Store original admin session info
      localStorage.setItem('originalAdminSession', JSON.stringify({
        id: session.user.id,
        username: session.user.username,
        email: session.user.email,
        role: session.user.role,
        name: session.user.name
      }));
      
      // Call API to create impersonation session
      const response = await fetch('/api/admin/impersonate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          targetUserId: user.id,
          adminId: session.user.id
        })
      });

      if (response.ok) {
        // Force session update
        await update();
        setIsImpersonating(true);
        router.push('/profile');
      } else {
        throw new Error('Failed to impersonate user');
      }
    } catch (error) {
      console.error('Error switching to user:', error);
      alert('Gagal beralih ke user');
      localStorage.removeItem('originalAdminSession');
    } finally {
      setLoading(false);
      setShowUserList(false);
    }
  };

  const handleReturnToAdmin = async () => {
    setLoading(true);
    
    try {
      // Call API to end impersonation
      const response = await fetch('/api/admin/end-impersonation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        localStorage.removeItem('originalAdminSession');
        await update();
        setIsImpersonating(false);
        router.push('/dashboard');
      } else {
        throw new Error('Failed to end impersonation');
      }
    } catch (error) {
      console.error('Error returning to admin:', error);
      alert('Gagal kembali ke admin');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {isImpersonating ? (
        // Return to Admin button
        <button
          onClick={handleReturnToAdmin}
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
        >
          <span>👑</span>
          <span>Kembali ke Admin</span>
        </button>
      ) : (
        // Login as User dropdown
        <div>
          <button
            onClick={() => setShowUserList(!showUserList)}
            disabled={loading}
            className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50"
          >
            <span>👤</span>
            <span>Login as User</span>
            <span className={`transition-transform duration-200 ${showUserList ? 'rotate-180' : ''}`}>
              ⬇️
            </span>
          </button>

          {showUserList && (
            <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-64">
              <div className="p-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700">Pilih User untuk Login</p>
                <p className="text-xs text-gray-500">Sebagai admin, Anda dapat login sebagai user lain</p>
              </div>
              <div className="py-2">
                {availableUsers.map(user => (
                  <button
                    key={user.id}
                    onClick={() => handleLoginAsUser(user)}
                    disabled={loading}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-sm">👤</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                        <p className="text-xs text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100">
                <button
                  onClick={() => setShowUserList(false)}
                  className="text-xs text-gray-500 hover:text-gray-700"
                >
                  Tutup
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// app/api/admin/impersonate/route.js - API for User Impersonation
// =============================================================================

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Mock users database
const users = [
  { id: '1', username: 'admin', email: 'admin@example.com', name: 'Administrator', role: 'admin' },
  { id: '2', username: 'user1', email: 'user1@example.com', name: 'Regular User', role: 'user' },
  { id: '3', username: 'johndoe', email: 'john@example.com', name: 'John Doe', role: 'user' }
];

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { targetUserId, adminId } = await request.json();

    // Find target user
    const targetUser = users.find(u => u.id === targetUserId);
    if (!targetUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Store impersonation info in session/database
    // In a real app, you'd store this in your database
    console.log(`Admin ${adminId} is impersonating user ${targetUserId}`);

    return NextResponse.json({ 
      success: true, 
      message: 'Impersonation started',
      targetUser: {
        id: targetUser.id,
        username: targetUser.username,
        email: targetUser.email,
        name: targetUser.name,
        role: targetUser.role
      }
    });

  } catch (error) {
    console.error('Impersonation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// =============================================================================
// app/api/admin/end-impersonation/route.js - API to End Impersonation
// =============================================================================

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // End impersonation (remove from database/session)
    console.log('Ending impersonation for session:', session.user.id);

    return NextResponse.json({ 
      success: true, 
      message: 'Impersonation ended' 
    });

  } catch (error) {
    console.error('End impersonation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// =============================================================================
// app/dashboard/page.js - Admin Dashboard
// =============================================================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminUserSwitcher from '@/components/AdminUserSwitcher';

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== 'admin') {
    redirect('/unauthorized');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome, {session.user.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <AdminUserSwitcher />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Logged in as:</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                  👑 Admin
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Admin Stats Cards */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-3xl font-bold text-blue-600">25</p>
            <p className="text-sm text-gray-500">Active users in system</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">System Status</h3>
            <p className="text-3xl font-bold text-green-600">✓</p>
            <p className="text-sm text-gray-500">All systems operational</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Admin Actions</h3>
            <p className="text-3xl font-bold text-purple-600">12</p>
            <p className="text-sm text-gray-500">Actions taken today</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Admin Features</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">User Management</h3>
                <p className="text-gray-600 text-sm mt-1">Manage user accounts and permissions</p>
                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                  Manage Users
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">System Settings</h3>
                <p className="text-gray-600 text-sm mt-1">Configure system preferences</p>
                <button className="mt-3 bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// app/profile/page.js - User Profile Page
// =============================================================================

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function UserProfile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  // Check if this is an admin impersonating
  const isImpersonating = session.user.role === 'user' && typeof window !== 'undefined' && localStorage.getItem('originalAdminSession');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
              <p className="text-gray-600">Welcome, {session.user.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Logged in as:</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">
                👤 User
              </span>
              {isImpersonating && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">
                  (Impersonated by Admin)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <p className="mt-1 text-sm text-gray-900">{session.user.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <p className="mt-1 text-sm text-gray-900">@{session.user.username}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="mt-1 text-sm text-gray-900">{session.user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <p className="mt-1 text-sm text-gray-900 capitalize">{session.user.role}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">User Features</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">My Account</h3>
                <p className="text-gray-600 text-sm mt-1">Manage your account settings</p>
                <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded text-sm hover:bg-blue-600">
                  Edit Profile
                </button>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900">Preferences</h3>
                <p className="text-gray-600 text-sm mt-1">Customize your experience</p>
                <button className="mt-3 bg-gray-500 text-white px-4 py-2 rounded text-sm hover:bg-gray-600">
                  Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// components/RoleGuard.js - Client-side Role Protection Component
// =============================================================================

"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RoleGuard({ children, allowedRoles = [] }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Still loading

    if (!session) {
      router.push('/login');
      return;
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role)) {
      router.push('/unauthorized');
      return;
    }
  }, [session, status, router, allowedRoles]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!session || (allowedRoles.length > 0 && !allowedRoles.includes(session.user.role))) {
    return null;
  }

  return children;
}