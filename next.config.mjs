import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  distDir: ".next",
  generateBuildId: () => "build",
  generateEtags: true,

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
      ignored: ["​**​/.git/​**​", "​**​/node_modules/​**​", "​**​/.next/​**​"],
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

    return config;
  },
};

export default withContentlayer(nextConfig);