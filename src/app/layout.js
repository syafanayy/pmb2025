import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: 'Product Management',
  description: 'Manage your products with image upload',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </body>
    </html>
  );
}