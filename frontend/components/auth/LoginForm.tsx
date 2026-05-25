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
    <form onSubmit={onSubmit} className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
      <div className="mb-5 flex rounded-full border border-border bg-surface2 p-1 text-sm">
        <Link href="/auth/login" className="flex-1 rounded-full bg-accent px-3 py-1.5 text-center font-semibold text-white">Log in</Link>
        <Link href="/auth/signup" className="flex-1 rounded-full px-3 py-1.5 text-center text-muted">Sign up</Link>
      </div>

      <h1 className="mb-4 font-syne text-3xl font-bold">Log in</h1>
      <div className="relative mb-3"><Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
      <div className="relative"><Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
      <div className="mt-2 text-right"><span className="text-xs text-accent">Forgot password?</span></div>
      {error ? <p className="mt-2 text-xs text-red-400">{error}</p> : null}
      <button disabled={loading} className="mt-4 w-full rounded-[8px] bg-accent py-2.5 font-semibold text-white disabled:opacity-60">{loading ? "Logging in..." : "Log in"}</button>
      <p className="mt-4 text-center text-sm text-muted">Don't have an account? <Link href="/auth/signup" className="text-accent">Sign up</Link></p>
    </form>
  );
}