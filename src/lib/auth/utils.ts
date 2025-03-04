import "server-only";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { cache } from "react";

export const getSession = cache(async () => {
  return await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });
});
