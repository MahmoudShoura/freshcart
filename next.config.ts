import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images:{remotePatterns:[
    new URL(`https://ecommerce.routemisr.com/*/**`)
  ]},

  async redirects() {
    return [
      {
        source: "/allorders",
        destination:'/orders',
        permanent:true
      }
  ]
  }
};

export default nextConfig;
