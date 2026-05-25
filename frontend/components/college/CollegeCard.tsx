"use client";
import { Heart, MapPin, Scale } from "lucide-react";
import Link from "next/link";
import { formatFees, formatPackage } from "@/lib/utils";
import { useCompare } from "@/hooks/useCompare";
import { useSaved } from "@/hooks/useSaved";
import { RatingPill } from "@/components/ui/RatingPill";
import { useToast } from "@/components/providers/ToastProvider";

type CollegeCardProps = {
  college: {
    id: string;
    name: string;
    slug: string;
    abbreviation: string;
    city: string;
    state: string;
    type?: string;
    gradientFrom: string;
    gradientTo: string;
    annualFees: number;
    rating: number;
    placements?: { avgPackage: number; placementPercent: number } | null;
  };
};

export function CollegeCard({ college }: CollegeCardProps) {
  const { addToCompare, isInCompare, compareIds } = useCompare();
  const { toggleSave, isSaved } = useSaved();
  const { push } = useToast();
  const added = isInCompare(college.id);
  const saved = isSaved(college.id);
  const disabled = compareIds.length >= 3 && !added;

  const onCompare = () => {
    const result = addToCompare({ id: college.id, name: college.name, abbreviation: college.abbreviation });
    if (!result.ok) push(result.message ?? "Unable to compare", "error");
    else if (!added) push("Added to compare", "success");
  };

  const onSave = async () => {
    const result = await toggleSave(college.id);
    if (!result.ok) push(result.message ?? "Could not update", "error");
    else push(result.saved ? "College saved" : "Removed from saved", "success");
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-border/80 bg-surface/95 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[0_20px_50px_rgba(4,8,20,0.55)]">
      <header className="relative h-28 overflow-hidden rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${college.gradientFrom}, ${college.gradientTo})` }}>
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/25 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/90">
          {college.type ?? "COLLEGE"}
        </div>
        <button aria-label="Save college" onClick={onSave} className="absolute right-3 top-3 rounded-full bg-black/30 p-1.5 text-white/90 transition-all duration-200 hover:bg-black/45">
          <Heart size={14} fill={saved ? "#ff6584" : "none"} color={saved ? "#ff6584" : "currentColor"} />
        </button>
        <div className="absolute inset-0 grid place-items-center font-syne text-3xl font-extrabold tracking-tight text-white/15">{college.abbreviation}</div>
      </header>
      <div className="p-4 sm:p-5">
        <Link href={`/colleges/${college.slug}`} className="line-clamp-2 font-syne text-base font-bold tracking-tight">
          {college.name}
        </Link>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted">
          <MapPin size={12} />
          {college.city}, {college.state}
        </div>

        <div className="my-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg border border-border/60 bg-surface2/70 p-2">
            <p className="text-xs font-semibold text-blue-400">{formatFees(college.annualFees)}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted">Fees/yr</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface2/70 p-2">
            <p className="text-xs font-semibold text-blue-400">{formatPackage(college.placements?.avgPackage ?? 0)}</p>
            <p className="text-[10px] uppercase tracking-wider text-muted">Avg Pkg</p>
          </div>
          <div className="rounded-lg border border-border/60 bg-surface2/70 p-2">
            <p className="text-xs font-semibold text-accent3">{college.placements?.placementPercent ?? 0}%</p>
            <p className="text-[10px] uppercase tracking-wider text-muted">Placed</p>
          </div>
        </div>

        <footer className="flex items-center justify-between">
          <RatingPill rating={college.rating} />
          <button disabled={disabled} onClick={onCompare} className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface2 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50">
            <Scale size={12} />
            {added ? "Added" : "+ Compare"}
          </button>
        </footer>
      </div>
    </article>
  );
}

