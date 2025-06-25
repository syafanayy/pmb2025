// Simpan file ini sebagai: data/products.js
export const products = [
  {
    id: 1,
    name: "Wardah White Secret Serum",
    price: 89000,
    originalPrice: 99000,
    image: "/images/wardah-white-secret-serum.jpg",
    category: "Skincare",
    description: "Serum pencerah wajah dengan niacinamide dan vitamin C untuk kulit glowing",
    inStock: true,
    rating: 4.7,
    reviews: 1245
  },
  {
    id: 2,
    name: "Kemeja Batik Pria Slimfit",
    price: 125000,
    originalPrice: 150000,
    image: "/images/kemeja-batik-pria.jpg",
    category: "Baju",
    description: "Kemeja batik berkualitas dengan motif tradisional Indonesia, cocok untuk formal",
    inStock: true,
    rating: 4.6,
    reviews: 89
  },
  {
    id: 3,
    name: "Celana Kulot Wanita",
    price: 85000,
    originalPrice: 110000,
    image: "/images/celana-kulot-wanita.jpg",
    category: "Celana",
    description: "Celana kulot berbahan katun premium, nyaman dan stylish untuk sehari-hari",
    inStock: true,
    rating: 4.5,
    reviews: 234
  },
  {
    id: 4,
    name: "Tas Tangan Kulit Asli",
    price: 195000,
    originalPrice: 235000,
    image: "/images/tas-tangan-kulit.jpg",
    category: "Aksesoris",
    description: "Tas tangan dari kulit asli berkualitas tinggi, elegant dan tahan lama",
    inStock: true,
    rating: 4.8,
    reviews: 156
  },
  {
    id: 5,
    name: "Kerudung Voal Premium",
    price: 55000,
    originalPrice: 65000,
    image: "/images/kerudung-voal-premium.jpg",
    category: "Kerudung",
    description: "Kerudung voal dengan kualitas premium, lembut dan tidak mudah kusut",
    inStock: true,
    rating: 4.9,
    reviews: 892
  },
  {
    id: 6,
    name: "Emina Bright Stuff Moisturizer",
    price: 35000,
    originalPrice: 42000,
    image: "/images/emina-moisturizer.jpg",
    category: "Skincare",
    description: "Pelembab wajah dengan SPF 15 untuk kulit cerah dan terlindungi",
    inStock: false,
    rating: 4.4,
    reviews: 678
  },
  {
    id: 7,
    name: "Blouse Wanita Polos",
    price: 68000,
    originalPrice: 89000,
    image: "/images/blouse-wanita-polos.jpg",
    category: "Baju",
    description: "Blouse wanita dengan desain minimalis, cocok untuk kerja dan santai",
    inStock: true,
    rating: 4.3,
    reviews: 167
  },
  {
    id: 8,
    name: "Celana Jeans Pria Slim",
    price: 175000,
    originalPrice: 210000,
    image: "/images/celana-jeans-pria.jpg",
    category: "Celana",
    description: "Celana jeans pria dengan potongan slim fit, bahan berkualitas dan nyaman",
    inStock: true,
    rating: 4.6,
    reviews: 298
  },
  {
    id: 9,
    name: "Kalung Emas Tumbuh",
    price: 1250000,
    originalPrice: 1350000,
    image: "/images/kalung-emas-tumbuh.jpg",
    category: "Aksesoris",
    description: "Kalung emas 18k dengan desain tradisional Indonesia yang elegan",
    inStock: true,
    rating: 4.9,
    reviews: 45
  },
  {
    id: 10,
    name: "Kerudung Segi Empat Motif",
    price: 42000,
    originalPrice: 55000,
    image: "/images/kerudung-segi-empat.jpg",
    category: "Kerudung",
    description: "Kerudung segi empat dengan motif cantik, bahan berkualitas dan warna awet",
    inStock: true,
    rating: 4.7,
    reviews: 523
  },
  {
    id: 11,
    name: "Azarine Hydrasoothe Sunscreen",
    price: 45000,
    originalPrice: 52000,
    image: "/images/azarine-sunscreen.jpg",
    category: "Skincare",
    description: "Sunscreen SPF 45 PA++++ dengan formula ringan dan tidak meninggalkan white cast",
    inStock: true,
    rating: 4.8,
    reviews: 1867
  },
  {
    id: 12,
    name: "Dompet Pria Kulit",
    price: 125000,
    originalPrice: 160000,
    image: "/images/dompet-pria-kulit.jpg",
    category: "Aksesoris",
    description: "Dompet pria dari kulit sapi asli dengan banyak slot kartu dan desain minimalis",
    inStock: true,
    rating: 4.5,
    reviews: 234
  }
];

export const categories = [
  "All",
  "Skincare", 
  "Baju",
  "Celana",
  "Aksesoris",
  "Kerudung"
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (category === "All") return products;
  return products.filter(product => product.category === category);
};