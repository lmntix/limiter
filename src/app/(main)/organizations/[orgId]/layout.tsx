import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navigation/app-sidebar";
import { OrganizationHeader } from "@/components/navigation/organization-header";
import { auth } from "@/lib/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/utils";
import { getUserOrgDetails } from "@/utils/queries/organizations";

export default async function OrganizationLayout(props: {
  children: React.ReactNode;
  params: Promise<{ orgId: string }>;
}) {
  const params = await props.params;
  const { children } = props;
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }
  const activeOrgId = params.orgId;
  await auth.api.setActiveOrganization({
    headers: await headers(),
    body: {
      organizationId: activeOrgId,
    },
  });

  const userOrgDetails = await getUserOrgDetails(session.user.id, activeOrgId);
  if (!userOrgDetails) {
    redirect("/");
  }

  return (
    // <div className="flex h-screen">
    <div className="h-screen">
      <SidebarProvider>
        <AppSidebar org={userOrgDetails} />
        <div className="flex flex-col flex-1 overflow-hidden w-0 min-w-0">
          <OrganizationHeader />
          <main className="flex-1 overflow-y-auto pt-14 lg:pt-[60px]">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
