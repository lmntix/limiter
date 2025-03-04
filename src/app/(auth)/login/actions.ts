"use server";

import { headers } from "next/headers";

/**
 * Server action to get the client IP address from request headers
 * @returns The client IP address
 */
export async function getClientIp(): Promise<string> {
  const headersList = await headers();

  // Try to get IP from common headers
  const forwardedFor = headersList.get("x-forwarded-for");
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, get the first one
    return forwardedFor.split(",")[0].trim();
  }

  const realIp = headersList.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  // Fallback to a default IP if we can't determine it
  return "127.0.0.1";
}
