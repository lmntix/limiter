"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface InvitationActionsProps {
  invitationId: string;
}

export function InvitationActions({ invitationId }: InvitationActionsProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action: "accept" | "reject") => {
    try {
      setIsLoading(true);
      if (action === "accept") {
        await authClient.organization.acceptInvitation({
          invitationId,
        });
      } else {
        await authClient.organization.rejectInvitation({
          invitationId,
        });
      }
      router.refresh();
    } catch (error) {
      console.error(`Failed to ${action} invitation:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="default"
        size="sm"
        onClick={() => handleAction("accept")}
        disabled={isLoading}
      >
        Accept
      </Button>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => handleAction("reject")}
        disabled={isLoading}
      >
        Reject
      </Button>
    </div>
  );
}
