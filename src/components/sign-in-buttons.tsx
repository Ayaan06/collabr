"use client";

import { Button } from "@/components/ui/button";

export function SignInButtons() {
  const callbackUrl = "/dashboard";

  return (
    <div className="flex flex-col gap-3">
      <Button className="w-full" variant="outline" asChild>
        <a href={`/api/auth/signin/google?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
          Continue with Google
        </a>
      </Button>
      <Button className="w-full" variant="outline" asChild>
        <a href={`/api/auth/signin/github?callbackUrl=${encodeURIComponent(callbackUrl)}`}>
          Continue with GitHub
        </a>
      </Button>
    </div>
  );
}
