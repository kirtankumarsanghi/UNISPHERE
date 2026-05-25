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
        router.push(`${pathname}?${params.toString()}`);
      }}
      className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
    >
      <option value="rating_desc">Rating (High?Low)</option>
      <option value="fees_asc">Fees (Low?High)</option>
      <option value="placement_desc">Avg Package (High?Low)</option>
      <option value="name_asc">Name (A?Z)</option>
    </select>
  );
}