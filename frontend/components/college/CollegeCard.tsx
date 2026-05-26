"use client";
import { Heart, MapPin, Scale, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { formatFees, formatPackage } from "@/lib/utils";
import { useCompare } from "@/hooks/useCompare";
import { useSaved } from "@/hooks/useSaved";
import { useToast } from "@/components/providers/ToastProvider";
import { getCollegeImage } from "@/lib/college-images";

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
  const imageUrl = getCollegeImage(college.slug);

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
    <article className="group relative flex flex-col overflow-hidden rounded-[2rem] glass-card transition-all duration-500 ease-out hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_10px_40px_-15px_rgba(78,222,163,0.15)]">
      {/* Card header — image or gradient */}
      <header className="relative h-40 overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={`${college.name} campus`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </>
        ) : (
          <>
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${college.gradientFrom}, ${college.gradientTo})` }} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </>
        )}

        {/* Type badge */}
        <div className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1.5 font-label-caps text-label-caps uppercase tracking-[0.15em] text-white/90 backdrop-blur-md ring-1 ring-white/10">
          {college.type ?? "COLLEGE"}
        </div>

        {/* Save button */}
        <button
          aria-label="Save college"
          onClick={onSave}
          className="absolute right-4 top-4 rounded-full bg-black/30 p-2.5 text-white/80 backdrop-blur-md ring-1 ring-white/10 transition-all duration-300 hover:bg-white/20 hover:scale-110 active:scale-95"
        >
          <Heart size={16} fill={saved ? "#fff" : "none"} className={saved ? "text-white" : "text-white/70"} />
        </button>

        {/* College abbreviation watermark */}
        <div className="absolute bottom-2 left-4 font-headline-lg text-[64px] font-black leading-none tracking-tighter text-white/[0.08] select-none pointer-events-none">
          {college.abbreviation}
        </div>

        {/* Rating badge */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-black/50 px-3 py-1.5 backdrop-blur-md ring-1 ring-white/10">
          <span className="font-label-caps text-label-caps text-white">{college.rating}</span>
          <span className="text-[12px] text-yellow-400">★</span>
        </div>
      </header>

      {/* Card body */}
      <div className="flex flex-1 flex-col p-6">
        <Link href={`/colleges/${college.slug}`} className="group/link inline-flex items-start gap-1">
          <h3 className="line-clamp-2 font-headline-md text-headline-md text-on-surface transition-colors group-hover/link:text-primary">
            {college.name}
          </h3>
          <ExternalLink size={14} className="mt-1 flex-none text-on-surface-variant/50 opacity-0 transition-all group-hover/link:opacity-100" />
        </Link>

        <div className="mt-3 flex items-center gap-1.5 font-body-md text-body-md text-on-surface-variant">
          <MapPin size={14} className="flex-none" />
          <span>{college.city}, {college.state}</span>
        </div>

        {/* Stats grid */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { label: "Fees/yr", value: formatFees(college.annualFees) },
            { label: "Avg Pkg", value: formatPackage(college.placements?.avgPackage ?? 0) },
            { label: "Placed", value: `${college.placements?.placementPercent ?? 0}%` },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl glass-panel p-3 text-center transition-colors hover:bg-white/[0.04]">
              <p className="font-body-md text-[14px] font-semibold text-on-surface">{stat.value}</p>
              <p className="mt-1 font-label-caps text-[9px] uppercase tracking-widest text-on-surface-variant/70">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer actions */}
        <footer className="mt-auto flex items-center justify-between pt-6">
          <Link href={`/colleges/${college.slug}`} className="font-label-caps text-label-caps text-on-surface-variant transition-colors hover:text-on-surface uppercase tracking-widest">
            View Details →
          </Link>
          <button
            disabled={disabled}
            onClick={onCompare}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 font-label-caps text-label-caps uppercase tracking-widest ring-1 transition-all duration-300 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${
              added
                ? "bg-primary/10 text-primary ring-primary/30"
                : "bg-white/[0.02] text-on-surface-variant ring-white/[0.08] hover:bg-white/[0.06] hover:text-on-surface hover:ring-white/[0.15]"
            }`}
          >
            <Scale size={12} />
            {added ? "Added" : "Compare"}
          </button>
        </footer>
      </div>
    </article>
  );
}
