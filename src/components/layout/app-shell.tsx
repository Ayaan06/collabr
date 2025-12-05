"use client";

import type { ReactNode } from "react";
import { TopNav } from "./top-nav";
import { Sidebar } from "./sidebar";
import { MobileNav } from "./mobile-nav";

type Props = {
  children: ReactNode;
};

export function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_20%,rgba(92,76,255,0.18),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(45,212,191,0.12),transparent_25%),var(--background)] text-foreground">
      <TopNav />
      <div className="mx-auto flex max-w-7xl gap-6 px-4 pb-20 pt-6 lg:px-6">
        <Sidebar />
        <main className="flex-1 space-y-6">{children}</main>
      </div>
      <MobileNav />
    </div>
  );
}
