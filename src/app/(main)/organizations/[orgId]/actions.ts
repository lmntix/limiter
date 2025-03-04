"use server";

import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";

export async function setActiveOrganization(activeOrgId: string) {
  await auth.api.setActiveOrganization({
    headers: await headers(),
    body: {
      organizationId: activeOrgId,
    },
  });

  console.log("active org updated");
}
