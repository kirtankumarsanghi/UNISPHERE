"use client";

import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";

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

const collegeTypes = ["IIT", "NIT", "IIIT", "GOVERNMENT", "PRIVATE", "DEEMED", "AUTONOMOUS"];

const allStates = [
  "Andhra Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Delhi",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim",
  "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

const ratingOptions = [
  { label: "4.5+ ★", value: "4.5" },
  { label: "4.0+ ★", value: "4" },
  { label: "3.5+ ★", value: "3.5" },
  { label: "3.0+ ★", value: "3" },
];

const placementOptions = [
  { label: "Above 20 LPA", value: "2000000" },
  { label: "10–20 LPA", value: "1000000" },
  { label: "5–10 LPA", value: "500000" },
  { label: "Below 5 LPA", value: "100000" },
];

const feeRanges = [
  { label: "Under ₹1L", min: "0", max: "100000" },
  { label: "₹1L – ₹3L", min: "100000", max: "300000" },
  { label: "₹3L – ₹5L", min: "300000", max: "500000" },
  { label: "₹5L – ₹10L", min: "500000", max: "1000000" },
  { label: "₹10L+", min: "1000000", max: "10000000" },
];

function AccordionSection({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.04] pb-4">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-2 text-left"
      >
        <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">{title}</span>
        <ChevronDown size={14} className={`text-on-surface-variant/50 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? "mt-3 max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}>
        {children}
      </div>
    </div>
  );
}

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

  const activeCount = useMemo(() => {
    return Object.values(filters).filter((v) => v !== "").length;
  }, [filters]);

  const applyFilters = useCallback((newFilters: FilterState) => {
    const params = new URLSearchParams(search.toString());
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) params.set(k, v);
      else params.delete(k);
    });
    params.delete("page");
    const base = pathname || "/";
    const query = params.toString();
    router.push(query ? `${base}?${query}` : base);
  }, [search, router, pathname]);

  const update = (key: keyof FilterState, value: string) => {
    const next = { ...filters, [key]: value };
    setFilters(next);
    applyFilters(next);
  };

  const updateFeeRange = (min: string, max: string) => {
    const next = { ...filters, minFees: min, maxFees: max };
    setFilters(next);
    applyFilters(next);
  };

  const clear = () => {
    const empty: FilterState = { type: "", state: "", city: "", course: "", degree: "", minRating: "", minPlacement: "", minFees: "", maxFees: "", minYear: "", maxNirf: "" };
    setFilters(empty);
    applyFilters(empty);
  };

  const isActiveFee = (min: string, max: string) => filters.minFees === min && filters.maxFees === max;

  return (
    <aside className="sticky top-20 h-fit rounded-[2rem] glass-card p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-on-surface-variant/70" />
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest">Filters</span>
          {activeCount > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-background">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button onClick={clear} className="flex items-center gap-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70 transition-colors hover:text-on-surface">
            <X size={12} /> Clear
          </button>
        )}
      </div>

      <div className="space-y-1">
        {/* COLLEGE TYPE — Chip selector */}
        <AccordionSection title="College Type" defaultOpen>
          <div className="flex flex-wrap gap-1.5">
            {collegeTypes.map((t) => (
              <button
                key={t}
                onClick={() => update("type", filters.type === t ? "" : t)}
                className={`rounded-full px-3 py-1.5 font-label-caps text-label-caps transition-all duration-200 ${
                  filters.type === t
                    ? "bg-primary text-background ring-1 ring-primary shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                    : "glass-panel text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </AccordionSection>

        {/* LOCATION */}
        <AccordionSection title="Location" defaultOpen>
          <div className="space-y-2">
            <select
              value={filters.state}
              onChange={(e) => update("state", e.target.value)}
              className="w-full rounded-xl glass-panel px-3 py-2.5 font-body-md text-sm text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary/50"
            >
              <option value="" className="bg-surface-deep">All States</option>
              {allStates.map((s) => <option key={s} value={s} className="bg-surface-deep">{s}</option>)}
            </select>
            <input
              value={filters.city}
              onChange={(e) => update("city", e.target.value)}
              placeholder="City name..."
              className="w-full rounded-xl glass-panel px-3 py-2.5 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </AccordionSection>

        {/* FEES — Chip ranges */}
        <AccordionSection title="Annual Fees">
          <div className="flex flex-wrap gap-1.5">
            {feeRanges.map((r) => (
              <button
                key={r.label}
                onClick={() => isActiveFee(r.min, r.max) ? updateFeeRange("", "") : updateFeeRange(r.min, r.max)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
                  isActiveFee(r.min, r.max)
                    ? "bg-white text-black ring-1 ring-white"
                    : "bg-white/[0.03] text-text-secondary ring-1 ring-white/[0.06] hover:bg-white/[0.06] hover:text-text-primary"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </AccordionSection>

        {/* PLACEMENTS */}
        <AccordionSection title="Placements">
          <div className="space-y-1">
            {placementOptions.map((p) => (
              <button
                key={p.value}
                onClick={() => update("minPlacement", filters.minPlacement === p.value ? "" : p.value)}
                className={`flex w-full items-center gap-2 rounded-xl px-3 py-2 font-body-md text-[13px] transition-all ${
                  filters.minPlacement === p.value
                    ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                    : "text-on-surface-variant hover:bg-white/[0.03] hover:text-on-surface"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${filters.minPlacement === p.value ? "bg-primary" : "bg-white/20"}`} />
                {p.label}
              </button>
            ))}
          </div>
        </AccordionSection>

        {/* RATING */}
        <AccordionSection title="Rating">
          <div className="flex flex-wrap gap-1.5">
            {ratingOptions.map((r) => (
              <button
                key={r.value}
                onClick={() => update("minRating", filters.minRating === r.value ? "" : r.value)}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition-all duration-200 ${
                  filters.minRating === r.value
                    ? "bg-white text-black ring-1 ring-white"
                    : "bg-white/[0.03] text-text-secondary ring-1 ring-white/[0.06] hover:bg-white/[0.06] hover:text-text-primary"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
        </AccordionSection>

        {/* ACADEMICS */}
        <AccordionSection title="Academics">
          <div className="space-y-2">
            <input
              value={filters.course}
              onChange={(e) => update("course", e.target.value)}
              placeholder="Course (e.g. CSE)"
              className="w-full rounded-xl glass-panel px-3 py-2.5 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
            />
            <input
              value={filters.degree}
              onChange={(e) => update("degree", e.target.value)}
              placeholder="Degree (e.g. B.Tech)"
              className="w-full rounded-xl glass-panel px-3 py-2.5 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </AccordionSection>

        {/* RANKINGS */}
        <AccordionSection title="Rankings & Year">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="mb-1 block font-label-caps text-[9px] uppercase tracking-wider text-on-surface-variant/50">Est. after</label>
              <input
                value={filters.minYear}
                onChange={(e) => update("minYear", e.target.value)}
                placeholder="e.g. 2000"
                className="w-full rounded-xl glass-panel px-3 py-2 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="mb-1 block font-label-caps text-[9px] uppercase tracking-wider text-on-surface-variant/50">Max NIRF</label>
              <input
                value={filters.maxNirf}
                onChange={(e) => update("maxNirf", e.target.value)}
                placeholder="e.g. 50"
                className="w-full rounded-xl glass-panel px-3 py-2 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>
        </AccordionSection>
      </div>
    </aside>
  );
}
