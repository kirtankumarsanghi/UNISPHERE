"use client";

import { useMemo, useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Lock, Mail, User } from "lucide-react";
import { Input } from "@/components/ui/Input";

const strength = (v: string) => {
  let s = 0;
  if (v.length >= 8) s += 1;
  if (/[A-Z]/.test(v)) s += 1;
  if (/\d/.test(v)) s += 1;
  if (/[^A-Za-z0-9]/.test(v)) s += 1;
  return s;
};

export function SignupForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const score = useMemo(() => strength(password), [password]);
  const label = score <= 1 ? "Weak" : score <= 3 ? "Medium" : "Strong";
  const bar = score <= 1 ? "bg-accent2" : score <= 3 ? "bg-[#fbbf24]" : "bg-accent3";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    const signupRes = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const signupData = await signupRes.json().catch(() => ({}));

    if (!signupRes.ok) {
      setLoading(false);
      setError(signupData?.error ?? "Could not create account.");
      return;
    }

    const loginRes = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/"
    });

    setLoading(false);

    if (!loginRes || loginRes.error) {
      setError("Account created, but login failed. Please log in manually.");
      router.push("/auth/login");
      return;
    }

    router.push(loginRes.url ?? "/");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-[2rem] glass-card p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
      <div className="relative z-10">
        <div className="mb-8 flex rounded-full glass-panel p-1.5 font-label-caps text-[12px] uppercase tracking-widest">
          <Link href="/auth/login" className="flex-1 rounded-full px-3 py-2 text-center text-on-surface-variant transition-colors hover:text-on-surface">Log in</Link>
          <Link href="/auth/signup" className="flex-1 rounded-full bg-primary px-3 py-2 text-center font-bold text-background shadow-sm">Sign up</Link>
        </div>

        <h1 className="mb-6 font-headline-lg text-[32px] text-on-surface">Sign up</h1>
        <div className="relative mb-4"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" /><Input className="pl-11 py-3.5" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
        <div className="relative mb-4"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" /><Input className="pl-11 py-3.5" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
        <div className="relative"><Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" /><Input className="pl-11 py-3.5" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
        <div className="mt-3">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/5"><div className={`h-full ${bar} transition-all duration-300`} style={{ width: `${Math.max(20, score * 25)}%` }} /></div>
          <p className="mt-1.5 font-label-caps text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/70">Strength: {label}</p>
        </div>
        <div className="relative mt-4"><Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" /><Input className="pl-11 py-3.5" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
        {error ? <p className="mt-3 font-body-md text-[12px] font-semibold text-red-400">{error}</p> : null}
        <button disabled={loading} className="mt-6 w-full rounded-full bg-primary py-3.5 font-label-caps text-[12px] uppercase tracking-widest font-bold text-background shadow-glow transition-all duration-300 hover:scale-[1.02] hover:bg-primary/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
        <p className="mt-6 text-center font-body-md text-[14px] text-on-surface-variant">Already have an account? <Link href="/auth/login" className="font-bold text-primary transition-colors hover:text-primary/80">Log in</Link></p>
      </div>
    </form>
  );
}