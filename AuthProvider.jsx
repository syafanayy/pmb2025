// ========================================
// app/components/AuthProvider.jsx
// ========================================
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// ========================================
// app/components/LoginForm.jsx
// ========================================
'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword } from '../lib/firebase';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { user, error: authError } = await signInWithEmailAndPassword(email, password);
    
    if (authError) {
      setError(authError);
    } else {
      console.log('Login berhasil:', user);
      // Redirect atau update UI
    }
    
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label htmlFor="password" className="block text-sm font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>
      
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
}

// ========================================
// app/components/PostsList.jsx
// ========================================
'use client';
import { useState, useEffect } from 'react';
import { subscribeToCollection, addDocument } from '../lib/firebase';
import { useAuth } from './AuthProvider';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = subscribeToCollection('posts', (data) => {
      setPosts(data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds));
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    setLoading(true);
    const { error } = await addDocument('posts', {
      content: newPost,
      authorId: user.uid,
      authorEmail: user.email,
      createdAt: new Date(),
      likes: 0
    });

    if (!error) {
      setNewPost('');
    } else {
      console.error('Error adding post:', error);
    }
    
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {user && (
        <form onSubmit={handleSubmit} className="mb-6">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Apa yang Anda pikirkan?"
            className="w-full p-3 border rounded-lg resize-none"
            rows="3"
          />
          <button
            type="submit"
            disabled={loading || !newPost.trim()}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{post.authorEmail}</span>
              <span className="text-sm text-gray-500">
                {post.createdAt?.toDate?.()?.toLocaleDateString()}
              </span>
            </div>
            <p className="text-gray-800">{post.content}</p>
            <div className="mt-2 flex items-center space-x-4">
              <button className="text-sm text-blue-600 hover:text-blue-800">
                👍 {post.likes || 0}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// app/layout.js (Root Layout)
// ========================================
import { AuthProvider } from './components/AuthProvider';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

// ========================================
// app/page.js (Home Page)
// ========================================
import PostsList from './components/PostsList';
import LoginForm from './components/LoginForm';
import { useAuth } from './components/AuthProvider';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Firebase App
        </h1>
        
        <AuthWrapper />
      </div>
    </main>
  );
}

function AuthWrapper() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <LoginForm />
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <p>Selamat datang, {user.email}!</p>
        <button 
          onClick={() => signOut()}
          className="mt-2 text-red-600 hover:text-red-800"
        >
          Logout
        </button>
      </div>
      <PostsList />
    </div>
  );
}