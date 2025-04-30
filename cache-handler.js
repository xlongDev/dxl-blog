module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
    this.cache = new Map();
  }

  async get(key) {
    return this.cache.get(key);
  }

  async set(key, data) {
    this.cache.set(key, data);
  }
}; 