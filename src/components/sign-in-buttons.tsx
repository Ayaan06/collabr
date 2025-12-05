"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignInButtons() {
  const callbackUrl = "/dashboard";

  return (
    <div className="flex flex-col gap-3">
      <Button
        className="w-full"
        variant="outline"
        onClick={() => signIn("google", { callbackUrl })}
        asChild
      >
        <Link href={`/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
          Continue with Google
        </Link>
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => signIn("github", { callbackUrl })}
        asChild
      >
        <Link href={`/api/auth/signin/github?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
          Continue with GitHub
        </Link>
      </Button>
    </div>
  );
}
