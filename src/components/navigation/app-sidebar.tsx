"use client";

import * as React from "react";
import Image from "next/image";
import { NavMain } from "@/components/navigation/nav-main";
import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Separator } from "../ui/separator";
import { getAuthorizedNavItems } from "@/lib/auth/nav-permission";
import { UserOrganizationDetails } from "@/types/organization";
import { OrgOptions } from "./org-options";

type Props = React.ComponentProps<typeof Sidebar> & {
  org: UserOrganizationDetails;
};

export function AppSidebar({ org, ...props }: Props) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <OrgOptions organization={org} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={getAuthorizedNavItems(org.id, org.role || "unknown")} />
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <NavUser userOrg={org} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
