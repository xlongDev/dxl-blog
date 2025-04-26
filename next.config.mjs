import { withContentlayer } from "next-contentlayer2";

const nextConfig = {
  distDir: ".next",
  generateBuildId: () => "build",
  generateEtags: true,
  staticPageGenerationTimeout: 720,

  // 启用增量静态再生（ISR），优化动态页面
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

  // 优化大型页面数据处理
  experimental: {
    largePageDataBytes: 128 * 1000, // 128KB
    optimizePackageImports: [
      "contentlayer/source-files",
      "rehype-pretty-code",
      "remark-gfm",
    ], // 优化第三方包导入
    workerThreads: true, // 启用 worker threads 加速构建
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // 启用 React 严格模式（开发时）
  reactStrictMode: process.env.NODE_ENV === "development",

  // 优化图像加载
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 60, // 图片缓存 60 秒
  },

  // Webpack 配置优化
  webpack: (config, { isServer }) => {
    // 禁用 punycode 警告
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
      ignored: /node_modules|.git|.next/,
      aggregateTimeout: 300,
      poll: 1000,
    };

    // 优化 runtimeChunk 配置
    if (config.optimization && config.optimization.runtimeChunk) {
      if (isServer) {
        config.optimization.runtimeChunk = {
          name: "webpack-runtime",
        };
      } else {
        config.optimization.runtimeChunk = "single";
      }
    }

    // 优化客户端构建性能
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 200000, // 减小 maxSize，提升加载速度
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
            contentlayer: {
              test: /[\\/]node_modules[\\/](contentlayer|rehype-pretty-code|remark-gfm)[\\/]/,
              name: "contentlayer",
              priority: -5,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }

    // 启用 SWC 编译器加速 MDX 处理
    config.module.rules.push({
      test: /\.mdx$/,
      use: {
        loader: "swc-loader",
        options: {
          jsc: {
            parser: {
              syntax: "typescript",
              tsx: true,
            },
            transform: {
              react: {
                runtime: "automatic",
              },
            },
          },
        },
      },
    });

    return config;
  },
};

export default withContentlayer(nextConfig);
