import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
// Project Pages live at https://<user>.github.io/frontier-finesse/, so we
// need a basePath in production. In dev we want it empty for localhost.
const repoBase = "/frontier-finesse";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: isProd ? repoBase : "",
  assetPrefix: isProd ? repoBase : "",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
