"use client";

import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function LoginForm() {
  return (
    <form className="w-full max-w-md rounded-2xl border border-border bg-surface p-8">
      <div className="mb-5 flex rounded-full border border-border bg-surface2 p-1 text-sm">
        <Link href="/auth/login" className="flex-1 rounded-full bg-accent px-3 py-1.5 text-center font-semibold text-white">Log in</Link>
        <Link href="/auth/signup" className="flex-1 rounded-full px-3 py-1.5 text-center text-muted">Sign up</Link>
      </div>

      <h1 className="mb-4 font-syne text-3xl font-bold">Log in</h1>
      <div className="relative mb-3"><Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" type="email" placeholder="Email" /></div>
      <div className="relative"><Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" /><Input className="pl-9" type="password" placeholder="Password" /></div>
      <div className="mt-2 text-right"><a className="text-xs text-accent">Forgot password?</a></div>
      <button className="mt-4 w-full rounded-[8px] bg-accent py-2.5 font-semibold text-white">Log in</button>
      <p className="mt-4 text-center text-sm text-muted">Don't have an account? <Link href="/auth/signup" className="text-accent">Sign up</Link></p>
    </form>
  );
}