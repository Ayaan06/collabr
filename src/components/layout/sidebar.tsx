"use client";

import {
  Compass,
  FolderOpen,
  Home,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/projects", label: "Explore Projects", icon: Compass },
  { href: "/people", label: "Find People", icon: Users },
  { href: "/projects?tab=mine", label: "My Projects", icon: FolderOpen },
  { href: "/messages", label: "Messages", icon: MessageSquare },
  { href: "/profile", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-shrink-0 lg:block">
      <div className="glass-panel sticky top-20 flex h-[calc(100vh-5rem)] flex-col gap-6 border border-white/10 bg-[#070b17]/80 p-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-white/80 transition hover:bg-white/10"
        >
          <Home className="h-4 w-4" />
          Back to home
        </Link>
        <nav className="space-y-1">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition",
                  active
                    ? "bg-gradient-to-r from-indigo-500/80 to-cyan-500/60 text-white shadow-[0_15px_40px_rgba(76,106,255,0.25)]"
                    : "text-white/70 hover:bg-white/5 hover:text-white",
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-600/40 to-cyan-500/30 p-4 text-white">
          <p className="text-sm font-semibold">Momentum tips</p>
          <p className="mt-2 text-xs text-white/80">
            Invite a contributor each week and keep shipping updates to stay on the radar.
          </p>
        </div>
      </div>
    </aside>
  );
}
