import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "glass-panel relative overflow-hidden border border-white/10 bg-white/5 p-5",
        className,
      )}
      {...props}
    />
  );
}
