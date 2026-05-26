import { MapPin, Star } from "lucide-react";

export function CollegeHero({ college }: { college: { name: string; type: string; city: string; state: string; rating: number; nirf: number | null; gradientFrom: string; gradientTo: string } }) {
  return (
    <section className="relative mb-8 flex min-h-[320px] flex-col justify-end overflow-hidden rounded-[32px] p-8 ring-1 ring-border-default shadow-glow-sm" style={{ background: `linear-gradient(to bottom right, ${college.gradientFrom}20, ${college.gradientTo}10)` }}>
      <div className="absolute inset-0 bg-bg-surface/80 backdrop-blur-[2px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="relative z-10 flex w-full items-end justify-between">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-text-secondary ring-1 ring-white/10">
            {college.type}
          </div>
          <h1 className="font-display text-4xl font-extrabold tracking-tighter text-text-primary sm:text-5xl md:text-6xl">{college.name}</h1>
          <p className="mt-4 flex items-center gap-1.5 text-[15px] font-medium text-text-muted">
            <MapPin size={16} />{college.city}, {college.state}
          </p>
        </div>
        
        <div className="flex flex-col items-end gap-3">
          {college.nirf && (
            <div className="rounded-full bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-widest text-text-primary ring-1 ring-white/10 backdrop-blur-md">
              NIRF #{college.nirf}
            </div>
          )}
          <div className="flex items-center gap-2 rounded-2xl bg-white/[0.03] px-4 py-3 ring-1 ring-white/10 backdrop-blur-md">
            <Star size={18} fill="currentColor" className="text-text-primary" />
            <span className="font-mono text-2xl font-bold tracking-tight text-text-primary">{college.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}