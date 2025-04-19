import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  distDir: ".next",
  generateBuildId: () => "build",
  generateEtags: true,
  // 增加静态页面生成超时时间
  staticPageGenerationTimeout: 180,

  // 启用增量静态再生成
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/blog/:path*",
          has: [
            {
              type: "query",
              key: "revalidate",
              value: "true",
            },
          ],
          destination: "/api/revalidate?path=/blog/:path*",
        },
      ],
    };
  },

  // 配置大型页面的处理方式
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
  },

  webpack: (config, { isServer }) => {
    // 处理 punycode 警告
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        punycode: false,
      },
    };

    // 优化文件监视配置
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ["**/.git/**", "**/node_modules/**", "**/.next/**"],
      aggregateTimeout: 300,
      poll: 1000,
    };

    // 修复 __webpack_require__.C is not a function 错误
    if (config.optimization && config.optimization.runtimeChunk) {
      if (isServer) {
        config.optimization.runtimeChunk = {
          name: "webpack-runtime",
        };
      } else {
        config.optimization.runtimeChunk = "single";
      }
    }

    // 优化构建性能
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 244000,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    return config;
  },
};

export default withContentlayer(nextConfig);
