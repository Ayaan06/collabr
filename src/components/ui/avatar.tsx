import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  name: string;
  size?: "sm" | "md" | "lg";
};

const sizes: Record<NonNullable<AvatarProps["size"]>, string> = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
};

export function Avatar({ name, className, size = "md", ...props }: AvatarProps) {
  const initial = name?.[0]?.toUpperCase() ?? "?";
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-white/10 to-white/5 font-semibold text-white/90",
        sizes[size],
        className,
      )}
      {...props}
    >
      {initial}
    </div>
  );
}
