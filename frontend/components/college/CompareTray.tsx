"use client";
import { useCompare } from "@/hooks/useCompare";
import Link from "next/link";

export function CompareTray() {
  const { compareColleges, removeFromCompare } = useCompare();
  if (!compareColleges.length) return null;
  return <div className="fixed bottom-5 left-1/2 z-50 w-[min(95vw,720px)] -translate-x-1/2 rounded-[14px] border border-accent/60 bg-surface p-3 shadow-[0_8px_40px_rgba(108,99,255,0.25)]"><div className="flex items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{compareColleges.map((c) => <button key={c.id} onClick={() => removeFromCompare(c.id)} className="rounded-full border border-border bg-surface2 px-3 py-1 text-xs">{c.abbreviation} �</button>)}</div><Link href="/compare" className="rounded-[8px] bg-accent px-4 py-2 text-sm font-semibold">Compare Now</Link></div></div>;
}