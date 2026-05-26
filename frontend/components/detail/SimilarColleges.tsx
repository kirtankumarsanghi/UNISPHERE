import Link from "next/link";
import { MapPin } from "lucide-react";
import { formatFees, formatPackage } from "@/lib/utils";
import { RatingPill } from "@/components/ui/RatingPill";

type SimilarCollege = {
  id: string; name: string; slug: string; abbreviation: string;
  city: string; state: string; annualFees: number; rating: number;
  gradientFrom: string; gradientTo: string;
  placements: { avgPackage: number; placementPercent: number } | null;
};

export function SimilarColleges({ colleges }: { colleges: SimilarCollege[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {colleges.map((c) => (
        <Link key={c.id} href={`/colleges/${c.slug}`} className="group relative flex flex-col overflow-hidden rounded-[20px] bg-white/[0.02] ring-1 ring-white/5 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04] hover:ring-white/10 hover:shadow-glow-sm">
          <div className="h-24 w-full" style={{ background: `linear-gradient(to bottom right, ${c.gradientFrom}30, ${c.gradientTo}10)` }}>
            <div className="flex h-full items-center justify-center font-display text-3xl font-extrabold tracking-tighter text-white/20">{c.abbreviation}</div>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="line-clamp-1 font-display text-[15px] font-bold tracking-tight text-text-primary">{c.name}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-text-muted"><MapPin size={12} />{c.city}, {c.state}</p>
            <div className="mt-auto pt-4 flex items-center justify-between">
              <span className="font-mono text-sm font-semibold text-text-primary">{formatFees(c.annualFees)}</span>
              <RatingPill rating={c.rating} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
