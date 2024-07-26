/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  generateBuildId: async () => {
    // This could be anything, using the latest git hash
    return (
      process.env.BUILD_ID ||
      `local-${new Date().toISOString().replace(/[^0-9T]/g, "")}`
    );
  },
  images: {
    unoptimized: true,
  },
  //output: "export",
  poweredByHeader: false,
  productionBrowserSourceMaps: true,
};

export default nextConfig;
