"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { testRateLimit } from "./actions";

export default function RateLimiterTest() {
  const [message, setMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await testRateLimit();
      const timestamp = new Date().toLocaleTimeString();
      setMessage(`Success! (${timestamp})`);
      setIsError(false);
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("An unknown error occurred");
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      Limiter Test
      <div className="flex flex-col items-center gap-4">
        <Button onClick={handleClick} disabled={loading}>
          {loading ? "Processing..." : "Test Rate Limit"}
        </Button>

        {message && (
          <div
            className={`p-4 rounded-md ${
              isError
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
