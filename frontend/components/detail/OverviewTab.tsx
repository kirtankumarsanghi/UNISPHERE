import { Globe, Calendar } from "lucide-react";

export function OverviewTab({ overview, established, website }: { overview: string; established?: number; website?: string | null }) {
  return (
    <section className="rounded-[24px] bg-white/[0.02] p-8 ring-1 ring-white/5 transition-all duration-300 hover:ring-white/10">
      <h3 className="font-display text-2xl font-bold tracking-tight text-text-primary">About</h3>
      <p className="mt-6 whitespace-pre-line text-[15px] leading-relaxed text-text-secondary">{overview}</p>
      <div className="mt-8 flex flex-wrap gap-4">
        {established && (
          <div className="flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-text-primary ring-1 ring-white/10">
            <Calendar size={14} className="text-text-muted" />
            <span>Established {established}</span>
          </div>
        )}
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-text-primary ring-1 ring-white/10 transition-colors hover:bg-white/[0.08]">
            <Globe size={14} className="text-text-muted" />
            <span>Official Website</span>
          </a>
        )}
      </div>
    </section>
  );
}