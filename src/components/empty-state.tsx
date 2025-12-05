import type { ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
};

export function EmptyState({ title, description, actionLabel, onAction, icon }: Props) {
  return (
    <div className="glass-panel flex flex-col items-center justify-center gap-3 border border-dashed border-white/15 bg-white/5 px-6 py-10 text-center">
      <div className="rounded-full bg-white/5 p-3 text-white/70">{icon}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
      {actionLabel && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
