import { withContentlayer } from "next-contentlayer2";

const nextConfig = {
  // 构建输出目录
  distDir: ".next",

  // 构建ID生成策略
  generateBuildId: () => "build",

  // 启用ETag生成
  generateEtags: true,

  // 静态页面生成超时时间
  staticPageGenerationTimeout: 720,

  // 重写规则配置
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

  // 实验性功能配置
  experimental: {
    // 优化大页面数据处理
    largePageDataBytes: 64 * 1000,

    // 优化包导入
    optimizePackageImports: [
      "contentlayer/source-files",
      "rehype-pretty-code",
      "remark-gfm",
    ],

    // 启用工作线程
    workerThreads: true,

    // 服务器操作配置
    serverActions: {
      bodySizeLimit: "1mb",
    },

    // CSS优化
    optimizeCss: true,

    // 滚动恢复
    scrollRestoration: true,

    // Turbopack配置
    turbo: {
      resolveExtensions: [
        ".mdx",
        ".tsx",
        ".ts",
        ".jsx",
        ".js",
        ".mjs",
        ".json",
      ],
      rules: {},
    },
  },

  // React严格模式
  reactStrictMode: process.env.NODE_ENV === "development",

  // 图片优化配置
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    minimumCacheTTL: 86400, // 提升图片缓存时间为一天
  },

  // Webpack自定义配置
  webpack: (config, { isServer }) => {
    // 解决punycode警告
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve?.fallback,
        punycode: false,
      },
    };

    // 文件监视优化
    config.watchOptions = {
      ...config.watchOptions,
      ignored: /node_modules|.git|.next/,
      aggregateTimeout: 300,
      poll: 1000,
    };

    // 运行时chunk优化
    if (config.optimization && config.optimization.runtimeChunk) {
      if (isServer) {
        config.optimization.runtimeChunk = {
          name: "webpack-runtime",
        };
      } else {
        config.optimization.runtimeChunk = "single";
      }
    }

    // 客户端构建优化
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          minSize: 20000,
          maxSize: 200000,
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

    // MDX处理优化
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
