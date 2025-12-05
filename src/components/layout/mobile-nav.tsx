"use client";

import { Compass, Home, MessageCircle, Settings, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard", label: "Home", icon: Home },
  { href: "/projects", label: "Projects", icon: Compass },
  { href: "/people", label: "People", icon: Users },
  { href: "/messages", label: "Messages", icon: MessageCircle },
  { href: "/profile", label: "Me", icon: Settings },
];

export function MobileNav() {
  const pathname = usePathname();
  return (
    <nav className="fixed bottom-4 left-0 right-0 z-40 mx-auto flex max-w-3xl items-center justify-between rounded-2xl border border-white/10 bg-[#0b1020]/80 px-3 py-2 text-xs text-white/70 shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur lg:hidden">
      {links.map((link) => {
        const active = pathname.startsWith(link.href);
        const Icon = link.icon;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex flex-1 flex-col items-center gap-1 rounded-xl px-2 py-1 transition",
              active ? "text-white" : "hover:text-white",
            )}
          >
            <Icon className={cn("h-4 w-4", active && "text-cyan-300")} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
