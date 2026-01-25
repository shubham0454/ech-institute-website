import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly use webpack instead of Turbopack
  experimental: {
    webpackBuildWorker: true,
  },
  webpack: (config, { isServer, webpack }) => {
    // Fix for webpack runtime errors
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ignore React Native modules in browser builds (MetaMask SDK issue)
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^@react-native-async-storage\/async-storage$/,
      })
    );
    
    // Ignore specific modules that cause issues
    config.ignoreWarnings = [
      { module: /node_modules\/@metamask\/sdk/ },
      { message: /Can't resolve '@react-native-async-storage\/async-storage'/ },
    ];
    
    return config;
  },
  // Add empty turbopack config to silence the warning
  turbopack: {},
};

export default nextConfig;
