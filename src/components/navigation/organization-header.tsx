"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import ThemeToggle from "@/components/theme/theme-toggle";

export function OrganizationHeader() {
  const { open } = useSidebar();

  return (
    <header
      className={`fixed top-0 right-0 z-10 flex h-14 lg:h-[60px] items-center border-b bg-background px-2 sm:px-4 md:px-6 ${
        open
          ? "md:w-[calc(100%-var(--sidebar-width))]"
          : "md:w-[calc(100%-var(--sidebar-width-icon))]"
      } w-full left-0 md:left-auto transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center w-full overflow-x-auto">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-grow min-w-0">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-14 hidden sm:block" />
          <div className="overflow-hidden flex-shrink min-w-0 max-w-[50%]"></div>
        </div>
        <div className="flex-shrink-0 ml-2 sm:ml-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
