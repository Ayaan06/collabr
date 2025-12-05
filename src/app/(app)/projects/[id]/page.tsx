import { notFound } from "next/navigation";
import { CalendarClock, MapPin, Pencil, Sparkles, Users } from "lucide-react";
import { getProjectById, projects } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { ProjectCard } from "@/components/cards/project-card";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = getProjectById(params.id);
  if (!project) {
    notFound();
  }
  const isOwner = project.founder.id === "u1";
  const similar = projects.filter((p) => p.industry === project.industry && p.id !== project.id).slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-white/60">
            <Badge variant="muted">{project.industry}</Badge>
            <Badge variant="outline">{project.stage}</Badge>
            <div className="inline-flex items-center gap-1 rounded-full bg-white/5 px-3 py-1">
              <MapPin className="h-3.5 w-3.5" />
              {project.location}
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-white">{project.title}</h1>
          <p className="text-base text-white/70">{project.description}</p>
          <div className="flex items-center gap-3 text-sm text-white/60">
            <Users className="h-4 w-4" />
            {project.interestedCount} interested collaborators
            <CalendarClock className="ml-3 h-4 w-4" />
            Created {project.createdDaysAgo} days ago
          </div>
          <div className="flex flex-wrap gap-2">
            {project.neededSkills.map((skill) => (
              <Badge key={skill} variant="muted" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          {isOwner ? (
            <Button variant="secondary" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit project
            </Button>
          ) : (
            <>
              <Button className="gap-2">
                <Sparkles className="h-4 w-4" />
                Request to join
              </Button>
              <Button variant="secondary">Message founder</Button>
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
        <div className="glass-panel space-y-4 border border-white/10 bg-white/5 p-6">
          <h3 className="text-lg font-semibold text-white">About this project</h3>
          <p className="text-sm text-white/70 leading-relaxed">{project.longDescription}</p>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold text-white">Needed roles / skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.neededSkills.map((skill) => (
                <Badge key={skill} variant="muted">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-base font-semibold text-white">Team members</h4>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              {[project.founder.name, "Riley Novak", "Priya Desai"].map((name) => (
                <div key={name} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <Avatar name={name} size="sm" />
                  <div>
                    <p className="text-sm text-white">{name}</p>
                    <p className="text-[11px] text-white/60">Contributor</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="space-y-4">
          <div className="glass-panel space-y-3 border border-white/10 bg-white/5 p-5">
            <div className="flex items-center gap-3">
              <Avatar name={project.founder.name} size="md" />
              <div>
                <p className="text-sm font-semibold text-white">{project.founder.name}</p>
                <p className="text-xs text-white/60">{project.founder.headline}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              View founder profile
            </Button>
          </div>
          <div className="glass-panel space-y-3 border border-white/10 bg-white/5 p-5">
            <p className="text-sm font-semibold text-white">Project health</p>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-cyan-400" />
            </div>
            <p className="text-xs text-white/60">Momentum looks strong. Keep replying within 24h.</p>
          </div>
        </aside>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Similar projects</h3>
          <Button variant="ghost" size="sm">
            View all
          </Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {similar.map((item) => (
            <ProjectCard key={item.id} project={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
