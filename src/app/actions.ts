"use server";

import { RateLimiterMemory } from "rate-limiter-flexible";
import { getIp } from "./get-ip";

const rateLimiter = new RateLimiterMemory({
  points: 3, // Number of points
  duration: 10, // Per 30 seconds
});

export async function rateLimit(key: string) {
  const ip = await getIp();
  if (!ip) {
    throw new Error("Could not get IP address");
  }
  const identifier = `${ip}_${key}`;
  try {
    await rateLimiter.consume(identifier);
  } catch (error) {
    console.log(error);
    throw new Error("Too many requests. Try again later.");
  }
}

export async function testRateLimit() {
  try {
    await rateLimit("test-button");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
}
