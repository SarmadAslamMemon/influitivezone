/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export", // Now safe, since no SSR or API routes
  images: {
    unoptimized: true, // 👈 disables Next.js Image Optimization for static export
  },
}

export default nextConfig
