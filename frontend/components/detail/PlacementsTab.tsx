import { formatPackage } from "@/lib/utils";

type Placement = {
  avgPackage: number;
  highestPackage: number;
  medianPackage: number;
  placementPercent: number;
  topRecruiters?: string[];
  year?: number;
} | null;

export function PlacementsTab({ placement }: { placement: Placement }) {
  if (!placement) return <p className="rounded-[24px] bg-white/[0.02] p-8 text-sm text-text-muted ring-1 ring-white/5">No placement data available.</p>;

  const stats = [
    { label: "Avg Package", value: formatPackage(placement.avgPackage) },
    { label: "Highest Package", value: formatPackage(placement.highestPackage) },
    { label: "Median Package", value: formatPackage(placement.medianPackage) },
    { label: "Placement %", value: `${placement.placementPercent}%` }
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="group overflow-hidden rounded-[20px] bg-white/[0.02] p-5 ring-1 ring-white/5 transition-all duration-300 hover:bg-white/[0.04] hover:ring-white/10 hover:shadow-glow-sm">
            <p className="font-mono text-xl font-bold tracking-tight text-text-primary">{s.value}</p>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-text-muted transition-colors group-hover:text-text-secondary">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-[24px] bg-white/[0.02] p-8 ring-1 ring-white/5 transition-all duration-300 hover:ring-white/10">
        <h4 className="font-display text-lg font-bold tracking-tight text-text-primary">Top Recruiters</h4>
        {placement.topRecruiters?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {placement.topRecruiters.map((r) => (
              <span key={r} className="rounded-full bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-text-secondary ring-1 ring-white/10 transition-colors hover:bg-white/[0.08] hover:text-text-primary">
                {r}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-[13px] text-text-muted">Recruiter list is currently unavailable.</p>
        )}
        {placement.year && <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-text-disabled">Placement data for batch {placement.year}</p>}
      </div>
    </section>
  );
}
