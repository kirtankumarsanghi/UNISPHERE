"use client";

import Link from "next/link";
import { Menu, X, LogOut, User, Bookmark } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg-base/75 backdrop-blur-2xl transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6 lg:py-7">
        <Link href="/" className="group flex items-center">
          <img
            src="/logo-transparent.png"
            alt="Unisphere Logo"
            className="h-12 w-auto object-contain brightness-110 contrast-125 drop-shadow-[0_0_12px_rgba(78,222,163,0.18)] transition-all duration-500 group-hover:scale-[1.04] group-hover:brightness-125 sm:h-14 lg:h-16"
          />
        </Link>

        <div className="hidden items-center gap-2 text-[17px] font-medium md:flex lg:text-[18px]">
          <Link href="/" className={`relative px-4 py-2.5 transition-colors duration-300 ${isActive("/") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>Explore{isActive("/") && <span className="absolute -bottom-[24px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />}</Link>
          <Link href="/compare" className={`relative px-4 py-2.5 transition-colors duration-300 ${isActive("/compare") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>Compare{isActive("/compare") && <span className="absolute -bottom-[24px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />}</Link>
          <Link href="/predictor" className={`relative px-4 py-2.5 text-[20px] font-semibold transition-colors duration-300 lg:text-[21px] ${isActive("/predictor") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>Predictor{isActive("/predictor") && <span className="absolute -bottom-[24px] left-1/2 h-[2px] w-7 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />}</Link>
          <Link href="/scholarships" className={`relative px-4 py-2.5 transition-colors duration-300 ${isActive("/scholarships") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>Scholarships{isActive("/scholarships") && <span className="absolute -bottom-[24px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />}</Link>
          <Link href="/roi-calculator" className={`relative px-4 py-2.5 transition-colors duration-300 ${isActive("/roi-calculator") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>ROI Calculator{isActive("/roi-calculator") && <span className="absolute -bottom-[24px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />}</Link>
          <Link href="/quiz" className={`relative px-4 py-2.5 transition-colors duration-300 ${isActive("/quiz") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>Quiz Match{isActive("/quiz") && <span className="absolute -bottom-[24px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />}</Link>
          <Link href="/discussions" className={`relative px-4 py-2.5 transition-colors duration-300 ${isActive("/discussions") ? "text-text-primary" : "text-text-secondary hover:text-text-primary"}`}>Q&A{isActive("/discussions") && <span className="absolute -bottom-[24px] left-1/2 h-[2px] w-6 -translate-x-1/2 rounded-full bg-white shadow-glow-sm" />}</Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {session?.user ? (
            <>
              <Link href="/saved" className="group inline-flex items-center gap-1.5 rounded-full bg-white/[0.03] px-4 py-2 text-[13px] font-medium text-text-secondary ring-1 ring-white/10 transition-all duration-300 hover:bg-white/[0.08] hover:text-text-primary">
                <Bookmark size={13} className="transition-transform group-hover:scale-110" /> Saved
              </Link>
              <Link href="/dashboard" className="flex items-center gap-2 rounded-full bg-white/[0.03] px-3 py-1.5 ring-1 ring-white/10 hover:bg-white/[0.08] transition-colors">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/20">
                  <User size={12} className="text-blue-400" />
                </div>
                <span className="text-[13px] font-medium text-text-primary">{session.user.name ?? session.user.email}</span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium text-text-secondary transition-all duration-300 hover:bg-white/5 hover:text-text-primary"
              >
                <LogOut size={14} className="transition-transform group-hover:-translate-x-0.5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="rounded-full px-5 py-2 text-[13px] font-medium text-text-secondary transition-all duration-300 hover:text-text-primary hover:bg-white/5">Log in</Link>
              <Link href="/auth/signup" className="rounded-full bg-white px-5 py-2 text-[13px] font-bold text-black transition-all duration-300 hover:bg-white/90 hover:scale-[1.02]">Sign up</Link>
            </>
          )}
        </div>

        <button aria-label="Open menu" className="rounded-lg border border-border p-2 md:hidden" onClick={() => setOpen(true)}>
          <Menu size={18} />
        </button>
      </nav>

      {open ? (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)}>
          <aside className="absolute right-0 top-0 h-full w-72 border-l border-border-subtle bg-bg-surface p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-center justify-between">
              <p className="font-display text-xl font-bold">Menu</p>
              <button aria-label="Close menu" className="rounded-lg border border-border-subtle p-1.5" onClick={() => setOpen(false)}><X size={15} /></button>
            </div>
            <div className="space-y-2 text-sm">
              <Link href="/" onClick={() => setOpen(false)} className="block rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary">Explore</Link>
              <Link href="/compare" onClick={() => setOpen(false)} className="block rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary">Compare</Link>
              <Link href="/predictor" onClick={() => setOpen(false)} className="block rounded-lg border border-accent-muted bg-accent-muted/20 px-3 py-2 text-accent">Predictor</Link>
              <Link href="/scholarships" onClick={() => setOpen(false)} className="block rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary">Scholarships</Link>
              <Link href="/roi-calculator" onClick={() => setOpen(false)} className="block rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary">ROI Calculator</Link>
              <Link href="/discussions" onClick={() => setOpen(false)} className="block rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary">Q&A</Link>
              <Link href="/saved" onClick={() => setOpen(false)} className="block rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-text-primary">Saved</Link>
            </div>
            <div className="mt-6 grid gap-2">
              {session?.user ? (
                <>
                  <div className="flex items-center gap-2 rounded-lg border border-border-subtle bg-bg-elevated px-3 py-2 text-sm text-text-primary">
                    <User size={14} className="text-accent" />
                    {session.user.name ?? session.user.email}
                  </div>
                  <button onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }} className="rounded-lg border border-border-subtle px-4 py-2 text-center text-sm text-red">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="rounded-lg border border-border-subtle px-4 py-2 text-center text-text-primary">Log in</Link>
                  <Link href="/auth/signup" onClick={() => setOpen(false)} className="rounded-lg bg-accent px-4 py-2 text-center font-semibold text-white">Sign up</Link>
                </>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
