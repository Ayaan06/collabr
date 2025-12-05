"use client";

import { useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { ProjectStage } from "@/types";
import { industries } from "@/lib/mock-data";
import { Button } from "../ui/button";
import { Chip } from "../ui/chip";
import { Input } from "../ui/input";

export type ProjectFilters = {
  search: string;
  industry: string;
  stage: ProjectStage | "";
  remote: "Remote" | "Local" | "";
};

type Props = {
  filters: ProjectFilters;
  onChange: (filters: ProjectFilters) => void;
  stages: ProjectStage[];
  condensed?: boolean;
};

export function FilterBar({ filters, onChange, stages, condensed }: Props) {
  const hasFilters = useMemo(
    () => filters.industry || filters.stage || filters.remote || filters.search,
    [filters],
  );

  return (
    <div className="glass-panel flex flex-col gap-3 border border-white/10 bg-white/5 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-56">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
          <Input
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search projects, founders, or skills"
            className="bg-white/5 pl-9"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </Button>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="text-white/70 hover:text-white"
            onClick={() => onChange({ search: "", industry: "", stage: "", remote: "" })}
          >
            <X className="h-4 w-4" /> Clear
          </Button>
        )}
      </div>
      {!condensed && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-white/60">Industry:</span>
          {industries.map((industry) => (
            <Chip
              key={industry}
              active={filters.industry === industry}
              onClick={() =>
                onChange({
                  ...filters,
                  industry: filters.industry === industry ? "" : industry,
                })
              }
            >
              {industry}
            </Chip>
          ))}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-white/60">Stage:</span>
        {stages.map((stage) => (
          <Chip
            key={stage}
            active={filters.stage === stage}
            onClick={() => onChange({ ...filters, stage: filters.stage === stage ? "" : stage })}
          >
            {stage}
          </Chip>
        ))}
        <span className="text-xs text-white/60 ml-4">Work style:</span>
        {["Remote", "Local"].map((option) => (
          <Chip
            key={option}
            active={filters.remote === option}
            onClick={() =>
              onChange({
                ...filters,
                remote:
                  filters.remote === option ? "" : (option as ProjectFilters["remote"]),
              })
            }
          >
            {option}
          </Chip>
        ))}
      </div>
    </div>
  );
}
