import { ArrowRight, CheckCircle2, Globe, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { featureHighlights, logos, projects, testimonials } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/cards/project-card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_10%_20%,rgba(124,58,237,0.18),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(34,211,238,0.12),transparent_25%),var(--background)] text-foreground">
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-12 sm:px-6 lg:px-8">
        <Hero />
        <HowItWorks />
        <FeatureGrid />
        <SocialProof />
      </main>
    </div>
  );
}

function Hero() {
  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
      <div className="space-y-6">
        <Badge variant="muted" className="border-white/20 bg-white/5 text-sm">
          Modern workspace for founders & contributors
        </Badge>
        <div className="space-y-4">
          <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Connect your startup idea with{" "}
            <span className="text-gradient">the right people</span> and ship faster.
          </h1>
          <p className="text-lg text-white/70">
            BuildUp helps founders showcase projects, attract vetted contributors, and keep
            collaboration moving with messaging, matching, and project health in one place.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <Link href="/auth/register">I have a project</Link>
          </Button>
          <Button variant="secondary" size="lg" asChild>
            <Link href="/auth/register?role=contributor">I want to help</Link>
          </Button>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            No fees until you hire.
          </div>
        </div>
        <div className="glass-panel inline-flex items-center gap-4 border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
          <Users className="h-4 w-4 text-cyan-300" />
          <span>
            250+ projects active this week. <strong className="text-white">Curated intros</strong>{" "}
            shipped in hours, not days.
          </span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-500/10 blur-3xl" />
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Live projects</p>
              <p className="text-xl font-semibold text-white">Curated for you</p>
            </div>
            <Badge variant="outline">Live preview</Badge>
          </div>
          <div className="grid gap-3">
            {projects.slice(0, 3).map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      title: "Create a profile",
      description: "Share your role, skills, and what you want to build or join.",
    },
    {
      title: "Post or join a project",
      description: "Launch an idea or request to join projects that need your skills.",
    },
    {
      title: "Collaborate",
      description: "Match, message, and move work forward with a shared board.",
    },
  ];
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="muted">How it works</Badge>
        <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step, idx) => (
          <div
            key={step.title}
            className="glass-panel flex flex-col gap-2 border border-white/10 bg-white/5 p-4"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80">
              {idx + 1}
            </div>
            <h3 className="text-lg font-semibold text-white">{step.title}</h3>
            <p className="text-sm text-white/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <Badge variant="muted">Product</Badge>
        <h2 className="text-2xl font-semibold text-white">Built for speed and trust</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {featureHighlights.map((feature) => (
          <div
            key={feature.title}
            className="glass-panel group flex flex-col gap-3 border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1"
          >
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80">
              <FeatureIcon name={feature.icon} />
            </div>
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <p className="text-sm text-white/70">{feature.description}</p>
            <Link href="/dashboard" className="text-xs text-cyan-200 underline-offset-4 hover:underline">
              See in product →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

function FeatureIcon({ name }: { name: string }) {
  switch (name) {
    case "Sparkles":
      return <Sparkles className="h-5 w-5" />;
    case "MessageCircle":
      return <ArrowRight className="h-5 w-5" />;
    case "Kanban":
      return <Globe className="h-5 w-5" />;
    default:
      return <Users className="h-5 w-5" />;
  }
}

function SocialProof() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="muted">Trusted by builders</Badge>
          <h2 className="mt-2 text-2xl font-semibold text-white">What people say</h2>
        </div>
        <div className="hidden gap-3 sm:flex">
          {logos.map((logo) => (
            <div
              key={logo}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {testimonials.map((item) => (
          <div key={item.name} className="glass-panel border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400" />
              <div>
                <p className="text-white">{item.name}</p>
                <p className="text-xs text-white/60">{item.role}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-white/70">“{item.quote}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
