"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function SortDropdown() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const value = searchParams.get("sort") ?? "rating_desc";

  return (
    <select
      value={value}
      onChange={(e) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("sort", e.target.value);
        params.delete("page");
        const base = pathname || "/";
        const query = params.toString();
        router.push(query ? `${base}?${query}` : base);
      }}
      className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
    >
      <option value="rating_desc">Highest Rating</option>
      <option value="fees_asc">Lowest Fees</option>
      <option value="placement_desc">Highest Package</option>
      <option value="name_asc">Alphabetical</option>
      <option value="popular_desc">Most Popular</option>
    </select>
  );
}
