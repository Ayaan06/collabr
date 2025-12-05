"use client";

import { useMemo, useState } from "react";
import { UserCard } from "@/components/cards/user-card";
import { Chip } from "@/components/ui/chip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { contributors } from "@/lib/mock-data";

const skillFilters = [
  "Next.js",
  "TypeScript",
  "Product Design",
  "Data Viz",
  "AI",
  "React Native",
  "UX Research",
  "Growth",
];

export default function PeoplePage() {
  const [search, setSearch] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string>("");
  const [location, setLocation] = useState("");

  const filtered = useMemo(() => {
    return contributors.filter((person) => {
      const matchesSearch =
        person.name.toLowerCase().includes(search.toLowerCase()) ||
        person.headline.toLowerCase().includes(search.toLowerCase());
      const matchesSkills = skills.length
        ? skills.every((skill) => person.skills.join(" ").toLowerCase().includes(skill.toLowerCase()))
        : true;
      const matchesAvailability = availability ? person.availability === availability : true;
      const matchesLocation = location
        ? person.location.toLowerCase().includes(location.toLowerCase())
        : true;
      return matchesSearch && matchesSkills && matchesAvailability && matchesLocation;
    });
  }, [availability, location, search, skills]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">Talent network</p>
          <h1 className="text-2xl font-semibold text-white">Find people</h1>
        </div>
        <Button variant="secondary">Post a request</Button>
      </div>

      <div className="glass-panel space-y-3 border border-white/10 bg-white/5 p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <Input
            placeholder="Search by name or headline"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="flex flex-wrap items-center gap-2">
            {["Nights/Weekends", "Part-time", "Full-time"].map((option) => (
              <Chip
                key={option}
                active={availability === option}
                onClick={() => setAvailability(availability === option ? "" : option)}
              >
                {option}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {skillFilters.map((skill) => {
            const active = skills.includes(skill);
            return (
              <Chip
                key={skill}
                active={active}
                onClick={() =>
                  setSkills((prev) => (active ? prev.filter((s) => s !== skill) : [...prev, skill]))
                }
              >
                {skill}
              </Chip>
            );
          })}
        </div>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((person) => (
            <UserCard key={person.id} user={person} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No contributors match yet"
          description="Adjust filters or post a request to invite talent."
          actionLabel="Clear filters"
          onAction={() => {
            setAvailability("");
            setLocation("");
            setSearch("");
            setSkills([]);
          }}
        />
      )}
    </div>
  );
}
