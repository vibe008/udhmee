import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    productionurl: "https://biblonode-production.up.railway.app/",
    developmenturl: "http://localhost:5000/",
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;

