"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function LoginForm({ callbackUrl = "/" }: { callbackUrl?: string }) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(result.url ?? callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] glass-card p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="relative z-10">
        <div className="mb-8 flex rounded-full glass-panel p-1.5 font-label-caps text-[12px] uppercase tracking-widest">
          <Link href="/auth/login" className="flex-1 rounded-full bg-primary px-3 py-2 text-center font-bold text-background shadow-sm">Log in</Link>
          <Link href="/auth/signup" className="flex-1 rounded-full px-3 py-2 text-center text-on-surface-variant transition-colors hover:text-on-surface">Sign up</Link>
        </div>

        <h1 className="mb-6 font-headline-lg text-[32px] text-on-surface">Log in</h1>
        <div className="relative mb-4"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" /><Input className="pl-11 py-3.5" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="relative"><Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" /><Input className="pl-11 py-3.5" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        <div className="mt-2 text-right"><span className="font-label-caps text-[10px] uppercase tracking-widest text-primary cursor-pointer hover:text-primary/80 transition-colors">Forgot password?</span></div>
        {error ? <p className="mt-3 font-body-md text-[12px] font-semibold text-red-400">{error}</p> : null}
        <button disabled={loading} className="mt-6 w-full rounded-full bg-primary py-3.5 font-label-caps text-[12px] uppercase tracking-widest font-bold text-background shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Logging in..." : "Log in"}</button>
        <p className="mt-6 text-center font-body-md text-[14px] text-on-surface-variant">Don't have an account? <Link href="/auth/signup" className="font-bold text-primary transition-colors hover:text-primary/80">Sign up</Link></p>
      </div>
    </form>
  );
}