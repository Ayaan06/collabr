"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { FilterBar, type ProjectFilters } from "@/components/filters/filter-bar";
import { ProjectCard } from "@/components/cards/project-card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { projects, stages } from "@/lib/mock-data";

export default function ProjectsPage() {
  const [filters, setFilters] = useState<ProjectFilters>({
    search: "",
    industry: "",
    stage: "",
    remote: "",
  });
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleFiltersChange = (next: ProjectFilters) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setLoading(true);
    setFilters(next);
    timerRef.current = setTimeout(() => setLoading(false), 500);
  };

  const filtered = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesIndustry = filters.industry ? project.industry === filters.industry : true;
      const matchesStage = filters.stage ? project.stage === filters.stage : true;
      const matchesRemote =
        filters.remote === ""
          ? true
          : filters.remote === "Remote"
            ? project.remote
            : !project.remote;
      return matchesSearch && matchesIndustry && matchesStage && matchesRemote;
    });
  }, [filters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">Discovery</p>
          <h1 className="text-2xl font-semibold text-white">Explore Projects</h1>
        </div>
        <Button variant="secondary">Create project</Button>
      </div>

      <FilterBar filters={filters} onChange={handleFiltersChange} stages={stages} />

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <Skeleton key={idx} className="h-56 w-full rounded-2xl" />
          ))}
        </div>
      ) : filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onAction={(p) => router.push(`/projects/${p.id}`)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No projects match these filters yet"
          description="Adjust filters or save a search to get notified."
          actionLabel="Clear filters"
          onAction={() => {
            if (timerRef.current) clearTimeout(timerRef.current);
            setLoading(false);
            setFilters({
              search: "",
              industry: "",
              stage: "",
              remote: "",
            });
          }}
        />
      )}
    </div>
  );
}
