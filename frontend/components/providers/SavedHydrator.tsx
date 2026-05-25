"use client";

import { useEffect } from "react";
import { useSaved } from "@/hooks/useSaved";

export function SavedHydrator() {
  const hydrate = useSaved((s) => s.hydrate);

  useEffect(() => {
    let mounted = true;

    fetch("/api/saved")
      .then(async (res) => {
        if (!res.ok) return [] as string[];
        return (await res.json()) as string[];
      })
      .then((ids) => {
        if (mounted && Array.isArray(ids)) hydrate(ids);
      })
      .catch(() => {
        if (mounted) hydrate([]);
      });

    return () => {
      mounted = false;
    };
  }, [hydrate]);

  return null;
}