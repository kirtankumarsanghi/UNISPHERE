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
      className="rounded-xl glass-panel px-4 py-2 font-body-md text-[14px] text-on-surface outline-none focus:ring-1 focus:ring-primary/50"
    >
      <option value="rating_desc" className="bg-surface-deep">Highest Rating</option>
      <option value="fees_asc" className="bg-surface-deep">Lowest Fees</option>
      <option value="placement_desc" className="bg-surface-deep">Highest Package</option>
      <option value="name_asc" className="bg-surface-deep">Alphabetical</option>
      <option value="popular_desc" className="bg-surface-deep">Most Popular</option>
    </select>
  );
}
