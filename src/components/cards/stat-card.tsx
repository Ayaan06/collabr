"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  label: string;
  value: string | number;
  trend?: string;
  icon?: ReactNode;
};

export function StatCard({ label, value, trend, icon }: Props) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="glass-panel flex items-center justify-between gap-3 border border-white/10 bg-gradient-to-br from-white/5 to-white/0 p-4"
    >
      <div className="flex flex-col gap-1">
        <span className="text-xs uppercase tracking-wide text-white/60">{label}</span>
        <span className="text-2xl font-semibold text-white">{value}</span>
        {trend && <span className="text-xs text-emerald-300">{trend}</span>}
      </div>
      {icon && <div className="text-white/80">{icon}</div>}
    </motion.div>
  );
}
