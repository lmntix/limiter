import { Search } from "lucide-react";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { Input } from "@/components/ui/input";
import Header from "./_components/header";
import { redirect } from "next/navigation";
import { InvitationsDialog } from "./_components/invitations-dialog";
import { getSession } from "@/lib/auth/utils";
import {
  OrganizationList,
  OrganizationListSkeleton,
} from "./_components/organization-list";
import { Suspense } from "react";
import { getOrgListForUser } from "@/utils/queries/organizations";

async function OrganizationsData({ userId }: { userId: string }) {
  const organizations = await getOrgListForUser(userId);
  return <OrganizationList organizations={organizations} />;
}

export default async function OrganizationsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex flex-row justify-between items-center px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-center space-x-4 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search organizations..."
              className="pl-8 sm:min-w-48 sm:flex-1"
              type="search"
            />
          </div>
        </div>
        <div className="flex-shrink-0 flex space-x-2">
          <InvitationsDialog userEmail={session.user.email} />
        </div>
      </div>

      <main className="flex-grow w-full max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="space-y-6">
          <Suspense fallback={<OrganizationListSkeleton />}>
            <OrganizationsData userId={session.user.id} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
