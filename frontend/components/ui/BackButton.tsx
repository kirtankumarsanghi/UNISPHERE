"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function BackButton({ fallback = "/" }: { fallback?: string }) {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 2) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-panel text-on-surface-variant transition-all hover:bg-white/[0.06] hover:text-on-surface hover:scale-105 active:scale-95"
      aria-label="Go back"
    >
      <ArrowLeft size={18} />
    </button>
  );
}
