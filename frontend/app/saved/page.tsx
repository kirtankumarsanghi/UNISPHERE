"use client";
import { useEffect, useMemo, useState } from "react";
import { Bookmark } from "lucide-react";
import { EmptyState } from "@/components/ui/EmptyState";
import { CollegeCard } from "@/components/college/CollegeCard";
import { useSaved } from "@/hooks/useSaved";

type College = {
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

export default function SavedPage() {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const savedIds = useSaved((s) => s.savedIds);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const idsRes = await fetch("/api/saved");
      if (!idsRes.ok) {
        setLoading(false);
        return;
      }
      const ids: string[] = await idsRes.json();
      if (!ids.length) {
        setColleges([]);
        setLoading(false);
        return;
      }
      const collegesRes = await fetch(`/api/colleges/compare?ids=${ids.join(",")}`);
      const data: College[] = collegesRes.ok ? await collegesRes.json() : [];
      setColleges(data);
      setLoading(false);
    };
    run().catch(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => colleges.filter((c) => savedIds.has(c.id)), [colleges, savedIds]);

  if (loading) return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-64 animate-pulse rounded-2xl border border-border bg-surface" />)}</div>;

  if (!filtered.length) {
    return <EmptyState icon={Bookmark} title="No saved colleges yet" description="Start exploring and save colleges you like" action={{ label: "Explore Colleges ?", href: "/" }} />;
  }

  return <div><div className="mb-4 flex items-center gap-3"><h1 className="font-syne text-3xl font-extrabold tracking-tight">Your Saved Colleges</h1><span className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-muted">{filtered.length}</span></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{filtered.map((college) => <CollegeCard key={college.id} college={college} />)}</div></div>;
}