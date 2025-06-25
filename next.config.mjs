/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: [
        'res.cloudinary.com', // Cloudinary domain
        'images.unsplash.com', // Jika menggunakan Unsplash untuk placeholder
      ],
      formats: ['image/webp', 'image/avif'],
    },
    env: {
      CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    },
  }
  
  export default nextConfig