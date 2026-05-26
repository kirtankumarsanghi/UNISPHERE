import Link from "next/link";

export const Footer = () => (
  <footer className="border-t border-border-subtle bg-bg-surface/20 backdrop-blur-md">
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div>
          <Link href="/" className="group flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-hover shadow-glow-sm transition-all duration-300 group-hover:scale-105">
              <span className="font-display text-xs font-extrabold text-white">U</span>
            </div>
            <span className="font-display text-lg font-extrabold tracking-tight text-text-primary transition-colors duration-300 group-hover:text-accent">
              UNI<span className="text-accent">SPHERE</span>
            </span>
          </Link>
          <p className="mt-4 text-xs leading-relaxed text-text-muted">Discover your future, one campus at a time. The ultimate platform for making informed college decisions.</p>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-disabled">Explore</h4>
          <div className="space-y-3 text-sm">
            <Link href="/" className="block text-text-secondary transition-colors hover:text-text-primary">All Colleges</Link>
            <Link href="/compare" className="block text-text-secondary transition-colors hover:text-text-primary">Compare</Link>
            <Link href="/saved" className="block text-text-secondary transition-colors hover:text-text-primary">Saved</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-disabled">Categories</h4>
          <div className="space-y-3 text-sm">
            <Link href="/?type=IIT" className="block text-text-secondary transition-colors hover:text-text-primary">IITs</Link>
            <Link href="/?type=NIT" className="block text-text-secondary transition-colors hover:text-text-primary">NITs</Link>
            <Link href="/?type=PRIVATE" className="block text-text-secondary transition-colors hover:text-text-primary">Private</Link>
          </div>
        </div>
        <div>
          <h4 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-disabled">Account</h4>
          <div className="space-y-3 text-sm">
            <Link href="/auth/login" className="block text-text-secondary transition-colors hover:text-text-primary">Log in</Link>
            <Link href="/auth/signup" className="block text-text-secondary transition-colors hover:text-text-primary">Sign up</Link>
          </div>
        </div>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 text-xs text-text-muted md:flex-row">
        <p>© {new Date().getFullYear()} Unisphere. Built for students, by students.</p>
        <div className="flex gap-4">
          <Link href="#" className="transition-colors hover:text-text-primary">Privacy Policy</Link>
          <Link href="#" className="transition-colors hover:text-text-primary">Terms of Service</Link>
        </div>
      </div>
    </div>
  </footer>
);