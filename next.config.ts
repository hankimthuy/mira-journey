import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // PoC cover images live in the CMS's public Supabase Storage bucket.
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  // The section used to live at /poc; keep old links and search results working.
  async redirects() {
    return [
      { source: "/poc", destination: "/products", permanent: true },
      { source: "/poc/:path*", destination: "/products/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
