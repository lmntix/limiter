/**
 * Rate limiter configuration for Better Auth
 */

import { BetterAuthOptions } from "better-auth";
import { logger } from "@/lib/logger";

/**
 * Log rate limit events
 */
export const rateLimitLogger = {
  onRateLimit: (data: {
    path: string;
    ip: string;
    remaining: number;
    limit: number;
    window: number;
  }) => {
    const attempts = data.limit - data.remaining;
    logger.warn(
      `[RateLimit] Rate limit hit for path: ${data.path}, IP: ${data.ip}, ` +
        `Attempts: ${attempts}, Remaining: ${data.remaining}/${data.limit} in ${data.window}s window`
    );
  },

  onMaxRateLimit: (data: {
    path: string;
    ip: string;
    limit: number;
    window: number;
    attempts?: number;
  }) => {
    // attempts might not be provided by Better Auth, but we can show it if available
    const attemptsInfo =
      data.attempts !== undefined ? `Attempts: ${data.attempts}, ` : "";
    logger.error(
      `[RateLimit] MAX rate limit exceeded for path: ${data.path}, IP: ${data.ip}, ` +
        `${attemptsInfo}Limit: ${data.limit} in ${data.window}s window, No remaining requests`
    );
  },
};

/**
 * Rate limiter configuration
 * - Uses secondary storage for persistence
 * - Defines custom rules for sign-in and sign-up endpoints
 */
export const rateLimiterConfig: NonNullable<BetterAuthOptions["rateLimit"]> = {
  enabled: true,
  window: 60, // time window in seconds
  max: 100, // max requests in the window
  storage: "secondary-storage", // Use secondary storage for rate limiting
  customRules: {
    "/sign-in/email": {
      window: 10,
      max: 4,
    },
    "/sign-up/email": {
      window: 10,
      max: 5,
    },
  },
};
