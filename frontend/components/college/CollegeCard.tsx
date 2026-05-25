"use client";
import { Heart, MapPin } from "lucide-react";
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
    gradientFrom: string;
    gradientTo: string;
    annualFees: number;
    rating: number;
    placements: { avgPackage: number; placementPercent: number } | null;
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

  return <div className="rounded-2xl border border-border bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)]"><div className="relative h-28 overflow-hidden rounded-t-2xl" style={{ background: `linear-gradient(135deg, ${college.gradientFrom}, ${college.gradientTo})` }} /><div className="p-4"><Link href={`/colleges/${college.slug}`} className="font-syne text-base font-bold tracking-tight">{college.name}</Link><div className="mt-1 flex items-center gap-1 text-xs text-muted"><MapPin size={12} />{college.city}, {college.state}</div><div className="my-3 grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded-lg bg-surface2 p-2 text-blue-400">{formatFees(college.annualFees)}</div><div className="rounded-lg bg-surface2 p-2 text-blue-400">{formatPackage(college.placements?.avgPackage ?? 0)}</div><div className="rounded-lg bg-surface2 p-2 text-accent3">{college.placements?.placementPercent ?? 0}%</div></div><div className="flex items-center justify-between"><RatingPill rating={college.rating} /><button disabled={disabled} onClick={onCompare} className="rounded-lg border border-border bg-surface2 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50">{added ? "? Added" : "+ Compare"}</button></div><button aria-label="save" onClick={onSave} className="mt-3 inline-flex items-center gap-1 text-xs text-accent2"><Heart size={14} fill={saved ? "currentColor" : "none"} />{saved ? "Saved" : "Save"}</button></div></div>;
}