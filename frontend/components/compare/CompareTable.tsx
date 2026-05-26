import { formatFees, formatPackage, getBestValue } from "@/lib/utils";

type College = {
  id: string;
  name: string;
  abbreviation?: string;
  city: string;
  state: string;
  type: string;
  established: number;
  nirf: number | null;
  annualFees: number;
  rating: number;
  totalReviews: number;
  placements: { avgPackage: number; highestPackage: number; medianPackage: number; placementPercent: number } | null;
  courses: { degree: string; name?: string }[];
};

type MetricGroup = {
  title: string;
  metrics: { label: string; getter: (c: College) => string; numGetter?: (c: College) => number; best?: "highest" | "lowest" }[];
};

export function CompareTable({ colleges }: { colleges: College[] }) {
  const groups: MetricGroup[] = [
    {
      title: "General",
      metrics: [
        { label: "Location", getter: (c) => `${c.city}, ${c.state}` },
        { label: "Type", getter: (c) => c.type },
        { label: "Established", getter: (c) => String(c.established) },
        { label: "NIRF Rank", getter: (c) => (c.nirf ? `#${c.nirf}` : "N/A"), numGetter: (c) => c.nirf ?? 999, best: "lowest" },
        { label: "Rating", getter: (c) => c.rating.toFixed(1), numGetter: (c) => c.rating, best: "highest" },
        { label: "Reviews", getter: (c) => String(c.totalReviews) },
      ],
    },
    {
      title: "Fees",
      metrics: [
        { label: "Annual Fees", getter: (c) => formatFees(c.annualFees), numGetter: (c) => c.annualFees, best: "lowest" },
        { label: "Total 4-Year Cost", getter: (c) => formatFees(c.annualFees * 4), numGetter: (c) => c.annualFees * 4, best: "lowest" },
      ],
    },
    {
      title: "Placements",
      metrics: [
        { label: "Avg Package", getter: (c) => formatPackage(c.placements?.avgPackage ?? 0), numGetter: (c) => c.placements?.avgPackage ?? 0, best: "highest" },
        { label: "Highest Package", getter: (c) => formatPackage(c.placements?.highestPackage ?? 0), numGetter: (c) => c.placements?.highestPackage ?? 0, best: "highest" },
        { label: "Median Package", getter: (c) => formatPackage(c.placements?.medianPackage ?? 0), numGetter: (c) => c.placements?.medianPackage ?? 0, best: "highest" },
        { label: "Placement %", getter: (c) => `${c.placements?.placementPercent ?? 0}%`, numGetter: (c) => c.placements?.placementPercent ?? 0, best: "highest" },
      ],
    },
    {
      title: "Academics",
      metrics: [
        { label: "Degrees Offered", getter: (c) => Array.from(new Set(c.courses.map((x) => x.degree))).join(", ") },
        { label: "No. of Courses", getter: (c) => String(c.courses.length), numGetter: (c) => c.courses.length, best: "highest" },
      ],
    },
  ];

  return (
    <div className="space-y-4 animate-fade-in-up">
      {groups.map((group) => (
        <div key={group.title} className="overflow-hidden rounded-2xl bg-white/[0.02] ring-1 ring-white/[0.06]">
          {/* Group header */}
          <div className="bg-white/[0.02] px-5 py-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.15em] text-text-muted">{group.title}</h3>
          </div>

          {/* Metrics */}
          <div className="divide-y divide-white/[0.03]">
            {group.metrics.map((metric) => {
              const values = metric.numGetter ? colleges.map(metric.numGetter) : [];
              const bestVal = metric.best && values.length
                ? (metric.best === "highest" ? Math.max(...values) : Math.min(...values))
                : null;

              const maxVal = values.length ? Math.max(...values.filter(v => v > 0)) : 0;

              return (
                <div key={metric.label} className="grid items-center gap-0" style={{ gridTemplateColumns: `180px repeat(${colleges.length}, 1fr)` }}>
                  <div className="px-5 py-4 text-[13px] font-medium text-text-secondary">{metric.label}</div>
                  {colleges.map((c, idx) => {
                    const val = metric.getter(c);
                    const numVal = metric.numGetter ? metric.numGetter(c) : null;
                    const isBest = bestVal !== null && numVal !== null && numVal === bestVal && colleges.length > 1;
                    const barWidth = maxVal > 0 && numVal !== null && numVal > 0 ? (numVal / maxVal) * 100 : 0;

                    return (
                      <div key={`${c.id}-${metric.label}`} className={`relative px-5 py-4 ${idx > 0 ? "border-l border-white/[0.03]" : ""}`}>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[14px] font-semibold ${isBest ? "text-emerald-400" : "text-text-primary"}`}>
                            {val}
                          </span>
                          {isBest && (
                            <span className="rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-bold text-emerald-400 ring-1 ring-emerald-500/20">
                              BEST
                            </span>
                          )}
                        </div>
                        {/* Visual bar */}
                        {metric.numGetter && barWidth > 0 && (
                          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/[0.03]">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${isBest ? "bg-emerald-500/50" : "bg-white/10"}`}
                              style={{ width: `${barWidth}%` }}
                            />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}