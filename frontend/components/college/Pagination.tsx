"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((p) => Math.abs(p - currentPage) <= 2);

  const go = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`${pathname}?${params.toString()}`);
  };

  return <div className="mt-8 flex items-center justify-center gap-1.5"><button disabled={currentPage === 1} onClick={() => go(currentPage - 1)} className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-50">Prev</button>{pages.map((p) => <button key={p} onClick={() => go(p)} className={`rounded-lg px-3 py-1.5 text-sm ${p === currentPage ? "bg-accent text-white" : "border border-border"}`}>{p}</button>)}<button disabled={currentPage === totalPages} onClick={() => go(currentPage + 1)} className="rounded-lg border border-border px-3 py-1.5 text-sm disabled:opacity-50">Next</button></div>;
}