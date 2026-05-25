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
  if (!placement) return <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">No placement data available.</p>;

  const stats = [
    { label: "Avg Package", value: formatPackage(placement.avgPackage), color: "text-blue-400" },
    { label: "Highest Package", value: formatPackage(placement.highestPackage), color: "text-blue-400" },
    { label: "Median Package", value: formatPackage(placement.medianPackage), color: "text-blue-400" },
    { label: "Placement %", value: `${placement.placementPercent}%`, color: "text-accent3" }
  ];

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-3">
            <p className={`font-syne text-2xl font-extrabold tracking-tight ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-border bg-surface p-4">
        <h4 className="font-syne text-lg font-bold">Top Recruiters</h4>
        {placement.topRecruiters?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {placement.topRecruiters.map((r) => (
              <span key={r} className="rounded-lg border border-border bg-surface2 px-3 py-1.5 text-xs text-muted">
                {r}
              </span>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-muted">Recruiter list is currently unavailable.</p>
        )}
        {placement.year ? <p className="mt-3 text-xs text-muted">Placement data for batch {placement.year}</p> : null}
      </div>
    </section>
  );
}
