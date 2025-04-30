/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer2");

const nextConfig = {
  // 配置静态生成
  staticPageGenerationTimeout: 180,
  // 配置缓存处理器
  cacheHandler: require.resolve('./cache-handler.js'),
  experimental: {
    // 启用 CSS 优化
    optimizeCss: true,
    // 启用滚动恢复
    scrollRestoration: true,
    // 配置大页面数据限制
    largePageDataBytes: 128 * 1024, // 128KB
  },
  // 使用 standalone 输出以优化部署
  output: 'standalone',
  // 配置图片优化
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 828, 1200],
    imageSizes: [16, 32, 64, 96],
  },
  // 配置 webpack
  webpack: (config, { dev, isServer }) => {
    // 优化生产构建
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 10000,
          maxSize: 40000,
        },
      };
    }
    return config;
  },
  // 配置构建时的环境变量
  env: {
    NEXT_DISABLE_SOURCEMAPS: "1", // 禁用源码映射以减少内存使用
  },
  // 禁用一些不必要的优化
  swcMinify: true,
  poweredByHeader: false,
  reactStrictMode: false,
  // 配置静态页面生成
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
};

// 导出配置
module.exports = withContentlayer(nextConfig); 