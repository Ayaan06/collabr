import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignInButtons } from "@/components/sign-in-buttons";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
        <h1 className="mb-2 text-2xl font-semibold">Sign in to Collabr</h1>
        <p className="mb-6 text-sm text-muted-foreground">
          Use Google or GitHub to continue.
        </p>
        <SignInButtons />
      </div>
    </main>
  );
}
