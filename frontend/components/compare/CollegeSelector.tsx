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

  const slots = useMemo(() => [0, 1, 2], []);

  return (
    <>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        {slots.map((idx) => {
          const c = compareColleges[idx];
          if (c) {
            return <div key={idx} className="rounded-2xl border border-border bg-surface p-4"><div className="flex items-start justify-between"><div><p className="font-syne text-lg font-bold">{c.abbreviation}</p><p className="text-sm text-muted">{c.name}</p></div><button onClick={() => removeFromCompare(c.id)} className="text-muted hover:text-text"><X size={16} /></button></div></div>;
          }
          return <button key={idx} onClick={() => setOpen(true)} className="grid h-24 place-items-center rounded-2xl border border-dashed border-border bg-surface text-muted hover:border-accent hover:text-accent"><span className="inline-flex items-center gap-1 text-sm"><PlusCircle size={15} /> Add College</span></button>;
        })}
      </div>

      {open ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/55 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="w-[min(92vw,640px)] rounded-2xl border border-border bg-surface p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-syne text-xl font-bold">Add College to Compare</h3>
              <button onClick={() => setOpen(false)} className="rounded-full border border-border p-1"><X size={14} /></button>
            </div>
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search college" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />
            <div className="mt-3 max-h-72 space-y-2 overflow-auto">
              {results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => {
                    addToCompare({ id: r.id, name: r.name, abbreviation: r.abbreviation });
                    setOpen(false);
                  }}
                  className="w-full rounded-xl border border-border bg-surface2 px-3 py-2 text-left hover:border-accent"
                >
                  <p className="font-medium">{r.name}</p>
                  <p className="text-xs text-muted">{r.city}, {r.state}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}