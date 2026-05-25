"use client";
import { useCompare } from "@/hooks/useCompare";

export default function ComparePage() {
  const { compareColleges, clearCompare } = useCompare();
  return <div><div className="mb-6 flex items-center justify-between"><div><h1 className="font-syne text-4xl font-extrabold tracking-tight">Compare Colleges</h1><p className="text-muted">Side-by-side comparison to help you decide</p></div><button onClick={clearCompare} className="rounded-[8px] border border-border px-4 py-2">Clear All</button></div><div className="rounded-2xl border border-border bg-surface p-4 text-sm text-muted">{compareColleges.length ? compareColleges.map((c) => c.name).join(" vs ") : "Add colleges from the listing page to compare."}</div></div>;
}