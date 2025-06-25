export default function Footer() {
    return (
      <footer className="bg-gradient-to-t from-black to-gray-900 py-16 border-t border-purple-500/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                🔥 HYPEZONE
              </h3>
              <p className="text-gray-300 mb-6 max-w-md">
                Platform belanja online terbaik dengan produk premium, harga terjangkau, dan pelayanan terpercaya. 
                Bergabunglah dengan jutaan pengguna yang puas!
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-2xl hover:text-purple-400 transition-colors">📘</a>
                <a href="#" className="text-2xl hover:text-purple-400 transition-colors">📷</a>
                <a href="#" className="text-2xl hover:text-purple-400 transition-colors">🐦</a>
                <a href="#" className="text-2xl hover:text-purple-400 transition-colors">📺</a>
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">🔗 Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="/categories" className="hover:text-purple-400 transition-colors">Kategori</a></li>
                <li><a href="/deals" className="hover:text-purple-400 transition-colors">Flash Sale</a></li>
                <li><a href="/promo" className="hover:text-purple-400 transition-colors">Promo</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Wishlist</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Keranjang</a></li>
              </ul>
            </div>
  
            {/* Customer Service */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">📞 Customer Service</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Bantuan</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Hubungi Kami</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>
  
          <div className="border-t border-purple-500/30 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 HYPEZONE. All rights reserved. Made with ❤️ for awesome shopping experience.
            </p>
          </div>
        </div>
      </footer>
    );
  }