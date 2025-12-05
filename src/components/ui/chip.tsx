"use client";

import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ChipProps = HTMLAttributes<HTMLButtonElement> & {
  active?: boolean;
};

export function Chip({ className, active, children, ...props }: ChipProps) {
  return (
    <button
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition",
        active
          ? "border-transparent bg-white/15 text-white shadow-[0_10px_30px_rgba(124,58,237,0.35)]"
          : "border-white/10 bg-white/5 text-white/70 hover:border-white/20 hover:text-white",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
