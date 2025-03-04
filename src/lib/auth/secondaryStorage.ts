import { SecondaryStorage } from "better-auth";

// Type-safe in-memory storage
type StorageRecord = {
  value: string;
  expiresAt: number | null;
};

export class InMemoryStorage implements SecondaryStorage {
  private storage: Map<string, StorageRecord> = new Map();

  async get(key: string): Promise<string | null> {
    console.log(`[InMemoryStorage] Attempting to get key: ${key}`);
    const record = this.storage.get(key);

    if (!record) {
      console.log(`[InMemoryStorage] Key not found: ${key}`);
      return null;
    }

    // Check if the record has expired
    if (record.expiresAt && record.expiresAt < Date.now()) {
      console.log(`[InMemoryStorage] Key expired: ${key}`);
      this.storage.delete(key);
      return null;
    }

    console.log(`[InMemoryStorage] Successfully retrieved key: ${key}`);
    return record.value;
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    const expiresAt = ttl ? Date.now() + ttl * 1000 : null;
    this.storage.set(key, { value, expiresAt });
    console.log(`[InMemoryStorage] Set key: ${key}, TTL: ${ttl || "none"}`);
  }

  async delete(key: string): Promise<void> {
    const deleted = this.storage.delete(key);
    console.log(`[InMemoryStorage] Deleted key: ${key}, Success: ${deleted}`);
  }

  // Optional: Add a method to log the current state of the storage
  logStorageState(): void {
    console.log("[InMemoryStorage] Current storage state:");
    this.storage.forEach((record, key) => {
      console.log(
        `  Key: ${key}, Value: ${record.value}, Expires: ${record.expiresAt ? new Date(record.expiresAt).toISOString() : "never"}`
      );
    });
  }
}
