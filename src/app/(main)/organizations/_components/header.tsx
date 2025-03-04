"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThemeToggle from "@/components/theme/theme-toggle";
import { LogoutButton } from "@/components/logout-button";

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="flex justify-between items-center px-4 sm:px-5 py-4 w-full">
        <Link href="/" className="items-center flex">
          <Image src="/logo.svg" alt="Site Logo" width={32} height={32} />
          <span className="ml-2 text-lg font-bold hidden sm:flex">
            Pocket Finance
          </span>
        </Link>

        <div className="flex space-x-2">
          <div className="flex-shrink-0">
            <ThemeToggle />
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
