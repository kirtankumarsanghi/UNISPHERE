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
        className="fixed bottom-20 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm md:hidden"
      >
        <SlidersHorizontal size={14} /> Filters
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-auto rounded-t-2xl border border-border bg-bg p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-syne text-lg font-bold">Filters</h3>
              <button onClick={() => setOpen(false)} className="rounded-full border border-border p-1"><X size={14} /></button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      ) : null}
    </>
  );
}