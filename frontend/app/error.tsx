"use client";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return <div className="rounded-2xl border border-border bg-surface p-8 text-center"><h2 className="font-syne text-2xl font-bold">Something went wrong</h2><button onClick={reset} className="mt-4 rounded-[8px] bg-accent px-4 py-2">Try again</button></div>;
}