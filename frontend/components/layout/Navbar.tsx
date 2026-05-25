import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-syne text-2xl font-extrabold tracking-tight text-accent">CampusLens</Link>

        <div className="hidden items-center gap-5 text-sm md:flex">
          <Link href="/" className="text-text">Explore</Link>
          <Link href="/compare" className="text-text">Compare</Link>
          <Link href="/saved" className="text-text">Saved</Link>
          <button className="inline-flex items-center gap-2 rounded-full border border-border bg-surface2 px-3 py-1 text-xs text-muted" aria-label="Predictor coming soon">
            Predictor <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] text-[#a89dff]">Coming Soon</span>
          </button>
        </div>

        <div className="flex gap-2">
          <Link href="/auth/login" className="rounded-[8px] border border-border px-4 py-2">Login</Link>
          <Link href="/auth/signup" className="rounded-[8px] bg-accent px-4 py-2">Sign up</Link>
        </div>
      </nav>
    </header>
  );
}