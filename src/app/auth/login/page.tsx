"use client";

import Link from "next/link";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600/40 via-purple-600/20 to-cyan-400/30 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.2),transparent_25%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm">
              BuildUp for fast-moving teams
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight">
              Ship faster with collaborators who care.
            </h1>
            <p className="mt-3 max-w-xl text-white/80">
              Matching, messaging, and project health in one place. Beautiful UI that is ready to
              plug into your API later.
            </p>
          </div>
          <div className="space-y-3">
            {["Smart matching", "Glassmorphism UI", "Framer Motion ready"].map((item) => (
              <div key={item} className="flex items-center gap-2 text-white/80">
                <div className="h-2 w-2 rounded-full bg-emerald-300" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-[var(--background)] px-6 py-12">
        <div className="w-full max-w-lg space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="space-y-2">
            <p className="text-sm text-white/60">Welcome back</p>
            <h2 className="text-2xl font-semibold text-white">Sign in to BuildUp</h2>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-white/70">Email</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input type="email" placeholder="you@startups.com" className="pl-10" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                <Input type="password" placeholder="••••••••" className="pl-10" required />
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-white/60">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-white/30 bg-white/5" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link href="#" className="text-cyan-200 hover:text-white">
                Forgot password?
              </Link>
            </div>
            <Button className="w-full">Sign in</Button>
          </form>
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>New here?</span>
            <Link href="/auth/register" className="inline-flex items-center gap-2 text-cyan-200">
              Create an account <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
