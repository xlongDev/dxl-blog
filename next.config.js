/** @type {import('next').NextConfig} */
const { withContentlayer } = require("next-contentlayer2");

const nextConfig = {
  // 配置静态生成
  staticPageGenerationTimeout: 300, // 增加超时时间
  // 配置缓存处理器
  cacheHandler: require.resolve('./cache-handler.js'),
  // 配置缓存最大大小
  distDir: process.env.VERCEL ? '.next' : '.next',
  generateEtags: true,
  experimental: {
    // 启用 CSS 优化
    optimizeCss: true,
    // 启用滚动恢复
    scrollRestoration: true,
    // 配置大页面数据限制
    largePageDataBytes: 128 * 1024, // 128KB
    // 移除 serverActions 配置，因为它现在是默认启用的
    serverComponentsExternalPackages: [],
    // 禁用一些实验性功能以提高稳定性
    typedRoutes: false,
    mdxRs: false,
  },
  // 使用 standalone 输出以优化部署
  output: 'standalone',
  // 配置图片优化
  images: {
    domains: ['localhost'],
    deviceSizes: [640, 828, 1200],
    imageSizes: [16, 32, 64, 96],
    minimumCacheTTL: 60,
    formats: ['image/webp'],
  },
  // 配置 webpack
  webpack: (config, { dev, isServer }) => {
    // 优化生产构建
    if (!dev && !isServer) {
      // 减少分块大小以优化内存使用
      config.optimization = {
        ...config.optimization,
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 5000,
          maxSize: 25000,
          cacheGroups: {
            default: false,
            vendors: false,
            // 为 contentlayer 创建单独的块
            contentlayer: {
              name: 'contentlayer',
              test: /[\\/]content[\\/]/,
              chunks: 'all',
              priority: 10,
              enforce: true,
            },
            // 为依赖创建单独的块
            vendor: {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              chunks: 'all',
              priority: 5,
            },
          },
        },
        runtimeChunk: {
          name: 'runtime',
        },
      };
    }

    // 添加 esbuild 加载器以提高构建性能
    config.module.rules.push({
      test: /\.(js|mjs|jsx|ts|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
      },
    });

    // 禁用源码映射以减少内存使用
    if (!dev) {
      config.devtool = false;
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
  // 配置页面生成
  async rewrites() {
    return [];
  },
  async headers() {
    return [];
  },
};

// 导出配置
module.exports = withContentlayer(nextConfig); 