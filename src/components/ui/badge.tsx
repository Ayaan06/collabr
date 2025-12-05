import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "muted" | "success" | "outline";
};

export function Badge({ children, className, variant = "default", ...props }: BadgeProps) {
  const styles: Record<NonNullable<BadgeProps["variant"]>, string> = {
    default: "bg-white/10 text-white",
    muted: "bg-white/5 text-white/70 border border-white/10",
    success: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/40",
    outline: "border border-white/20 text-white",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
