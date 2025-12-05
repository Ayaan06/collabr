import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/sign-out-button";

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur">
      <Link href="/" className="text-lg font-semibold">
        collabr
      </Link>
      <nav className="flex items-center gap-3">
        {session?.user ? (
          <>
            <span className="text-sm text-muted-foreground">
              {session.user.name ?? session.user.email}
            </span>
            <SignOutButton />
          </>
        ) : (
          <Button asChild variant="outline">
            <Link href="/signin">Sign in</Link>
          </Button>
        )}
      </nav>
    </header>
  );
}
