"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { contributors, currentUser, projects, secondaryUser } from "@/lib/mock-data";
import type { Role, User } from "@/types";
import { StatCard } from "@/components/cards/stat-card";
import { ProjectCard } from "@/components/cards/project-card";
import { UserCard } from "@/components/cards/user-card";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DashboardPage() {
  const [role, setRole] = useState<Role>("founder");
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const user: User = role === "founder" ? currentUser : secondaryUser;
  const myProjects = useMemo(() => projects.filter((p) => p.founder.id === "u1"), []);
  const recommendedProjects = useMemo(() => projects.slice(0, 3), []);
  const suggestedContributors = contributors.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
            <Sparkles className="h-4 w-4 text-indigo-300" />
            Dashboard role aware
          </div>
          <h1 className="mt-3 text-3xl font-semibold text-white">
            Welcome back, {user.name.split(" ")[0]}
          </h1>
          <p className="text-white/60">{user.headline}</p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 text-sm">
          <Chip active={role === "founder"} onClick={() => setRole("founder")}>
            Founder view
          </Chip>
          <Chip active={role === "contributor"} onClick={() => setRole("contributor")}>
            Contributor view
          </Chip>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active projects" value={role === "founder" ? "4" : "6"} trend="+12% this week" />
        <StatCard label="New intros" value={role === "founder" ? "7" : "5"} trend="3 pending replies" />
        <StatCard label="Saved matches" value="12" trend="2 new" />
        <StatCard label="Messages" value="24" trend="+4 today" />
      </div>

      {role === "founder" ? (
        <>
          <SectionHeader
            title="My Projects"
            action="Create new project"
            onAction={() => setShowCreate(true)}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {loading
              ? Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton key={idx} className="h-48 w-full rounded-2xl" />
                ))
              : myProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    emphasize
                    onAction={(p) => router.push(`/projects/${p.id}`)}
                  />
                ))}
            {!loading && myProjects.length === 0 && (
              <EmptyState
                title="No projects yet"
                description="Create your first project to start attracting contributors."
                actionLabel="Create project"
              />
            )}
          </div>

          <SectionHeader title="Suggested contributors" action="Invite collaborator" />
          <div className="grid gap-4 md:grid-cols-3">
            {suggestedContributors.map((person) => (
              <UserCard key={person.id} user={person} />
            ))}
          </div>
        </>
      ) : (
        <>
          <SectionHeader title="Recommended projects" action="Browse all projects" />
          <div className="grid gap-4 md:grid-cols-2">
            {recommendedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onAction={(p) => router.push(`/projects/${p.id}`)}
              />
            ))}
          </div>
          <SectionHeader title="Saved / Recently viewed" action="View all saved" />
          <div className="grid gap-4 md:grid-cols-2">
            <EmptyState
              title="Nothing saved yet"
              description="Tap the bookmark on any project to keep it here."
              actionLabel="Explore projects"
            />
          </div>
        </>
      )}

      <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Create new project">
        <div className="space-y-3">
          <Input placeholder="Project title" />
          <Input placeholder="Industry" />
          <Textarea rows={3} placeholder="What are you building? Add a concise pitch." />
          <Button className="w-full" onClick={() => setShowCreate(false)}>
            Save draft
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function SectionHeader({
  title,
  action,
  onAction,
}: {
  title: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {action && (
        <Button variant="secondary" size="sm" className="gap-2" onClick={onAction}>
          {action} <ArrowRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
