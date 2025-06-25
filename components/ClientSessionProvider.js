// app/components/ClientSessionProvider.js
'use client';
import { SessionProvider } from 'next-auth/react';

export default function ClientSessionProvider({ children }) {
  return (
    <SessionProvider 
      // Tambahan konfigurasi untuk memastikan session bekerja
      refetchInterval={5 * 60} // Refresh session setiap 5 menit
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}