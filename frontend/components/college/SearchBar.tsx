"use client";
import { Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function SearchBar({ defaultValue = "", placeholder = "Search colleges by name or location" }: { defaultValue?: string; placeholder?: string }) {
  const [value, setValue] = useState(defaultValue);
  const debounced = useDebounce(value, 300);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounced) params.set("q", debounced);
    else params.delete("q");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }, [debounced, pathname, router, searchParams]);

  return (
    <div className="relative">
      <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <Input className="pl-10 pr-10" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
      {value ? (
        <button aria-label="Clear search" onClick={() => setValue("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-surface2 hover:text-text">
          <X size={14} />
        </button>
      ) : null}
    </div>
  );
}