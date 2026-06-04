/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Hero / menu / story photos are remote Unsplash placeholders.
    // We use plain <img> tags (matching the design prototype), but allow
    // these hosts in case any are migrated to next/image later.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
