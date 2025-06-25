"use client";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function PromoPage() {
  const promos = [
    {
      title: "🎉 GRATIS ONGKIR SELURUH INDONESIA",
      desc: "Nikmati pengiriman gratis ke seluruh Indonesia tanpa minimum pembelian. Berlaku untuk semua kategori produk!",
      terms: ["Berlaku untuk semua wilayah Indonesia", "Tanpa minimum pembelian", "Berlaku hingga 31 Desember 2025"],
      bg: "from-green-600 to-emerald-600",
      code: "GRATISONKIR",
      cta: "GUNAKAN SEKARANG"
    },
    {
      title: "💳 CASHBACK 50% PENGGUNA BARU",
      desc: "Dapatkan cashback hingga Rp 100.000 untuk pembelian pertama. Syarat dan ketentuan berlaku.",
      terms: ["Maksimal cashback Rp 100.000", "Khusus pengguna baru", "Minimum pembelian Rp 200.000"],
      bg: "from-blue-600 to-cyan-600",
      code: "NEWUSER50",
      cta: "DAFTAR & BELANJA"
    },
    {
      title: "🏆 MEMBER PREMIUM PRIVILEGES",
      desc: "Upgrade ke member premium dan dapatkan akses eksklusif ke produk limited edition dengan diskon khusus.",
      terms: ["Diskon eksklusif hingga 30%", "Akses produk limited edition", "Priority customer service"],
      bg: "from-purple-600 to-pink-600",
      code: "PREMIUM2025",
      cta: "UPGRADE SEKARANG"
    },
    {
      title: "🎮 GAMING WEEK SPECIAL",
      desc: "Semua produk gaming diskon hingga 40%! Mouse, keyboard, headset, dan aksesoris gaming lainnya.",
      terms: ["Berlaku untuk kategori gaming", "Diskon hingga 40%", "Berlaku 7-14 Januari 2025"],
      bg: "from-red-600 to-orange-600",
      code: "GAMING40",
      cta: "SHOP GAMING GEAR"
    },
    {
      title: "💄 BEAUTY BONANZA",
      desc: "Beli 2 gratis 1 untuk semua produk kecantikan dari brand ternama. Stock terbatas!",
      terms: ["Beli 2 gratis 1", "Brand premium only", "Stock terbatas"],
      bg: "from-pink-600 to-rose-600",
      code: "BEAUTY21",
      cta: "BELANJA BEAUTY"
    },
    {
      title: "🏠 HOME DECOR FESTIVAL",
      desc: "Renovasi rumah dengan diskon besar-besaran! Furniture, dekorasi, dan peralatan rumah tangga.",
      terms: ["Diskon hingga 35%", "Gratis konsultasi interior", "Installment 0% tersedia"],
      bg: "from-yellow-600 to-orange-600",
      code: "HOME35",
      cta: "DEKORASI RUMAH"
    }
  ];

  const copyPromoCode = (code) => {
    navigator.clipboard.writeText(code);
    // You could add a toast notification here
    alert(`Kode promo ${code} berhasil disalin!`);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🎁 PROMO SPESIAL
          </h1>
          <p className="text-2xl text-gray-300 mb-8">Penawaran eksklusif yang sayang untuk dilewatkan!</p>
          <div className="inline-block bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/50 rounded-2xl px-8 py-4">
            <p className="text-green-300 font-semibold text-lg">
              ✨ Hemat hingga jutaan rupiah dengan promo terbatas kami!
            </p>
          </div>
        </div>
      </section>

      {/* Promo Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {promos.map((promo, index) => (
              <div
                key={index}
                className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${promo.bg} transform hover:scale-105 transition-all duration-300 group`}
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                
                <div className="relative z-10 text-white">
                  <h3 className="text-2xl font-black mb-4">{promo.title}</h3>
                  <p className="text-lg mb-6 text-white/90 leading-relaxed">{promo.desc}</p>
                  
                  {/* Terms */}
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">📋 Syarat & Ketentuan:</h4>
                    <ul className="text-sm text-white/80 space-y-1">
                      {promo.terms.map((term, termIndex) => (
                        <li key={termIndex} className="flex items-start">
                          <span className="mr-2">•</span>
                          <span>{term}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6">
                    <div className="bg-white/20 rounded-xl p-4 border border-white/30">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-semibold mb-1">Kode Promo:</p>
                          <p className="text-xl font-black">{promo.code}</p>
                        </div>
                        <button
                          onClick={() => copyPromoCode(promo.code)}
                          className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-semibold transition-colors"
                        >
                          📋 Copy
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-100 transition-colors duration-300">
                    {promo.cta}
                  </button>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  ✨
                </div>
                <div className="absolute -bottom-4 -left-4 text-6xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  🎊
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            🚀 Jangan Sampai Kehabisan!
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Promo terbatas dan bisa berakhir kapan saja. Segera manfaatkan kesempatan emas ini!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              🛍️ MULAI BELANJA
            </button>
            <button className="px-8 py-4 bg-transparent border-2 border-purple-500 text-purple-400 font-bold text-lg rounded-2xl hover:bg-purple-500 hover:text-white transition-all duration-300">
              📱 DOWNLOAD APP
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}