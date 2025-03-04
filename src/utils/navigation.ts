import { Home, Users, Settings } from "lucide-react";
import { NavItem } from "@/types/nav";

export const getMainNavItems = (orgId: string): NavItem[] => [
  {
    title: "Dashboard",
    url: `/organizations/${orgId}/dashboard`,
    icon: Home,
    isActive: false,
    permission: "dashboard:view",
  },
  {
    title: "Members",
    url: `/organizations/${orgId}/members`,
    icon: Users,
    isActive: false,
    permission: "members:view",
  },
  {
    title: "Settings",
    url: `/organizations/${orgId}/settings`,
    icon: Settings,
    isActive: false,
    permission: "settings:view",
  },
];
