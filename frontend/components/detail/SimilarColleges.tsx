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
        <Link key={c.id} href={`/colleges/${c.slug}`} className="group rounded-2xl border border-border bg-surface transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg">
          <div className="h-20 rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${c.gradientFrom}, ${c.gradientTo})` }}>
            <div className="grid h-full place-items-center font-syne text-2xl font-extrabold text-white/15">{c.abbreviation}</div>
          </div>
          <div className="p-3">
            <h3 className="line-clamp-1 font-syne text-sm font-bold tracking-tight">{c.name}</h3>
            <p className="mt-0.5 flex items-center gap-1 text-xs text-muted"><MapPin size={10} />{c.city}, {c.state}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-blue-400">{formatFees(c.annualFees)}</span>
              <RatingPill rating={c.rating} />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
