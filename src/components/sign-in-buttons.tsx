"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInButtons() {
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const callbackUrl = origin ? `${origin}/dashboard` : "/dashboard";

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl, redirect: true })}
      >
        Continue with Google
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => signIn("github", { callbackUrl, redirect: true })}
      >
        Continue with GitHub
      </Button>
    </div>
  );
}
