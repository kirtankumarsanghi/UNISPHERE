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
    <header className="sticky top-0 z-50 border-b border-border/80 bg-bg/80 backdrop-blur-2xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent shadow-[0_8px_24px_rgba(108,99,255,0.45)]">
            <span className="font-syne text-sm font-extrabold text-white">U</span>
          </div>
          <span className="font-syne text-xl font-extrabold tracking-tight text-text sm:text-2xl">
            UNI<span className="text-accent">SPHERE</span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 text-sm md:flex">
          <Link href="/" className={`rounded-lg px-3 py-1.5 ${isActive("/") ? "bg-accent/15 text-accent" : "text-text hover:bg-surface2 hover:text-accent"}`}>Explore</Link>
          <Link href="/compare" className={`rounded-lg px-3 py-1.5 ${isActive("/compare") ? "bg-accent/15 text-accent" : "text-text hover:bg-surface2 hover:text-accent"}`}>Compare</Link>
          <Link href="/predictor" className={`rounded-lg px-3 py-1.5 ${isActive("/predictor") ? "bg-accent/15 text-accent" : "text-text hover:bg-surface2 hover:text-accent"}`}>Predictor</Link>
          <Link href="/discussions" className={`rounded-lg px-3 py-1.5 ${isActive("/discussions") ? "bg-accent/15 text-accent" : "text-text hover:bg-surface2 hover:text-accent"}`}>Q&A</Link>
          <Link href="/saved" className={`rounded-lg px-3 py-1.5 ${isActive("/saved") ? "bg-accent/15 text-accent" : "text-text hover:bg-surface2 hover:text-accent"}`}>Saved</Link>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          {session?.user ? (
            <>
              <Link href="/saved" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface2 px-3 py-1.5 text-xs text-muted hover:border-accent hover:text-accent">
                <Bookmark size={13} /> Saved
              </Link>
              <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5">
                <User size={14} className="text-accent" />
                <span className="text-sm text-text">{session.user.name ?? session.user.email}</span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex items-center gap-1 rounded-[8px] border border-border px-3 py-1.5 text-sm text-muted hover:border-accent2 hover:text-accent2"
              >
                <LogOut size={14} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" className="rounded-[8px] border border-border px-4 py-2 text-sm hover:border-accent hover:text-accent">Login</Link>
              <Link href="/auth/signup" className="rounded-[8px] bg-accent px-4 py-2 text-sm font-semibold text-white hover:-translate-y-[1px] hover:bg-[#7c75ff]">Sign up</Link>
            </>
          )}
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
              <Link href="/predictor" onClick={() => setOpen(false)} className="block rounded-lg border border-accent/20 bg-accent/5 px-3 py-2 text-accent">Predictor</Link>
              <Link href="/discussions" onClick={() => setOpen(false)} className="block rounded-lg border border-border bg-surface px-3 py-2">Q&A</Link>
              <Link href="/saved" onClick={() => setOpen(false)} className="block rounded-lg border border-border bg-surface px-3 py-2">Saved</Link>
            </div>
            <div className="mt-6 grid gap-2">
              {session?.user ? (
                <>
                  <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm">
                    <User size={14} className="text-accent" />
                    {session.user.name ?? session.user.email}
                  </div>
                  <button onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }} className="rounded-[8px] border border-border px-4 py-2 text-center text-sm text-accent2">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" onClick={() => setOpen(false)} className="rounded-[8px] border border-border px-4 py-2 text-center">Login</Link>
                  <Link href="/auth/signup" onClick={() => setOpen(false)} className="rounded-[8px] bg-accent px-4 py-2 text-center font-semibold text-white">Sign up</Link>
                </>
              )}
            </div>
          </aside>
        </div>
      ) : null}
    </header>
  );
}
