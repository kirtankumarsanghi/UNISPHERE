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
  type?: string;
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

  const [activeTab, setActiveTab] = useState<"colleges" | "comparisons">("colleges");
  const [comparisons, setComparisons] = useState<{id: string; name: string; collegeIds: string[]}[]>([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      try {
        const [idsRes, compRes] = await Promise.all([
          fetch("/api/saved"),
          fetch("/api/saved-comparisons")
        ]);

        if (compRes.ok) {
          setComparisons(await compRes.json());
        }

        if (idsRes.ok) {
          const ids: string[] = await idsRes.json();
          if (ids.length) {
            const collegesRes = await fetch(`/api/colleges/compare?ids=${ids.join(",")}`);
            if (collegesRes.ok) {
              setColleges(await collegesRes.json());
            }
          }
        }
      } finally {
        setLoading(false);
      }
    };

    run();
  }, []);

  const filtered = useMemo(() => colleges.filter((c) => savedIds.includes(c.id)), [colleges, savedIds]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl border border-border bg-surface" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-syne text-3xl font-extrabold tracking-tight">Your Dashboard</h1>
        <div className="flex gap-2 rounded-xl bg-surface2 p-1">
          <button
            onClick={() => setActiveTab("colleges")}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${activeTab === "colleges" ? "bg-white text-text shadow-sm" : "text-muted hover:text-text"}`}
          >
            Saved Colleges
          </button>
          <button
            onClick={() => setActiveTab("comparisons")}
            className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors ${activeTab === "comparisons" ? "bg-white text-text shadow-sm" : "text-muted hover:text-text"}`}
          >
            Comparisons
          </button>
        </div>
      </div>

      {activeTab === "colleges" ? (
        !filtered.length ? (
          <EmptyState
            icon={Bookmark}
            title="No saved colleges yet"
            description="Start exploring and save colleges you like"
            action={{ label: "Explore Colleges", href: "/" }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((college) => (
              <CollegeCard key={college.id} college={college} />
            ))}
          </div>
        )
      ) : (
        !comparisons.length ? (
          <EmptyState
            icon={Bookmark}
            title="No saved comparisons"
            description="Use the compare tool to save match-ups"
            action={{ label: "Compare Colleges", href: "/compare" }}
          />
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {comparisons.map((c) => (
              <div key={c.id} className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5">
                <div>
                  <h3 className="font-syne text-lg font-bold">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted">{c.collegeIds.length} colleges compared</p>
                </div>
                <div className="mt-4 flex gap-2">
                  <a href={`/compare?ids=${c.collegeIds.join(",")}`} className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white">View Comparison</a>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}