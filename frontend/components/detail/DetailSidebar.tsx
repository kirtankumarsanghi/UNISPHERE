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
    <aside className="sticky top-20 space-y-4">
      <div className="space-y-2">
        <button onClick={onSave} className={`flex w-full items-center justify-center gap-2 rounded-[10px] border px-4 py-2.5 text-sm font-semibold transition-all ${saved ? "border-accent2/50 bg-accent2/10 text-accent2" : "border-border bg-surface hover:border-accent2/40"}`}>
          <Heart size={15} fill={saved ? "#ff6584" : "none"} color={saved ? "#ff6584" : "currentColor"} />
          {saved ? "Saved" : "Save College"}
        </button>
        <button onClick={onCompare} disabled={compareIds.length >= 3 && !compared} className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition-all hover:border-accent/40 disabled:cursor-not-allowed disabled:opacity-50">
          <Scale size={15} />
          {compared ? "✓ In Compare" : "Add to Compare"}
        </button>
        <button onClick={onShare} className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-border bg-surface px-4 py-2.5 text-sm font-semibold transition-all hover:border-accent/40">
          <Share2 size={15} /> Share
        </button>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-5">
        <h3 className="font-syne text-lg font-bold">Quick Info</h3>
        <div className="mt-3 divide-y divide-border/60">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2.5 text-sm">
              <span className="text-muted">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
      </div>

      {college.website && (
        <a href={college.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-[10px] border border-accent/30 bg-accent/5 px-4 py-2.5 text-sm font-semibold text-accent transition-all hover:bg-accent/10">
          <ExternalLink size={15} /> Visit Official Website
        </a>
      )}
    </aside>
  );
}