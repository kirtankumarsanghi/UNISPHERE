"use client";

import { useEffect, useState } from "react";
import { useCompare } from "@/hooks/useCompare";
import { CollegeSelector } from "@/components/compare/CollegeSelector";
import { CompareTable } from "@/components/compare/CompareTable";
import { Scale, Save, Share2, Link2, CheckCircle, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/providers/ToastProvider";
import { getCollegeImage } from "@/lib/college-images";
import { formatFees, formatPackage } from "@/lib/utils";

type College = {
  id: string; name: string; abbreviation: string; city: string; state: string;
  slug?: string;
  type: string; established: number; annualFees: number; rating: number;
  totalReviews: number; nirf: number | null;
  gradientFrom?: string; gradientTo?: string;
  placements: { avgPackage: number; highestPackage: number; medianPackage: number; placementPercent: number } | null;
  courses: { name: string; degree: string }[];
};

export default function ComparePage() {
  const { compareIds, clearCompare, setCompare, removeFromCompare } = useCompare();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const { data: session } = useSession();
  const { push } = useToast();

  useEffect(() => {
    const idsParam = new URLSearchParams(window.location.search).get("ids");
    if (!idsParam || compareIds.length) return;

    const ids = idsParam.split(",").map((id) => id.trim()).filter(Boolean).slice(0, 3);
    if (!ids.length) return;

    fetch(`/api/colleges/compare?ids=${ids.join(",")}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d: College[]) => {
        const items = d.map((c) => ({ id: c.id, name: c.name, abbreviation: c.abbreviation }));
        if (items.length) setCompare(items);
      })
      .catch(() => undefined);
  }, [compareIds.length, setCompare]);

  useEffect(() => {
    if (!compareIds.length) { setColleges([]); return; }
    setLoading(true);
    fetch(`/api/colleges/compare?ids=${compareIds.join(",")}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setColleges(d))
      .catch(() => setColleges([]))
      .finally(() => setLoading(false));
  }, [compareIds]);

  const handleSave = async () => {
    if (!session) { push("Please login to save comparisons", "error"); return; }
    if (colleges.length < 2) return;
    setSaving(true);
    try {
      const name = colleges.map(c => c.abbreviation).join(" vs ");
      const res = await fetch("/api/saved-comparisons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeIds: colleges.map(c => c.id), name })
      });
      if (res.ok) push("Comparison saved!", "success");
      else push("Failed to save", "error");
    } catch { push("Network error", "error"); }
    setSaving(false);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/compare?ids=${compareIds.join(",")}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      push("Link copied to clipboard!", "success");
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Radar chart data for visual comparison
  const radarMetrics = colleges.length >= 2 ? [
    { label: "Rating", key: "rating", values: colleges.map(c => c.rating), max: 5 },
    { label: "Placement %", key: "placement", values: colleges.map(c => c.placements?.placementPercent ?? 0), max: 100 },
    { label: "Avg Package", key: "avg", values: colleges.map(c => (c.placements?.avgPackage ?? 0) / 100000), max: 50 },
    { label: "Affordability", key: "afford", values: colleges.map(c => Math.max(0, 100 - c.annualFees / 10000)), max: 100 },
  ] : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-label-caps text-label-caps uppercase tracking-widest text-primary mb-2">Analysis Tool</p>
          <h1 className="font-display-xl text-[48px] sm:text-[64px] text-on-surface">
            Institutional Comparison
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Side-by-side surgical analysis to help you decide.</p>
        </div>
        {compareIds.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-text-secondary ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.06] hover:text-text-primary"
            >
              {copied ? <CheckCircle size={14} className="text-emerald-400" /> : <Link2 size={14} />}
              {copied ? "Copied!" : "Share"}
            </button>
            <button onClick={clearCompare} className="rounded-full bg-white/[0.03] px-4 py-2.5 text-[13px] font-medium text-text-secondary ring-1 ring-white/[0.06] transition-all hover:bg-white/[0.06] hover:text-text-primary">
              Clear All
            </button>
            <button
              onClick={handleSave}
              disabled={colleges.length < 2 || saving}
              className="flex items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-[13px] font-bold text-black transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-40"
            >
              <Save size={14} /> {saving ? "Saving..." : "Save"}
            </button>
          </div>
        )}
      </div>

      {/* College Selector */}
      <CollegeSelector />

      {/* Visual comparison cards */}
      {colleges.length >= 2 && !loading && (
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 animate-fade-in-up">
          {colleges.map((c) => {
            const imgUrl = getCollegeImage(c.slug ?? "");
            return (
              <div key={c.id} className="group overflow-hidden rounded-[2rem] glass-card ring-1 ring-white/[0.06] relative">
                <div className="relative h-32 overflow-hidden">
                  {imgUrl ? (
                    <>
                      <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                    </>
                  ) : (
                    <div className="h-full w-full" style={{ background: `linear-gradient(135deg, ${c.gradientFrom ?? '#333'}, ${c.gradientTo ?? '#111'})` }}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <button
                    onClick={() => removeFromCompare(c.id)}
                    className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-md opacity-0 ring-1 ring-white/10 transition-all group-hover:opacity-100 hover:bg-black hover:text-white hover:scale-110"
                    title="Remove from comparison"
                  >
                    <X size={14} />
                  </button>
                  <div className="absolute bottom-3 left-4 right-4">
                    <p className="font-display text-lg font-bold text-white">{c.name}</p>
                    <p className="text-[12px] text-white/60">{c.city}, {c.state}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 divide-x divide-white/[0.04] p-4">
                  <div className="text-center">
                    <p className="font-mono text-sm font-bold text-text-primary">{c.rating}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-text-disabled">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-sm font-bold text-text-primary">{formatPackage(c.placements?.avgPackage ?? 0)}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-text-disabled">Avg Pkg</p>
                  </div>
                  <div className="text-center">
                    <p className="font-mono text-sm font-bold text-text-primary">{c.placements?.placementPercent ?? 0}%</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider text-text-disabled">Placed</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Quick Verdict */}
      {colleges.length >= 2 && !loading && (
        <div className="mb-8 overflow-hidden rounded-2xl bg-white/[0.02] p-6 ring-1 ring-white/[0.06] animate-fade-in-up">
          <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-text-muted">Quick Verdict</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Best Rating", winner: colleges.reduce((a, b) => a.rating > b.rating ? a : b) },
              { label: "Lowest Fees", winner: colleges.reduce((a, b) => a.annualFees < b.annualFees ? a : b) },
              { label: "Best Placement", winner: colleges.reduce((a, b) => (a.placements?.avgPackage ?? 0) > (b.placements?.avgPackage ?? 0) ? a : b) },
              { label: "Best NIRF", winner: colleges.reduce((a, b) => {
                const aN = a.nirf ?? 999;
                const bN = b.nirf ?? 999;
                return aN < bN ? a : b;
              }) },
            ].map((v) => (
              <div key={v.label} className="rounded-xl bg-white/[0.02] p-4 ring-1 ring-white/[0.04]">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-text-disabled">{v.label}</p>
                <p className="mt-2 font-display text-sm font-bold text-emerald-400">{v.winner.abbreviation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main content */}
      {loading ? (
        <div className="grid gap-3">
          {[1,2,3].map(i => <div key={i} className="h-14 animate-pulse rounded-xl bg-white/[0.02] ring-1 ring-white/[0.04]" />)}
        </div>
      ) : !compareIds.length ? (
        <div className="rounded-[2rem] glass-card p-24 text-center flex flex-col items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full glass-panel mb-6">
            <div className="h-4 w-4 rounded-full border-2 border-primary relative flex items-center justify-center">
              <div className="h-1 w-1 bg-primary rounded-full"></div>
            </div>
          </div>
          <h3 className="font-headline-md text-[24px] text-on-surface mb-2">No colleges selected</h3>
          <p className="font-body-md text-on-surface-variant max-w-sm">Add up to 3 colleges above to start comparing their academic, financial, and atmospheric data points.</p>
        </div>
      ) : <CompareTable colleges={colleges} />}
    </div>
  );
}
