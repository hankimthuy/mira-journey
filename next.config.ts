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
};

export default nextConfig;
