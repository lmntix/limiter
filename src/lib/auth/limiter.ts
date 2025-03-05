import { BetterAuthOptions } from "better-auth";

export const rateLimiterConfig: NonNullable<BetterAuthOptions["rateLimit"]> = {
  enabled: true,
  window: 60, // time window in seconds
  max: 100, // max requests in the window
  storage: "database",
  modelName: "rateLimit", // Use secondary storage for rate limiting
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
