import type { InputHTMLAttributes } from "react";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-foreground placeholder:text-white/50 outline-none transition focus:border-white/30 focus:ring-2 focus:ring-indigo-500/50",
        className,
      )}
      {...props}
    />
  ),
);
Input.displayName = "Input";
