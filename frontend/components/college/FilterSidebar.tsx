"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterState = {
  type: string;
  state: string;
  city: string;
  course: string;
  degree: string;
  minRating: string;
  minPlacement: string;
  minFees: string;
  maxFees: string;
  minYear: string;
  maxNirf: string;
};

const types = ["", "IIT", "NIT", "IIIT", "GOVERNMENT", "PRIVATE", "DEEMED"];
const states = ["", "Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Telangana", "Rajasthan", "Uttar Pradesh", "West Bengal", "Punjab"];

export function FilterSidebar() {
  const search = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initial = useMemo(
    () => ({
      type: search.get("type") ?? "",
      state: search.get("state") ?? "",
      city: search.get("city") ?? "",
      course: search.get("course") ?? "",
      degree: search.get("degree") ?? "",
      minRating: search.get("minRating") ?? "",
      minPlacement: search.get("minPlacement") ?? "",
      minFees: search.get("minFees") ?? "",
      maxFees: search.get("maxFees") ?? "",
      minYear: search.get("minYear") ?? "",
      maxNirf: search.get("maxNirf") ?? ""
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
    const base = pathname || "/";
    const query = params.toString();
    router.push(query ? `${base}?${query}` : base);
  };

  const clear = () => {
    const params = new URLSearchParams(search.toString());
    ["type", "state", "city", "course", "degree", "minRating", "minPlacement", "minFees", "maxFees", "minYear", "maxNirf"].forEach((k) => params.delete(k));
    params.delete("page");
    setFilters({ type: "", state: "", city: "", course: "", degree: "", minRating: "", minPlacement: "", minFees: "", maxFees: "", minYear: "", maxNirf: "" });
    const base = pathname || "/";
    const query = params.toString();
    router.push(query ? `${base}?${query}` : base);
  };

  return (
    <aside className="sticky top-20 h-fit rounded-2xl border border-border bg-surface p-4">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-muted">Filters</p>
        <button type="button" onClick={clear} className="text-xs text-accent">Reset</button>
      </div>

      <div className="space-y-3 text-sm">
        <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
          {types.map((t) => <option key={t} value={t}>{t || "Type: Any"}</option>)}
        </select>

        <select value={filters.state} onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
          {states.map((s) => <option key={s} value={s}>{s || "State: Any"}</option>)}
        </select>

        <input value={filters.city} onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))} placeholder="City" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />
        <input value={filters.course} onChange={(e) => setFilters((f) => ({ ...f, course: e.target.value }))} placeholder="Course" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />
        <input value={filters.degree} onChange={(e) => setFilters((f) => ({ ...f, degree: e.target.value }))} placeholder="Degree (B.Tech, MBA)" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />

        <div className="grid grid-cols-2 gap-2">
          <input value={filters.minFees} onChange={(e) => setFilters((f) => ({ ...f, minFees: e.target.value }))} placeholder="Min Fees" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />
          <input value={filters.maxFees} onChange={(e) => setFilters((f) => ({ ...f, maxFees: e.target.value }))} placeholder="Max Fees" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />
        </div>

        <select value={filters.minPlacement} onChange={(e) => setFilters((f) => ({ ...f, minPlacement: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
          <option value="">Placement: Any</option>
          <option value="2000000">Above ?20LPA</option>
          <option value="1000000">?10-20LPA</option>
          <option value="500000">?5-10LPA</option>
          <option value="100000">Below ?5LPA</option>
        </select>

        <select value={filters.minRating} onChange={(e) => setFilters((f) => ({ ...f, minRating: e.target.value }))} className="w-full rounded-xl border border-border bg-surface2 px-3 py-2">
          <option value="">Rating: Any</option>
          <option value="4.5">4.5+</option>
          <option value="4">4.0+</option>
          <option value="3.5">3.5+</option>
        </select>

        <div className="grid grid-cols-2 gap-2">
          <input value={filters.minYear} onChange={(e) => setFilters((f) => ({ ...f, minYear: e.target.value }))} placeholder="Est. after" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />
          <input value={filters.maxNirf} onChange={(e) => setFilters((f) => ({ ...f, maxNirf: e.target.value }))} placeholder="Max NIRF" className="w-full rounded-xl border border-border bg-surface2 px-3 py-2" />
        </div>
      </div>

      <button type="button" onClick={apply} className="mt-4 w-full rounded-[8px] bg-accent px-4 py-2.5 font-semibold text-white">Apply Filters</button>
    </aside>
  );
}
