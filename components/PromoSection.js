"use client";
import Link from 'next/link';

export default function PromoSection() {
  const promos = [
    {
      title: "🎉 GRATIS ONGKIR",
      desc: "Ke seluruh Indonesia tanpa minimum pembelian",
      bg: "from-green-600 to-emerald-600",
      cta: "BELANJA SEKARANG"
    },
    {
      title: "💳 CASHBACK 50%",
      desc: "Maksimal cashback Rp 100.000 untuk pengguna baru",
      bg: "from-blue-600 to-cyan-600",
      cta: "DAFTAR SEKARANG"
    },
    {
      title: "🏆 MEMBER PREMIUM",
      desc: "Dapatkan akses eksklusif dan diskon khusus",
      bg: "from-purple-600 to-pink-600",
      cta: "UPGRADE SEKARANG"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🎁 PROMO SPESIAL
          </h2>
          <p className="text-xl text-gray-300">Penawaran eksklusif hanya untuk kamu!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promos.map((promo, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br ${promo.bg} transform hover:scale-105 transition-all duration-300 group`}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
              
              <div className="relative z-10 text-center text-white">
                <h3 className="text-3xl font-black mb-4">{promo.title}</h3>
                <p className="text-lg mb-6 text-white/90">{promo.desc}</p>
                <Link
                  href="/promo"
                  className="inline-block px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300"
                >
                  {promo.cta}
                </Link>
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
  );
}
