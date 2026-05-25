"use client";
import { useEffect } from "react";
import { useSaved } from "@/hooks/useSaved";

export function SavedHydrator() {
  const hydrate = useSaved((s) => s.hydrate);
  useEffect(() => {
    let mounted = true;
    fetch("/api/saved")
      .then(async (res) => (res.ok ? res.json() : []))
      .then((ids: string[]) => {
        if (mounted && Array.isArray(ids)) hydrate(ids);
      })
      .catch(() => undefined);
    return () => {
      mounted = false;
    };
  }, [hydrate]);

  return null;
}