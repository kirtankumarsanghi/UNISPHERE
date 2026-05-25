"use client";

import { useEffect, useMemo, useState } from "react";
import { useCompare } from "@/hooks/useCompare";
import { getBestValue, formatFees, formatPackage } from "@/lib/utils";
import { CollegeSelector } from "@/components/compare/CollegeSelector";

type College = {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  established: number;
  annualFees: number;
  rating: number;
  totalReviews: number;
  placements: { avgPackage: number; highestPackage: number; medianPackage: number; placementPercent: number } | null;
  courses: { degree: string }[];
};

export default function ComparePage() {
  const { compareIds, clearCompare } = useCompare();
  const [colleges, setColleges] = useState<College[]>([]);

  useEffect(() => {
    if (!compareIds.length) {
      setColleges([]);
      return;
    }
    fetch(`/api/colleges/compare?ids=${compareIds.join(",")}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setColleges(d))
      .catch(() => setColleges([]));
  }, [compareIds]);

  const best = useMemo(() => {
    const fees = getBestValue(colleges.map((c) => c.annualFees), "lowest");
    const avg = getBestValue(colleges.map((c) => c.placements?.avgPackage ?? 0), "highest");
    const high = getBestValue(colleges.map((c) => c.placements?.highestPackage ?? 0), "highest");
    const pct = getBestValue(colleges.map((c) => c.placements?.placementPercent ?? 0), "highest");
    const rating = getBestValue(colleges.map((c) => c.rating), "highest");
    return { fees, avg, high, pct, rating };
  }, [colleges]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-syne text-4xl font-extrabold tracking-tight">Compare Colleges</h1>
          <p className="text-muted">Side-by-side comparison to help you decide</p>
        </div>
        <button onClick={clearCompare} className="rounded-[8px] border border-border px-4 py-2">Clear All</button>
      </div>

      <CollegeSelector />

      {!compareIds.length ? (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center text-muted">Add colleges to start comparison.</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-surface2 text-left">
              <tr>
                <th className="p-3 font-syne text-xs uppercase tracking-wider text-muted">Metric</th>
                {colleges.map((c) => <th key={c.id} className="p-3 font-syne text-base tracking-tight">{c.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                ["Location", (c: College) => `${c.city}, ${c.state}`],
                ["Type", (c: College) => c.type],
                ["Established", (c: College) => String(c.established)],
                ["Annual Fees", (c: College) => formatFees(c.annualFees), "fees"],
                ["Avg Package", (c: College) => formatPackage(c.placements?.avgPackage ?? 0), "avg"],
                ["Highest Package", (c: College) => formatPackage(c.placements?.highestPackage ?? 0), "high"],
                ["Placement %", (c: College) => `${c.placements?.placementPercent ?? 0}%`, "pct"],
                ["Rating", (c: College) => c.rating.toFixed(1), "rating"],
                ["Reviews", (c: College) => String(c.totalReviews)]
              ].map(([label, getter, key]) => (
                <tr key={String(label)} className="border-t border-border">
                  <td className="p-3 text-muted">{String(label)}</td>
                  {colleges.map((c) => {
                    const highlight = key === "fees" ? c.annualFees === best.fees : key === "avg" ? (c.placements?.avgPackage ?? 0) === best.avg : key === "high" ? (c.placements?.highestPackage ?? 0) === best.high : key === "pct" ? (c.placements?.placementPercent ?? 0) === best.pct : key === "rating" ? c.rating === best.rating : false;
                    return <td key={`${c.id}-${label}`} className={`p-3 ${highlight ? "bg-accent3/10 font-semibold text-accent3" : ""}`}>{(getter as (x: College) => string)(c)}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}