"use client";

import { motion } from "framer-motion";
import { MapPin, MessageCircle, UserPlus } from "lucide-react";
import type { User } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  user: User;
  highlight?: boolean;
};

export function UserCard({ user, highlight }: Props) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={cn(
        "glass-panel flex h-full flex-col gap-4 border border-white/10 bg-white/5 p-5",
        highlight && "ring-1 ring-indigo-500/50 shadow-[0_20px_60px_rgba(68,82,240,0.25)]",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={user.name} />
          <div>
            <p className="text-base font-semibold text-white">{user.name}</p>
            <p className="text-sm text-white/70">{user.headline}</p>
            <div className="mt-1 flex items-center gap-1 text-xs text-white/60">
              <MapPin className="h-3.5 w-3.5" />
              {user.location}
            </div>
          </div>
        </div>
        <Badge variant="outline" className="uppercase tracking-wide text-[10px]">
          {user.role}
        </Badge>
      </div>
      <p className="text-sm text-white/70 line-clamp-2">{user.bio}</p>
      <div className="flex flex-wrap gap-2">
        {user.skills.slice(0, 4).map((skill) => (
          <Badge key={skill} variant="muted" className="text-xs">
            {skill}
          </Badge>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" className="flex-1">
          View profile
        </Button>
        <Button variant="outline" size="sm">
          <MessageCircle className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="sm">
          <UserPlus className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
