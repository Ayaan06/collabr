"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowRight, MessageCircle, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { projects, contributors } from "@/lib/mock-data";
import { ProjectCard } from "@/components/cards/project-card";
import type { User } from "@/types";

export default function PublicProfilePage() {
  const params = useParams();
  const user = useMemo<User>(() => {
    return contributors.find((p) => p.id === params?.id) ?? contributors[0];
  }, [params]);
  const userProjects = projects.slice(0, 2);
  const [tab, setTab] = useState<"overview" | "projects">("overview");

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="flex flex-wrap items-center gap-4">
          <Avatar name={user.name} size="lg" className="h-16 w-16 text-xl" />
          <div>
            <h1 className="text-2xl font-semibold text-white">{user.name}</h1>
            <p className="text-white/70">{user.headline}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Badge variant="muted">{user.role}</Badge>
              <Badge variant="outline">{user.location}</Badge>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="secondary" className="gap-2">
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite to project
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <TabButton active={tab === "overview"} onClick={() => setTab("overview")}>
          Overview
        </TabButton>
        <TabButton active={tab === "projects"} onClick={() => setTab("projects")}>
          Projects
        </TabButton>
      </div>

      {tab === "overview" ? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Section title="About">
              <p className="text-sm text-white/70">{user.bio}</p>
            </Section>
            <Section title="Skills">
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="muted">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Section>
            <Section title="Interests">
              <div className="flex flex-wrap gap-2">
                {user.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </Section>
          </div>
          <div className="space-y-4">
            <Section title="Availability">
              <Badge variant="outline">{user.availability ?? "Flexible"}</Badge>
            </Section>
            <Section title="Location">
              <p className="text-sm text-white/70">{user.location}</p>
            </Section>
            <Section title="Links">
              <Button variant="secondary" size="sm" className="w-full justify-between">
                Portfolio <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" className="w-full justify-between">
                LinkedIn <ArrowRight className="h-4 w-4" />
              </Button>
            </Section>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {userProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm transition ${
        active ? "bg-white/10 text-white" : "bg-white/5 text-white/70 hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass-panel space-y-2 border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-white">{title}</p>
      {children}
    </div>
  );
}
