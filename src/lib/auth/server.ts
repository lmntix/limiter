import { betterAuth, BetterAuthOptions } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@/db/schema/auth";
import db from "@/db";
import env from "@/env";
import bcrypt from "bcryptjs";
import { authMiddleware } from "./auth-middleware";
import { plugins } from "./plugins";
import { secondaryStorage } from "./secondaryStorage";
import { rateLimiterConfig } from "./limiter";

export const auth = betterAuth({
  appName: "Pocket Finance",
  baseURL: env.NEXT_PUBLIC_APP_URL,
  logger: {
    disabled: false,
    level: "debug",
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      ...schema,
      users: schema.users,
      sessions: schema.sessions,
      accounts: schema.accounts,
      verifications: schema.verifications,
      organizations: schema.organizations,
      invitations: schema.invitations,
      members: schema.orgMembers,
      teams: schema.teams,
    },
  }),
  advanced: {
    generateId: false,
  },
  session: {
    cookieCache: {
      enabled: false,
      // maxAge: 5 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
      },
      verify: async (data: {
        password: string;
        hash: string;
      }): Promise<boolean> => {
        const isValid = await bcrypt.compare(data.password, data.hash);
        return isValid;
      },
    },
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      console.log({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      const verificationUrl = url;

      console.log({
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${verificationUrl}`,
      });
    },
  },

  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }) => {
        console.log({
          to: newEmail,
          subject: "Verify your email change",
          text: `Click the link to verify: ${url}`,
        });
      },
    },
  },
  // rateLimit: rateLimiterConfig,
  // secondaryStorage,
  hooks: {
    before: authMiddleware,
  },

  plugins,
} satisfies BetterAuthOptions);

export type Session = typeof auth.$Infer.Session;
