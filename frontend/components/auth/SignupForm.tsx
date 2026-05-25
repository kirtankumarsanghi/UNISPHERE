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
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
      <div className="mb-5 flex rounded-full border border-border bg-surface2 p-1 text-sm">
        <Link href="/auth/login" className="flex-1 rounded-full px-3 py-1.5 text-center text-muted">Log in</Link>
        <Link href="/auth/signup" className="flex-1 rounded-full bg-accent px-3 py-1.5 text-center font-semibold text-white">Sign up</Link>
      </div>

      <h1 className="mb-4 font-syne text-3xl font-bold">Sign up</h1>
      <div className="relative mb-3"><User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
      <div className="relative mb-3"><Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div className="relative"><Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      <div className="mt-2">
        <div className="h-1.5 overflow-hidden rounded-full bg-surface2"><div className={`h-full ${bar}`} style={{ width: `${Math.max(20, score * 25)}%` }} /></div>
        <p className="mt-1 text-xs text-muted">Strength: {label}</p>
      </div>
      <div className="relative mt-3"><Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /></div>
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
      <button disabled={loading} className="mt-4 w-full rounded-[8px] bg-accent py-2.5 font-semibold text-white disabled:opacity-60">{loading ? "Creating account..." : "Create account"}</button>
      <p className="mt-4 text-center text-sm text-muted">Already have an account? <Link href="/auth/login" className="text-accent">Log in</Link></p>
    </form>
  );
}