import { formatFees, formatPackage, getBestValue } from "@/lib/utils";
import { CompareHighlight } from "@/components/compare/CompareHighlight";

type College = {
  id: string;
  name: string;
  city: string;
  state: string;
  type: string;
  established: number;
  nirf: number | null;
  annualFees: number;
  rating: number;
  totalReviews: number;
  placements: { avgPackage: number; highestPackage: number; medianPackage: number; placementPercent: number } | null;
  courses: { degree: string }[];
};

export function CompareTable({ colleges }: { colleges: College[] }) {
  const best = {
    fees: getBestValue(colleges.map((c) => c.annualFees), "lowest"),
    avg: getBestValue(colleges.map((c) => c.placements?.avgPackage ?? 0), "highest"),
    high: getBestValue(colleges.map((c) => c.placements?.highestPackage ?? 0), "highest"),
    med: getBestValue(colleges.map((c) => c.placements?.medianPackage ?? 0), "highest"),
    pct: getBestValue(colleges.map((c) => c.placements?.placementPercent ?? 0), "highest"),
    rating: getBestValue(colleges.map((c) => c.rating), "highest")
  };

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-surface">
      <table className="w-full min-w-[860px] text-sm">
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
            ["NIRF", (c: College) => (c.nirf ? `#${c.nirf}` : "N/A")],
            ["Annual Fees", (c: College) => formatFees(c.annualFees), "fees"],
            ["Total Est. Cost", (c: College) => formatFees(c.annualFees * 4), "fees"],
            ["Avg Package", (c: College) => formatPackage(c.placements?.avgPackage ?? 0), "avg"],
            ["Highest Package", (c: College) => formatPackage(c.placements?.highestPackage ?? 0), "high"],
            ["Median Package", (c: College) => formatPackage(c.placements?.medianPackage ?? 0), "med"],
            ["Placement %", (c: College) => `${c.placements?.placementPercent ?? 0}%`, "pct"],
            ["Degrees", (c: College) => Array.from(new Set(c.courses.map((x) => x.degree))).join(", ")],
            ["No. of Courses", (c: College) => String(c.courses.length)],
            ["Rating", (c: College) => c.rating.toFixed(1), "rating"],
            ["Reviews", (c: College) => String(c.totalReviews)]
          ].map(([label, getter, key]) => (
            <tr key={String(label)} className="border-t border-border">
              <td className="p-3 text-muted">{String(label)}</td>
              {colleges.map((c) => {
                const active = key === "fees" ? c.annualFees === best.fees : key === "avg" ? (c.placements?.avgPackage ?? 0) === best.avg : key === "high" ? (c.placements?.highestPackage ?? 0) === best.high : key === "med" ? (c.placements?.medianPackage ?? 0) === best.med : key === "pct" ? (c.placements?.placementPercent ?? 0) === best.pct : key === "rating" ? c.rating === best.rating : false;
                return <td key={`${c.id}-${label}`} className="p-3"><CompareHighlight active={active}>{(getter as (x: College) => string)(c)}</CompareHighlight></td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}