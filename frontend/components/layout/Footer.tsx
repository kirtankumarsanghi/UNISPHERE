import Link from "next/link";

export const Footer = () => (
  <footer className="border-t border-border bg-surface/40">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent">
              <span className="font-syne text-xs font-extrabold text-white">U</span>
            </div>
            <span className="font-syne text-lg font-extrabold tracking-tight">UNI<span className="text-accent">SPHERE</span></span>
          </div>
          <p className="mt-2 text-xs text-muted">Discover your future, one campus at a time.</p>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted">Explore</h4>
          <div className="space-y-2 text-sm">
            <Link href="/" className="block text-text/70 hover:text-accent">All Colleges</Link>
            <Link href="/compare" className="block text-text/70 hover:text-accent">Compare</Link>
            <Link href="/saved" className="block text-text/70 hover:text-accent">Saved</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted">Categories</h4>
          <div className="space-y-2 text-sm">
            <Link href="/?type=IIT" className="block text-text/70 hover:text-accent">IITs</Link>
            <Link href="/?type=NIT" className="block text-text/70 hover:text-accent">NITs</Link>
            <Link href="/?type=PRIVATE" className="block text-text/70 hover:text-accent">Private</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-muted">Account</h4>
          <div className="space-y-2 text-sm">
            <Link href="/auth/login" className="block text-text/70 hover:text-accent">Login</Link>
            <Link href="/auth/signup" className="block text-text/70 hover:text-accent">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted">
        © {new Date().getFullYear()} Unisphere. Built for students, by students.
      </div>
    </div>
  </footer>
);