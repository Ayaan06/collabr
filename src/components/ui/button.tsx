"use client";

import { motion } from "framer-motion";
import {
  cloneElement,
  isValidElement,
  type ButtonHTMLAttributes,
  type ElementType,
  type PropsWithChildren,
} from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "subtle";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
  loading?: boolean;
};

const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-3 py-2 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
  icon: "p-2",
};

const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary:
    "bg-gradient-to-r from-[#7c3aed] via-[#5b7cfa] to-[#22d3ee] text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40",
  secondary:
    "bg-white/5 text-white border border-white/10 hover:border-white/25 hover:bg-white/10",
  ghost: "text-white/80 hover:text-white bg-transparent",
  outline: "border border-white/10 text-white hover:border-white/30 hover:bg-white/5",
  subtle: "bg-muted text-foreground border border-white/10 hover:border-white/20",
};

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading,
  asChild,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const Comp: ElementType = motion.button;
  const motionProps = asChild ? {} : { whileTap: { scale: 0.98 }, whileHover: { y: -1 } };

  const content = (
    <>
      {loading && (
        <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
      )}
      {children}
    </>
  );

  if (asChild && isValidElement(children)) {
    return cloneElement(children as React.ReactElement, {
      className: cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
        variants[variant],
        sizes[size],
        loading && "opacity-75",
        (children as React.ReactElement).props?.className,
        className,
      ),
      children: content,
      ...props,
    });
  }

  return (
    <Comp
      {...motionProps}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
        variants[variant],
        sizes[size],
        loading && "opacity-75",
        className,
      )}
      {...props}
    >
      {content}
    </Comp>
  );
}
