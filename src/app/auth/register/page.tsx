"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Mail, User } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Chip } from "@/components/ui/chip";

const roles = [
  {
    id: "founder",
    title: "Founder",
    hint: "You’ll be able to create projects and find talent.",
  },
  {
    id: "contributor",
    title: "Contributor",
    hint: "You’ll be able to showcase skills and join projects.",
  },
];

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const initialRole = (searchParams.get("role") as "founder" | "contributor") ?? "founder";
  const [role, setRole] = useState<"founder" | "contributor">(initialRole);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-600/40 via-purple-600/20 to-cyan-400/30 lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.16),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.2),transparent_25%)]" />
        <div className="relative z-10 flex h-full flex-col justify-between p-12 text-white">
          <div>
            <div className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm">
              BuildUp for founders & contributors
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight">Start collaborating today.</h1>
            <p className="mt-3 max-w-xl text-white/80">
              Matching, messaging, and project health in one place. Capture your role, add skills,
              and get paired with projects instantly.
            </p>
          </div>
          <div className="grid gap-3 text-white/80">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-300" />
              Role-aware dashboard for founders and contributors.
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-300" />
              Glassmorphism cards and gradient accents baked in.
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-300" />
              Ready to plug into APIs later—mock data for now.
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center bg-[var(--background)] px-6 py-12">
        <div className="w-full max-w-lg space-y-8 rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
          <div className="space-y-2">
            <p className="text-sm text-white/60">Create your account</p>
            <h2 className="text-2xl font-semibold text-white">Join BuildUp</h2>
          </div>
          <form className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm text-white/70">Name</label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input placeholder="Alex Founder" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-white/70">Email</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input type="email" placeholder="you@startups.com" className="pl-10" required />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Role</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((item) => (
                  <Chip
                    key={item.id}
                    active={role === item.id}
                    onClick={() => setRole(item.id as typeof role)}
                    className="justify-between"
                  >
                    <div className="text-left">
                      <div className="font-semibold">{item.title}</div>
                      <div className="text-[11px] text-white/70">{item.hint}</div>
                    </div>
                  </Chip>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">Password</label>
              <Input type="password" placeholder="••••••••" required />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/70">What do you want to build?</label>
              <Textarea placeholder="Tell collaborators about your vision and what you need." rows={3} />
            </div>
            <Button className="w-full">Create account</Button>
          </form>
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Already have an account?</span>
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-cyan-200">
              Sign in <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
