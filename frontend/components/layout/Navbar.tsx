"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="font-syne text-2xl font-extrabold tracking-tight text-accent">CampusLens</Link>

        <div className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/" className="text-text hover:text-accent">Explore</Link>
          <Link href="/compare" className="text-text hover:text-accent">Compare</Link>
          <Link href="/saved" className="text-text hover:text-accent">Saved</Link>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-muted" aria-label="Predictor coming soon">
            Predictor <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-[#a89dff]">Coming soon</span>
          </button>
        </div>

        <div className="hidden gap-2 md:flex">
          <Link href="/auth/login" className="rounded-[8px] border border-border px-4 py-2 hover:border-accent hover:text-accent">Login</Link>
          <Link href="/auth/signup" className="rounded-[8px] bg-accent px-4 py-2 font-semibold text-white hover:-translate-y-[1px] hover:bg-[#7c75ff]">Sign up</Link>
        </div>

        <button aria-label="Open menu" className="rounded-lg border border-border p-2 md:hidden" onClick={() => setOpen(true)}>
          <Menu size={18} />
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <aside className="absolute right-0 top-0 h-full w-72 border-l border-border bg-bg p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-syne text-xl font-bold">Menu</p>
              <button aria-label="Close menu" className="rounded-lg border border-border p-1.5" onClick={() => setOpen(false)}><X size={15} /></button>
            </div>
            <div className="space-y-2 text-sm">
              <Link href="/" onClick={() => setOpen(false)} className="block rounded-lg border border-border bg-surface px-3 py-2">Explore</Link>
              <Link href="/compare" onClick={() => setOpen(false)} className="block rounded-lg border border-border bg-surface px-3 py-2">Compare</Link>
              <Link href="/saved" onClick={() => setOpen(false)} className="block rounded-lg border border-border bg-surface px-3 py-2">Saved</Link>
              <div className="rounded-lg border border-border bg-surface px-3 py-2 text-muted">Predictor (Coming soon)</div>
            </div>
            <div className="mt-6 grid gap-2">
              <Link href="/auth/login" onClick={() => setOpen(false)} className="rounded-[8px] border border-border px-4 py-2 text-center">Login</Link>
              <Link href="/auth/signup" onClick={() => setOpen(false)} className="rounded-[8px] bg-accent px-4 py-2 text-center font-semibold text-white">Sign up</Link>
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}