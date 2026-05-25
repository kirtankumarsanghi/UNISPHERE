"use client";

import { useEffect, useMemo, useState } from "react";
import { useCompare } from "@/hooks/useCompare";
import { getBestValue, formatFees, formatPackage } from "@/lib/utils";
import { CollegeSelector } from "@/components/compare/CollegeSelector";
import { Scale, Save } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/providers/ToastProvider";

type College = {
  id: string; name: string; abbreviation: string; city: string; state: string;
  type: string; established: number; annualFees: number; rating: number;
  totalReviews: number; nirf: number | null;
  placements: { avgPackage: number; highestPackage: number; medianPackage: number; placementPercent: number } | null;
  courses: { name: string; degree: string }[];
};

export default function ComparePage() {
  const { compareIds, clearCompare, setCompare } = useCompare();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { data: session } = useSession();
  const { push } = useToast();

  useEffect(() => {
    const idsParam = new URLSearchParams(window.location.search).get("ids");
    if (!idsParam || compareIds.length) return;

    const ids = idsParam.split(",").map((id) => id.trim()).filter(Boolean).slice(0, 3);
    if (!ids.length) return;

    fetch(`/api/colleges/compare?ids=${ids.join(",")}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d: College[]) => {
        const items = d.map((c) => ({ id: c.id, name: c.name, abbreviation: c.abbreviation }));
        if (items.length) setCompare(items);
      })
      .catch(() => undefined);
  }, [compareIds.length, setCompare]);

  useEffect(() => {
    if (!compareIds.length) { setColleges([]); return; }
    setLoading(true);
    fetch(`/api/colleges/compare?ids=${compareIds.join(",")}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setColleges(d))
      .catch(() => setColleges([]))
      .finally(() => setLoading(false));
  }, [compareIds]);

  const best = useMemo(() => {
    const fees = getBestValue(colleges.map((c) => c.annualFees), "lowest");
    const avg = getBestValue(colleges.map((c) => c.placements?.avgPackage ?? 0), "highest");
    const high = getBestValue(colleges.map((c) => c.placements?.highestPackage ?? 0), "highest");
    const med = getBestValue(colleges.map((c) => c.placements?.medianPackage ?? 0), "highest");
    const pct = getBestValue(colleges.map((c) => c.placements?.placementPercent ?? 0), "highest");
    const rating = getBestValue(colleges.map((c) => c.rating), "highest");
    const nirf = getBestValue(colleges.filter(c => c.nirf !== null).map((c) => c.nirf as number), "lowest");
    return { fees, avg, high, med, pct, rating, nirf };
  }, [colleges]);

  type RowDef = [string, (c: College) => string, string?];

  const rows: RowDef[] = [
    ["Location", (c) => `${c.city}, ${c.state}`],
    ["Type", (c) => c.type],
    ["Established", (c) => String(c.established)],
    ["NIRF Rank", (c) => c.nirf ? `#${c.nirf}` : "N/A", "nirf"],
    ["Annual Fees", (c) => formatFees(c.annualFees), "fees"],
    ["Avg Package", (c) => formatPackage(c.placements?.avgPackage ?? 0), "avg"],
    ["Highest Package", (c) => formatPackage(c.placements?.highestPackage ?? 0), "high"],
    ["Median Package", (c) => formatPackage(c.placements?.medianPackage ?? 0), "med"],
    ["Placement %", (c) => `${c.placements?.placementPercent ?? 0}%`, "pct"],
    ["Rating", (c) => c.rating.toFixed(1), "rating"],
    ["Courses Offered", (c) => [...new Set(c.courses.map(cr => cr.degree))].join(", ")],
    ["Reviews", (c) => String(c.totalReviews)],
  ];

  const isHighlighted = (c: College, key?: string): boolean => {
    if (!key || colleges.length < 2) return false;
    if (key === "fees") return c.annualFees === best.fees;
    if (key === "avg") return (c.placements?.avgPackage ?? 0) === best.avg;
    if (key === "high") return (c.placements?.highestPackage ?? 0) === best.high;
    if (key === "med") return (c.placements?.medianPackage ?? 0) === best.med;
    if (key === "pct") return (c.placements?.placementPercent ?? 0) === best.pct;
    if (key === "rating") return c.rating === best.rating;
    if (key === "nirf") return c.nirf !== null && c.nirf === best.nirf;
    return false;
  };
  const handleSave = async () => {
    if (!session) {
      push("Please login to save comparisons", "error");
      return;
    }
    if (colleges.length < 2) return;
    setSaving(true);
    try {
      const name = colleges.map(c => c.abbreviation).join(" vs ");
      const res = await fetch("/api/saved-comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeIds: colleges.map(c => c.id), name })
      });
      if (res.ok) {
        push("Comparison saved to your dashboard", "success");
      } else {
        push("Failed to save comparison", "error");
      }
    } catch {
      push("Network error", "error");
    }
    setSaving(false);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 font-syne text-3xl font-extrabold tracking-tight sm:text-4xl">
            <Scale size={28} className="text-accent" /> Compare Colleges
          </h1>
          <p className="mt-1 text-muted">Side-by-side comparison to help you decide</p>
        </div>
        {compareIds.length > 0 && (
          <div className="flex gap-2">
            <button onClick={clearCompare} className="rounded-[8px] border border-border px-4 py-2 text-sm hover:border-accent2 hover:text-accent2">Clear All</button>
            <button onClick={handleSave} disabled={colleges.length < 2 || saving} className="flex items-center gap-2 rounded-[8px] bg-accent px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">
              <Save size={14} /> {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      <CollegeSelector />

      {loading ? (
        <div className="grid gap-4">
          {[1,2,3].map(i => <div key={i} className="h-12 animate-pulse rounded-xl bg-surface" />)}
        </div>
      ) : !compareIds.length ? (
        <div className="rounded-2xl border border-border bg-surface p-10 text-center">
          <Scale size={36} className="mx-auto mb-3 text-accent/50" />
          <h3 className="font-syne text-xl font-bold">No colleges selected</h3>
          <p className="mt-1 text-sm text-muted">Add up to 3 colleges above to start comparing</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[700px] text-sm">
            <thead className="bg-surface2 text-left">
              <tr>
                <th className="p-3 font-syne text-xs uppercase tracking-wider text-muted">Metric</th>
                {colleges.map((c) => (
                  <th key={c.id} className="p-3">
                    <p className="font-syne text-base font-bold tracking-tight">{c.abbreviation}</p>
                    <p className="text-xs font-normal text-muted">{c.name}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, getter, key]) => (
                <tr key={label} className="border-t border-border transition-colors hover:bg-surface2/30">
                  <td className="p-3 font-medium text-muted">{label}</td>
                  {colleges.map((c) => (
                    <td key={`${c.id}-${label}`} className={`p-3 ${isHighlighted(c, key) ? "bg-accent3/10 font-semibold text-accent3" : ""}`}>
                      {getter(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
