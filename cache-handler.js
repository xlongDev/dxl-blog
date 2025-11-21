const { existsSync, readFileSync, writeFileSync, mkdirSync } = require("fs");
const { join } = require("path");
const os = require("os");

module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
    // 使用系统临时目录作为默认缓存目录
    const cacheDir = options?.dir || join(os.tmpdir(), "next-cache");
    this.dir = join(cacheDir, "cache");

    try {
      // 确保缓存目录存在
      if (!existsSync(this.dir)) {
        mkdirSync(this.dir, { recursive: true });
      }
    } catch (error) {
      console.warn("Failed to create cache directory:", error);
      // 如果创建缓存目录失败，使用内存缓存
      this.useMemoryCache = true;
      this.memoryCache = new Map();
    }
  }

  async get(key) {
    if (this.useMemoryCache) {
      return this.memoryCache.get(key);
    }

    try {
      const filePath = join(this.dir, key.replace(/[<>:"/\\|?*]/g, "_"));
      if (existsSync(filePath)) {
        const data = readFileSync(filePath, "utf8");
        return JSON.parse(data);
      }
    } catch (error) {
      console.warn("Cache get error:", error);
    }
    return null;
  }

  async set(key, data) {
    if (this.useMemoryCache) {
      this.memoryCache.set(key, data);
      return;
    }

    try {
      const filePath = join(this.dir, key.replace(/[<>:"/\\|?*]/g, "_"));
      writeFileSync(filePath, JSON.stringify(data));
    } catch (error) {
      console.warn("Cache set error:", error);
    }
  }

  async clear() {
    if (this.useMemoryCache) {
      this.memoryCache.clear();
      return;
    }
    const fs = require("fs");
    const files = fs.readdirSync(this.dir);
    for (const file of files) {
      fs.unlinkSync(require("path").join(this.dir, file));
    }
  }
};
