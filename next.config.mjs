/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "image.tmdb.org",                 // buat poster film
      "lh3.googleusercontent.com",      // buat foto profil Google
      "firebasestorage.googleapis.com", // kalau nanti pakai Firebase Storage
    ],
  },
};

export default nextConfig;
