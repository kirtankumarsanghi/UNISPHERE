import { formatFees, formatPackage } from "@/lib/utils";

export function DetailSidebar({ college }: { college: { annualFees: number; established: number; type: string; placements: { avgPackage: number } | null } }) {
  const rows = [
    ["Annual Fees", formatFees(college.annualFees)],
    ["Avg Package", formatPackage(college.placements?.avgPackage ?? 0)],
    ["Established", String(college.established)],
    ["Type", college.type]
  ];

  return (
    <aside className="sticky top-20 space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="font-syne text-lg font-bold">Quick Info</h3>
        <div className="mt-3 divide-y divide-border/60">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2 text-sm">
              <span className="text-muted">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}