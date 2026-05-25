import type { FallbackCollege } from "@/lib/fallback-colleges";

let fallbackPromise: Promise<FallbackCollege[]> | null = null;

export async function getFallbackColleges(): Promise<FallbackCollege[]> {
  if (!fallbackPromise) {
    fallbackPromise = import("@/lib/fallback-colleges").then((mod) => mod.fallbackColleges);
  }
  return fallbackPromise;
}
