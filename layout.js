// app/layout.js - Root Layout with Auth Provider
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata = {
  title: 'HypeZone - Gaming Platform',
  description: 'Ultimate gaming experience with Firebase Authentication',
};

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