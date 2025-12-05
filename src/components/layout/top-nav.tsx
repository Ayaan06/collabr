"use client";

import { Bell, LogOut, MessageSquare, Search, Sparkles, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar } from "../ui/avatar";
import { Input } from "../ui/input";
import { ThemeToggle } from "../theme-toggle";

export function TopNav() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl">
      <div className="glass-panel flex items-center gap-4 border border-white/10 bg-[#070b17]/70 px-5 py-3">
        <Link href="/dashboard" className="flex items-center gap-2 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-lg font-bold text-white shadow-[0_10px_40px_rgba(124,58,237,0.45)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold">BuildUp</div>
            <div className="text-[11px] text-white/60">Founder ↔ Contributor hub</div>
          </div>
        </Link>
        <div className="relative hidden flex-1 items-center sm:flex">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input className="bg-white/5 pl-10" placeholder="Search projects or people" />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <IconButton icon={<Bell className="h-4 w-4" />} label="Notifications" />
          <IconButton icon={<MessageSquare className="h-4 w-4" />} label="Messages" />
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Avatar name={session.user.name ?? session.user.email ?? "You"} className="border-white/25" />
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/30 hover:bg-white/10"
              >
                <LogOut className="h-3 w-3" />
                Sign out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:border-white/30 hover:bg-white/10"
            >
              <UserCircle2 className="h-4 w-4" />
              Sign in
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

function IconButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:border-white/30 hover:bg-white/10"
      aria-label={label}
    >
      {icon}
    </button>
  );
}
