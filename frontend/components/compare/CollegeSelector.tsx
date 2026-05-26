"use client";

import { useEffect, useMemo, useState } from "react";
import { PlusCircle, X } from "lucide-react";
import { useCompare } from "@/hooks/useCompare";

type CollegeLite = { id: string; name: string; abbreviation: string; city: string; state: string; gradientFrom: string; gradientTo: string };

export function CollegeSelector() {
  const { compareColleges, removeFromCompare, addToCompare } = useCompare();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [results, setResults] = useState<CollegeLite[]>([]);

  useEffect(() => {
    if (!open) return;
    fetch(`/api/colleges?q=${encodeURIComponent(q)}&limit=8`)
      .then((r) => (r.ok ? r.json() : { colleges: [] }))
      .then((d) => setResults((d.colleges ?? []) as CollegeLite[]))
      .catch(() => setResults([]));
  }, [open, q]);

  const slots = useMemo(() => [0, 1, 2, 3, 4], []);

  return (
    <>
      <div className="mb-8 flex overflow-x-auto snap-x gap-4 pb-4 scrollbar-hide">
        {slots.map((idx) => {
          const c = compareColleges[idx];
          if (c) {
            return <div key={idx} className="shrink-0 snap-start w-[260px] sm:w-[300px] rounded-[2rem] glass-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-[0_4px_30px_rgba(78,222,163,0.15)]"><div className="flex items-start justify-between"><div><p className="font-headline-lg text-[24px] font-bold text-on-surface line-clamp-1">{c.abbreviation}</p><p className="mt-2 font-body-md text-on-surface-variant line-clamp-2">{c.name}</p></div><button onClick={() => removeFromCompare(c.id)} className="text-on-surface-variant hover:text-primary transition-colors ml-2"><X size={18} /></button></div></div>;
          }
          return <button key={idx} onClick={() => setOpen(true)} className="shrink-0 snap-start w-[260px] sm:w-[300px] grid h-48 place-items-center rounded-[2rem] glass-card transition-all hover:border-primary/50 hover:bg-white/[0.04] text-on-surface-variant hover:text-primary"><span className="flex flex-col items-center gap-3 font-label-caps text-[12px] uppercase tracking-widest"><div className="rounded-full border border-current p-1.5"><PlusCircle size={16} /></div> Add College</span></button>;
        })}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 backdrop-blur-md animate-fade-in" onClick={() => setOpen(false)}>
          <div className="w-[min(92vw,640px)] rounded-[2rem] glass-card bg-surface-deep/90 p-8 shadow-modal animate-fade-in-up backdrop-blur-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-headline-md text-[24px] text-on-surface">Add College to Compare</h3>
              <button onClick={() => setOpen(false)} className="rounded-full glass-panel p-2 text-on-surface-variant transition-colors hover:bg-white/[0.05] hover:text-on-surface"><X size={16} /></button>
            </div>
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search college..." className="w-full rounded-xl glass-panel px-5 py-4 font-body-md text-on-surface placeholder:text-on-surface-variant/50 transition-all focus:outline-none focus:ring-1 focus:ring-primary/50" />
            <div className="mt-4 max-h-72 space-y-3 overflow-auto">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    addToCompare({ id: r.id, name: r.name, abbreviation: r.abbreviation });
                    setOpen(false);
                  }}
                  className="w-full rounded-xl glass-panel px-5 py-4 text-left transition-all hover:border-primary/50 hover:bg-white/[0.05]"
                >
                  <p className="font-body-md font-semibold text-on-surface">{r.name}</p>
                  <p className="mt-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">{r.city}, {r.state}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}