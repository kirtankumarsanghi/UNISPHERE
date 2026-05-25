"use client";
import { ArrowRight, X } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/hooks/useCompare";

export function CompareTray() {
  const { compareColleges, compareIds, removeFromCompare } = useCompare();
  if (!compareColleges.length) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[min(95vw,850px)] -translate-x-1/2 rounded-[14px] border border-accent/60 bg-surface/95 p-3 shadow-[0_8px_40px_rgba(108,99,255,0.25)] backdrop-blur">
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-muted">Comparing</div>
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {compareColleges.map((c) => (
            <span key={c.id} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1 text-xs">
              {c.abbreviation}
              <button onClick={() => removeFromCompare(c.id)} aria-label="Remove from compare" className="text-muted hover:text-text">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
        <Link href={`/compare?ids=${compareIds.join(",")}`} className="inline-flex items-center gap-1 rounded-[8px] bg-accent px-4 py-2 text-sm font-semibold text-white">
          Compare Now <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
