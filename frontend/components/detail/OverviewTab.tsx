import { Globe, Calendar } from "lucide-react";

export function OverviewTab({ overview, established, website }: { overview: string; established?: number; website?: string | null }) {
  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <h3 className="font-syne text-xl font-bold tracking-tight">About</h3>
      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text/85">{overview}</p>
      <div className="mt-4 flex flex-wrap gap-4">
        {established && (
          <div className="flex items-center gap-2 text-xs text-muted">
            <Calendar size={14} className="text-accent" />
            <span>Established {established}</span>
          </div>
        )}
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-accent hover:underline">
            <Globe size={14} />
            <span>Official Website</span>
          </a>
        )}
      </div>
    </section>
  );
}