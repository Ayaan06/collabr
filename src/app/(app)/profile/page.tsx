"use client";

import { useMemo } from "react";
import { Camera, Upload } from "lucide-react";
import { ProfileForm } from "@/components/forms/profile-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { currentUser } from "@/lib/mock-data";

export default function ProfilePage() {
  const user = useMemo(() => currentUser, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-white/60">Your profile</p>
          <h1 className="text-2xl font-semibold text-white">{user.name}</h1>
        </div>
        <Badge variant="outline">Profile 80% complete</Badge>
      </div>

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="relative">
          <Avatar name={user.name} size="lg" className="h-16 w-16 text-xl" />
          <button className="absolute -right-2 -bottom-2 rounded-full border border-white/10 bg-white/10 p-2 text-white/80 hover:bg-white/20">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-white">{user.headline}</p>
          <p className="text-xs text-white/60">{user.location}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Upload className="h-4 w-4" />
            Upload photo
          </Button>
          <Button variant="secondary" size="sm">
            Preview public profile
          </Button>
        </div>
      </div>

      <ProfileForm user={user} />
    </div>
  );
}
