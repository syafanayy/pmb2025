// app/admin/layout.js

export const metadata = {
    title: 'Admin | Dashboard',
    description: 'Halaman admin untuk mengelola produk dan data lainnya',
  };
  
  export default function AdminLayout({ children }) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header khusus admin */}
          <header className="mb-8 border-b border-gray-700 pb-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <p className="text-sm text-gray-400">Kelola produk dan data aplikasi</p>
          </header>
  
          {/* Konten dari page.js akan ditampilkan di sini */}
          <main>{children}</main>
        </div>
      </div>
    );
  }
  