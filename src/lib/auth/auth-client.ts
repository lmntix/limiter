import { adminClient, organizationClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { ac, admin, member, owner } from "./permissions";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  session: {
    cookieCache: {
      enabled: false,
      // maxAge: 5 * 60,
    },
  },
  plugins: [
    organizationClient({
      ac: ac,
      roles: {
        owner,
        admin,
        member,
      },
      teams: {
        enabled: true,
      },
    }),
    adminClient(),
  ],
});

export const {
  signIn,
  signOut,
  signUp,
  updateUser,
  changePassword,
  changeEmail,
  deleteUser,
  useSession,
  revokeSession,
  getSession,
  resetPassword,
  sendVerificationEmail,
  linkSocial,
  forgetPassword,
  verifyEmail,
  listAccounts,
  listSessions,
  revokeOtherSessions,
  revokeSessions,
} = authClient;
