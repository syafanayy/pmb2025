// app/api/auth/[...nextauth]/route.js - NextAuth dengan Firebase
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

// Demo users - hapus ini jika sudah ada data di Firebase
const demoUsers = [
  { 
    username: 'admin', 
    password: 'admin123', 
    role: 'admin', 
    name: 'Administrator',
    email: 'admin@hypezone.com'
  },
  { 
    username: 'user1', 
    password: 'user123', 
    role: 'user', 
    name: 'Regular User',
    email: 'user1@hypezone.com'
  },
  { 
    username: 'johndoe', 
    password: 'john123', 
    role: 'user', 
    name: 'John Doe',
    email: 'john@hypezone.com'
  }
];

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Username dan password harus diisi');
        }

        try {
          // Method 1: Cek Firebase dulu
          const usersRef = collection(db, 'users');
          const q = query(
            usersRef, 
            where('username', '==', credentials.username)
          );
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            // User ditemukan di Firebase
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();

            // Simple password check (tanpa bcrypt untuk demo)
            if (userData.password === credentials.password) {
              return {
                id: userDoc.id,
                name: userData.name,
                email: userData.email,
                username: userData.username,
                role: userData.role,
              };
            } else {
              throw new Error('Password salah');
            }
          }

          // Method 2: Fallback ke demo users jika tidak ada di Firebase
          const demoUser = demoUsers.find(u => 
            u.username === credentials.username || 
            u.email === credentials.username
          );

          if (!demoUser) {
            throw new Error('User tidak ditemukan');
          }

          if (demoUser.password !== credentials.password) {
            throw new Error('Password salah');
          }

          return {
            id: demoUser.username,
            name: demoUser.name,
            email: demoUser.email,
            username: demoUser.username,
            role: demoUser.role,
          };

        } catch (error) {
          console.error('Auth error:', error);
          throw new Error(error.message || 'Terjadi kesalahan saat login');
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.username = user.username;
      }
      return token;
    },
    
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.username = token.username;
        session.user.id = token.sub;
      }
      return session;
    },
    
    async redirect({ url, baseUrl }) {
      // Handle redirects after login
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  },
  
  pages: {
    signIn: '/login',
    error: '/login',
  },
  
  session: {
    strategy: 'jwt',
  },
  
  secret: process.env.NEXTAUTH_SECRET,
  
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };