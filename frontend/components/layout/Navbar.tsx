import Link from "next/link";

export function Navbar() {
  return <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-xl"><nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"><Link href="/" className="font-syne text-2xl font-extrabold tracking-tight text-accent">CampusLens</Link><div className="hidden gap-5 text-sm md:flex"><Link href="/">Explore</Link><Link href="/compare">Compare</Link><Link href="/saved">Saved</Link></div><div className="flex gap-2"><Link href="/auth/login" className="rounded-[8px] border border-border px-4 py-2">Login</Link><Link href="/auth/signup" className="rounded-[8px] bg-accent px-4 py-2">Sign up</Link></div></nav></header>;
}