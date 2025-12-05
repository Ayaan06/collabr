"use client";

import { motion } from "framer-motion";
import { Bookmark, MapPin, Sparkles, Users } from "lucide-react";
import type { Project } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  project: Project;
  onAction?: (project: Project) => void;
  compact?: boolean;
  emphasize?: boolean;
};

export function ProjectCard({ project, onAction, compact, emphasize }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "glass-panel group flex h-full flex-col justify-between gap-4 border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-5",
        emphasize && "ring-1 ring-indigo-500/50 shadow-[0_20px_60px_rgba(68,82,240,0.25)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Badge variant="muted">{project.industry}</Badge>
            <Badge variant="outline">{project.stage}</Badge>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1">
              <MapPin className="h-3.5 w-3.5 text-white/60" />
              {project.location}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-white/70 line-clamp-2">{project.description}</p>
        </div>
        <button className="rounded-full bg-white/5 p-2 text-white/60 transition hover:bg-white/10">
          <Bookmark className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {project.neededSkills.map((skill) => (
          <Badge key={skill} variant="muted" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={project.founder.name} size="sm" />
          <div>
            <p className="text-sm font-semibold text-white">{project.founder.name}</p>
            <p className="text-xs text-white/60">{project.founder.headline}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-white/5 px-3 py-1 text-xs text-white/80">
            <Users className="h-3.5 w-3.5" />
            {project.interestedCount} interested
          </div>
          {!compact ? (
            <Button variant="secondary" size="sm" onClick={() => onAction?.(project)}>
              View details
            </Button>
          ) : (
            <Sparkles className="h-4 w-4 text-indigo-300" />
          )}
        </div>
      </div>
    </motion.div>
  );
}
