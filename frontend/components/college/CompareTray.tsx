"use client";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";

export function CompareTray() {
  const { compareColleges, compareIds, removeFromCompare } = useCompare();
  if (!compareColleges.length) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(95vw,850px)] -translate-x-1/2 rounded-2xl border border-border-default bg-bg-surface/80 p-4 shadow-modal backdrop-blur-xl animate-fade-in-up">
      <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-secondary">Comparing</div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          {compareColleges.map((c) => (
            <span key={c.id} className="inline-flex items-center gap-2 rounded-full border border-border-default bg-bg-elevated px-3 py-1.5 text-xs text-text-primary shadow-glow-sm">
              <span className="font-display font-bold tracking-wide">{c.abbreviation}</span>
              <button onClick={() => removeFromCompare(c.id)} aria-label="Remove from compare" className="text-text-muted transition-colors hover:text-text-primary">
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
        <Link href={`/compare?ids=${compareIds.join(",")}`} className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98]">
          Compare <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
