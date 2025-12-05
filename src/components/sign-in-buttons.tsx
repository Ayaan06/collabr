"use client";

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
      >
        Continue with Google
      </Button>
      <Button
        className="w-full"
        variant="outline"
        onClick={() => signIn("github", { callbackUrl })}
      >
        Continue with GitHub
      </Button>
    </div>
  );
}
