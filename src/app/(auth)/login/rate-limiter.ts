/**
 * Simple in-memory rate limiter for login attempts
 * Limits login attempts by IP address and email
 *
 * Note: In a production environment, you would want to use a persistent store
 * like Redis or a database to store rate limit data across server instances and restarts.
 */

// Extend the global type definition to include our custom properties
/* eslint-disable no-var */
declare global {
  var ipLimits: Map<string, RateLimitRecord>;
  var emailLimits: Map<string, RateLimitRecord>;
}
/* eslint-enable no-var */

type RateLimitRecord = {
  attempts: number;
  lastAttempt: number;
  blocked: boolean;
  blockedUntil: number;
};

// Use a global variable to ensure persistence across module reloads in development
// This is needed because Next.js with React Server Components can reload modules
let globalIpLimits: Map<string, RateLimitRecord>;
let globalEmailLimits: Map<string, RateLimitRecord>;

// Initialize the global maps if they don't exist
if (typeof globalThis !== "undefined") {
  if (!globalThis.ipLimits) {
    globalThis.ipLimits = new Map<string, RateLimitRecord>();
  }
  if (!globalThis.emailLimits) {
    globalThis.emailLimits = new Map<string, RateLimitRecord>();
  }
  globalIpLimits = globalThis.ipLimits;
  globalEmailLimits = globalThis.emailLimits;
} else {
  globalIpLimits = new Map<string, RateLimitRecord>();
  globalEmailLimits = new Map<string, RateLimitRecord>();
}

class LoginRateLimiter {
  private ipLimits: Map<string, RateLimitRecord>;
  private emailLimits: Map<string, RateLimitRecord>;

  // Configuration
  private maxAttempts: number = 3;
  private windowMs: number = 10 * 1000; // 10 seconds
  private blockDurationMs: number = 20 * 1000; // 20 seconds

  constructor(config?: {
    maxAttempts?: number;
    windowMs?: number;
    blockDurationMs?: number;
  }) {
    // Use the global maps to ensure persistence
    this.ipLimits = globalIpLimits;
    this.emailLimits = globalEmailLimits;

    if (config?.maxAttempts) this.maxAttempts = config.maxAttempts;
    if (config?.windowMs) this.windowMs = config.windowMs;
    if (config?.blockDurationMs) this.blockDurationMs = config.blockDurationMs;
  }

  /**
   * Check if a login attempt is allowed
   * @param ip Client IP address
   * @param email User email
   * @returns Object containing whether the attempt is allowed and error message if not
   */
  checkRateLimit(
    ip: string,
    email: string
  ): { allowed: boolean; message?: string } {
    const now = Date.now();

    // Check IP limits
    const ipRecord = this.getOrCreateRecord(this.ipLimits, ip, now);
    if (ipRecord.blocked && now < ipRecord.blockedUntil) {
      const minutesLeft = Math.ceil(
        (ipRecord.blockedUntil - now) / (60 * 1000)
      );
      return {
        allowed: false,
        message: `Too many login attempts. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}.`,
      };
    }

    // Check email limits
    const emailRecord = this.getOrCreateRecord(this.emailLimits, email, now);
    if (emailRecord.blocked && now < emailRecord.blockedUntil) {
      const minutesLeft = Math.ceil(
        (emailRecord.blockedUntil - now) / (60 * 1000)
      );
      return {
        allowed: false,
        message: `Too many login attempts for this account. Please try again in ${minutesLeft} minute${minutesLeft > 1 ? "s" : ""}.`,
      };
    }

    return { allowed: true };
  }

  /**
   * Record a failed login attempt
   * @param ip Client IP address
   * @param email User email
   * @returns Object containing whether the IP/email is now blocked
   */
  recordFailedAttempt(
    ip: string,
    email: string
  ): { ipBlocked: boolean; emailBlocked: boolean } {
    const now = Date.now();

    // Update IP record
    const ipRecord = this.getOrCreateRecord(this.ipLimits, ip, now);
    ipRecord.attempts += 1;
    ipRecord.lastAttempt = now;

    if (ipRecord.attempts >= this.maxAttempts) {
      ipRecord.blocked = true;
      ipRecord.blockedUntil = now + this.blockDurationMs;
    }

    // Update email record
    const emailRecord = this.getOrCreateRecord(this.emailLimits, email, now);
    emailRecord.attempts += 1;
    emailRecord.lastAttempt = now;

    if (emailRecord.attempts >= this.maxAttempts) {
      emailRecord.blocked = true;
      emailRecord.blockedUntil = now + this.blockDurationMs;
    }

    return {
      ipBlocked: ipRecord.blocked,
      emailBlocked: emailRecord.blocked,
    };
  }

  /**
   * Reset rate limit for a successful login
   * @param ip Client IP address
   * @param email User email
   */
  resetOnSuccess(ip: string, email: string): void {
    this.ipLimits.delete(ip);
    this.emailLimits.delete(email);
  }

  /**
   * Helper to get or create a rate limit record
   */
  private getOrCreateRecord(
    store: Map<string, RateLimitRecord>,
    key: string,
    now: number
  ): RateLimitRecord {
    let record = store.get(key);

    // If record doesn't exist or window has expired, create/reset it
    if (
      !record ||
      (now - record.lastAttempt > this.windowMs && !record.blocked)
    ) {
      record = {
        attempts: 0,
        lastAttempt: now,
        blocked: false,
        blockedUntil: 0,
      };
      store.set(key, record);
    }

    return record;
  }
}

// Create singleton instance with stricter rate limiting
const loginRateLimiter = new LoginRateLimiter({
  maxAttempts: 3, // Allow only 3 attempts
  windowMs: 10 * 1000, // Within a 10 second window
  blockDurationMs: 30 * 1000, // Block for 30 seconds after too many attempts
});

export default loginRateLimiter;
