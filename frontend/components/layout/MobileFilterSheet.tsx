"use client";

import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import { FilterSidebar } from "@/components/college/FilterSidebar";

export function MobileFilterSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full glass-card bg-surface/90 backdrop-blur-xl px-5 py-2.5 font-label-caps text-label-caps uppercase tracking-widest text-on-surface shadow-[0_4px_30px_rgba(0,0,0,0.5)] md:hidden"
      >
        <SlidersHorizontal size={14} /> Filters
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-[2rem] glass-card bg-surface-deep/90 p-6 backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface">Filters</h3>
              <button onClick={() => setOpen(false)} className="rounded-full glass-panel p-2 text-on-surface-variant hover:text-on-surface"><X size={14} /></button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      ) : null}
    </>
  );
}