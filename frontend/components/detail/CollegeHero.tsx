import { MapPin, Star } from "lucide-react";

export function CollegeHero({ college }: { college: { name: string; type: string; city: string; state: string; rating: number; nirf: number | null; gradientFrom: string; gradientTo: string } }) {
  return (
    <section className="relative mb-6 h-64 overflow-hidden rounded-2xl" style={{ background: `linear-gradient(135deg, ${college.gradientFrom}, ${college.gradientTo})` }}>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute bottom-5 left-5">
        <span className="rounded-full border border-white/20 bg-black/25 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-white/90">{college.type}</span>
        <h1 className="mt-3 font-syne text-4xl font-extrabold tracking-tight text-white">{college.name}</h1>
        <p className="mt-2 flex items-center gap-1 text-sm text-white/85"><MapPin size={14} />{college.city}, {college.state}</p>
      </div>
      <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-xl border border-white/25 bg-black/30 px-3 py-2 text-white">
        <Star size={16} fill="#fbbf24" color="#fbbf24" />
        <span className="font-syne text-xl font-bold">{college.rating.toFixed(1)}</span>
      </div>
      {college.nirf ? <div className="absolute right-5 top-5 rounded-full bg-[#fbbf24]/20 px-3 py-1 text-xs font-semibold text-[#fbbf24]">NIRF #{college.nirf}</div> : null}
    </section>
  );
}