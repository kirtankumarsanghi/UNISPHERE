"use client";

import { Heart, Scale, Share2, ExternalLink } from "lucide-react";
import { formatFees, formatPackage } from "@/lib/utils";
import { useCompare } from "@/hooks/useCompare";
import { useSaved } from "@/hooks/useSaved";
import { useToast } from "@/components/providers/ToastProvider";

type Props = {
  college: {
    id: string; name: string; abbreviation: string; annualFees: number;
    established: number; type: string; website?: string | null;
    placements: { avgPackage: number } | null;
  };
};

export function DetailSidebar({ college }: Props) {
  const { addToCompare, isInCompare, compareIds } = useCompare();
  const { toggleSave, isSaved } = useSaved();
  const { push } = useToast();

  const saved = isSaved(college.id);
  const compared = isInCompare(college.id);

  const onSave = async () => {
    const result = await toggleSave(college.id);
    if (!result.ok) push(result.message ?? "Could not update", "error");
    else push(result.saved ? "College saved" : "Removed from saved", "success");
  };

  const onCompare = () => {
    const result = addToCompare({ id: college.id, name: college.name, abbreviation: college.abbreviation });
    if (!result.ok) push(result.message ?? "Unable to compare", "error");
    else if (!compared) push("Added to compare", "success");
  };

  const onShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      push("Link copied to clipboard!", "success");
    } catch {
      push("Could not copy link", "error");
    }
  };

  const rows = [
    ["Annual Fees", formatFees(college.annualFees)],
    ["Avg Package", formatPackage(college.placements?.avgPackage ?? 0)],
    ["Established", String(college.established)],
    ["Type", college.type],
  ];

  return (
    <aside className="sticky top-24 space-y-4">
      <div className="space-y-2">
        <button onClick={onSave} className={`group flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13px] font-bold transition-all duration-300 ${saved ? "bg-white text-black" : "bg-white/[0.02] text-text-primary ring-1 ring-white/10 hover:bg-white/[0.06]"}`}>
          <Heart size={16} className={saved ? "fill-black" : "transition-transform group-hover:scale-110"} />
          {saved ? "Saved to Profile" : "Save College"}
        </button>
        <button onClick={onCompare} disabled={compareIds.length >= 3 && !compared} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.02] px-4 py-3 text-[13px] font-bold text-text-primary ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50">
          <Scale size={16} className={compared ? "text-white" : "transition-transform group-hover:scale-110"} />
          {compared ? "In Compare" : "Add to Compare"}
        </button>
        <button onClick={onShare} className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.02] px-4 py-3 text-[13px] font-bold text-text-primary ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.06]">
          <Share2 size={16} className="transition-transform group-hover:scale-110" /> Share
        </button>
      </div>

      <div className="rounded-[24px] bg-white/[0.02] p-6 ring-1 ring-white/5">
        <h3 className="font-display text-lg font-bold tracking-tight text-text-primary">Quick Info</h3>
        <div className="mt-4 divide-y divide-white/5">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-3 text-sm">
              <span className="text-text-muted">{k}</span>
              <span className="font-semibold text-text-primary">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {college.website && (
        <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.03] px-4 py-3 text-[13px] font-bold text-text-primary ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.08]">
          <ExternalLink size={16} /> Official Website
        </a>
      )}
    </aside>
  );
}
