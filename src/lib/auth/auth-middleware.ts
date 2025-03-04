import { createAuthMiddleware, APIError } from "better-auth/api";
import { checkInvitation, checkIfFirstUser } from "@/utils/queries/auth";

export const authMiddleware = createAuthMiddleware(async (ctx) => {
  if (ctx.path === "/sign-up/email") {
    const email = ctx.body?.email;
    console.log("email: ", email);
    if (!email) {
      throw new APIError("BAD_REQUEST", {
        message: "Email is required",
      });
    }
    const isFirstUser = await checkIfFirstUser();

    if (!isFirstUser) {
      const isInvited = await checkInvitation(email);
      if (!isInvited) {
        throw new APIError("FORBIDDEN", {
          message: "You must be invited to register",
        });
      }
    }
  }
  if (ctx.path === "/sign-in/email") {
    const email = ctx.body?.email;

    if (!email.endsWith("@gmail.com")) {
      throw new APIError("BAD_REQUEST", {
        message: "Email account not supported",
      });
    }
  }
});
