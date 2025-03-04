/**
 * Custom secondary storage implementation for Better Auth
 * This implementation uses an in-memory Map with TTL support
 */

import { logger } from "@/lib/logger";

interface StorageItem {
  value: string;
  expiry: number | null;
}

// In-memory storage with TTL support
class MemoryStore {
  private store: Map<string, StorageItem> = new Map();
  
  constructor() {
    // Clean up expired items periodically
    setInterval(() => this.cleanup(), 60000); // Run cleanup every minute
  }

  private cleanup() {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, item] of this.store.entries()) {
      if (item.expiry !== null && item.expiry < now) {
        this.store.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      logger.debug(`[RateLimit] Cleanup removed ${cleanedCount} expired items`);
    }
  }

  async get(key: string): Promise<string | null> {
    const item = this.store.get(key);
    
    if (!item) {
      logger.debug(`[RateLimit] Cache miss for key: ${key}`);
      return null;
    }
    
    // Check if the item has expired
    if (item.expiry !== null && item.expiry < Date.now()) {
      logger.debug(`[RateLimit] Key expired: ${key}`);
      this.store.delete(key);
      return null;
    }
    
    // Try to parse the value as JSON to extract rate limit information
    try {
      const parsedValue = JSON.parse(item.value);
      if (parsedValue && typeof parsedValue === 'object' && 'count' in parsedValue) {
        // This appears to be a rate limit counter
        logger.debug(
          `[RateLimit] Cache hit for key: ${key}, ` +
          `Current attempts: ${parsedValue.count}`
        );
      } else {
        logger.debug(`[RateLimit] Cache hit for key: ${key}`);
      }
    } catch (e) {
      // Not JSON or couldn't parse
      logger.debug(`[RateLimit] Cache hit for key: ${key}`);
    }
    
    return item.value;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const expiry = ttl ? Date.now() + (ttl * 1000) : null;
    this.store.set(key, { value, expiry });
    
    // Try to parse the value as JSON to extract rate limit information
    try {
      const parsedValue = JSON.parse(value);
      if (parsedValue && typeof parsedValue === 'object' && 'count' in parsedValue) {
        // This appears to be a rate limit counter
        logger.debug(
          `[RateLimit] Updated counter for key: ${key}, ` +
          `Attempts: ${parsedValue.count}, ` +
          `TTL: ${ttl || 'none'}`
        );
      } else {
        logger.debug(`[RateLimit] Set key: ${key}, value: ${value}, TTL: ${ttl || 'none'}`);
      }
    } catch (e) {
      // Not JSON or couldn't parse
      logger.debug(`[RateLimit] Set key: ${key}, value: ${value}, TTL: ${ttl || 'none'}`);
    }
    
    if (ttl) {
      logger.debug(`[RateLimit] Key ${key} will expire at: ${new Date(expiry!).toISOString()}`);
    }
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
    logger.debug(`[RateLimit] Deleted key: ${key}`);
  }
}

// Create a singleton instance
const memoryStore = new MemoryStore();

// Export the secondary storage implementation
export const secondaryStorage = {
  get: async (key: string) => memoryStore.get(key),
  set: async (key: string, value: string, ttl?: number) => memoryStore.set(key, value, ttl),
  delete: async (key: string) => memoryStore.delete(key)
};
