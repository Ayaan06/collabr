"use client";

import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Chip } from "../ui/chip";
import type { User } from "@/types";

const skillLibrary = [
  "Next.js",
  "TypeScript",
  "Product Design",
  "AI/LLMs",
  "Growth",
  "UX Research",
  "Data Viz",
  "React Native",
];

type Props = {
  user: User;
};

export function ProfileForm({ user }: Props) {
  const [skills, setSkills] = useState<string[]>(user.skills);
  const [bio, setBio] = useState(user.bio);

  return (
    <div className="glass-panel space-y-4 border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/60">Profile completeness</p>
          <div className="mt-1 flex items-center gap-2 text-white">
            <div className="h-2 w-36 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                style={{ width: `${user.profileCompletion ?? 70}%` }}
              />
            </div>
            <span className="text-sm">{user.profileCompletion ?? 70}%</span>
          </div>
        </div>
        <Badge variant="outline" className="uppercase">
          {user.role}
        </Badge>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-white/60">Name</p>
          <Input defaultValue={user.name} />
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-white/60">Headline</p>
          <Input defaultValue={user.headline} />
        </div>
        <div className="md:col-span-2">
          <p className="mb-2 text-xs uppercase tracking-wide text-white/60">Bio</p>
          <Textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            placeholder="Tell the community how you work and what you want to build."
          />
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-white/60">Location</p>
          <Input defaultValue={user.location} />
        </div>
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-white/60">Interests</p>
          <Input defaultValue={user.interests.join(", ")} />
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-xs uppercase tracking-wide text-white/60">Skills</div>
        <div className="flex flex-wrap gap-2">
          {skillLibrary.map((skill) => {
            const active = skills.includes(skill);
            return (
              <Chip
                key={skill}
                active={active}
                onClick={() =>
                  setSkills((prev) =>
                    prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
                  )
                }
              >
                {skill}
              </Chip>
            );
          })}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-sm text-white/60">
          Changes auto-save locally for now. API hooks come next.
        </div>
        <Button variant="secondary">Save profile</Button>
      </div>
    </div>
  );
}
