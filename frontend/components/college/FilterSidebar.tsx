"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterState = {
  type: string;
  state: string;
  minRating: string;
  minPlacement: string;
};

const types = ["", "IIT", "NIT", "IIIT", "GOVERNMENT", "PRIVATE", "DEEMED", "AUTONOMOUS"];
const states = ["", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Telangana", "Rajasthan", "Uttar Pradesh"];

export function FilterSidebar() {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initial = useMemo(
    () => ({
      type: search.get("type") ?? "",
      state: search.get("state") ?? "",
      minRating: search.get("minRating") ?? "",
      minPlacement: search.get("minPlacement") ?? ""
    }),
    [search]
  );

  const [filters, setFilters] = useState<FilterState>(initial);

  const apply = () => {
    const params = new URLSearchParams(search.toString());
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const clear = () => {
    const params = new URLSearchParams(search.toString());
    ["type", "state", "minRating", "minPlacement"].forEach((k) => params.delete(k));
    params.delete("page");
    setFilters({ type: "", state: "", minRating: "", minPlacement: "" });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <aside className="sticky top-20 h-fit rounded-2xl border border-border bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Filters</p>
        <button onClick={clear} className="text-xs text-accent">Clear all</button>
      </div>

      <div className="space-y-3 text-sm">
        <div>
          <label className="mb-1 block text-xs text-muted">College Type</label>
          <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
            {types.map((t) => <option key={t} value={t}>{t || "Any"}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted">State</label>
          <select value={filters.state} onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
            {states.map((s) => <option key={s} value={s}>{s || "Any"}</option>)}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted">Minimum Rating</label>
          <select value={filters.minRating} onChange={(e) => setFilters((f) => ({ ...f, minRating: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
            <option value="">Any</option>
            <option value="4.5">4.5+</option>
            <option value="4">4.0+</option>
            <option value="3.5">3.5+</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-xs text-muted">Min Avg Package (LPA)</label>
          <select value={filters.minPlacement} onChange={(e) => setFilters((f) => ({ ...f, minPlacement: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
            <option value="">Any</option>
            <option value="2000000">20+</option>
            <option value="1000000">10+</option>
            <option value="500000">5+</option>
          </select>
        </div>
      </div>

      <button onClick={apply} className="mt-4 w-full rounded-[8px] bg-accent px-4 py-2.5 font-semibold text-white">Apply Filters</button>
    </aside>
  );
}