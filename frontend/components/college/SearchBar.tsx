"use client";
import { Search, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

type Suggestion = { id: string; name: string; city: string; state: string; slug: string; abbreviation: string };

export function SearchBar({ defaultValue = "", placeholder = "Search by college, location, or course" }: { defaultValue?: string; placeholder?: string }) {
  const [value, setValue] = useState(defaultValue);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [focused, setFocused] = useState(false);
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

  useEffect(() => {
    if (!debounced) {
      setSuggestions([]);
      return;
    }
    fetch(`/api/colleges/suggestions?q=${encodeURIComponent(debounced)}`)
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => setSuggestions(Array.isArray(d) ? d : []))
      .catch(() => setSuggestions([]));
  }, [debounced]);

  return (
    <div className="relative">
      <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
      <Input
        className="pl-10 pr-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        placeholder={placeholder}
      />
      {value ? (
        <button aria-label="Clear search" onClick={() => setValue("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-surface2 hover:text-text">
          <X size={14} />
        </button>
      ) : null}

      {focused && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 rounded-xl border border-border bg-surface p-1 shadow-2xl">
          {suggestions.map((s) => (
            <Link key={s.id} href={`/colleges/${s.slug}`} className="block rounded-lg px-3 py-2 hover:bg-surface2">
              <p className="text-sm font-medium">{s.name}</p>
              <p className="text-xs text-muted">{s.city}, {s.state}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}