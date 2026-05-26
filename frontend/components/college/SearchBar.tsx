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
    setValue(defaultValue);
  }, [defaultValue]);

  const applySearch = (raw: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const query = raw.trim();
    if (query) params.set("q", query);
    else params.delete("q");
    params.delete("page");
    const base = pathname || "/";
    const next = params.toString();
    router.push(next ? `${base}?${next}` : base);
  };

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
    <form
      className="w-full glass-panel rounded-full p-2.5 flex items-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),_inset_0_0_20px_rgba(16,185,129,0.05)] relative overflow-visible group transition-all duration-700 hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.9),_inset_0_0_30px_rgba(16,185,129,0.1)] hover:border-primary/40 mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        applySearch(value);
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-full"></div>
      
      <span className="material-symbols-outlined text-primary/70 ml-6 mr-3 text-[24px] group-hover:text-primary transition-colors duration-500 z-10 pointer-events-none">travel_explore</span>
      
      <input
        type="text"
        className="flex-1 bg-transparent border-none text-on-surface font-body-lg text-body-lg placeholder-on-surface-variant/40 focus:ring-0 px-2 h-14 outline-none font-light relative z-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 120)}
        placeholder="Search by institution, discipline, or trajectory..."
      />

      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setValue("");
            applySearch("");
          }}
          className="mr-3 rounded-full p-2 text-on-surface-variant hover:bg-white/10 hover:text-on-surface relative z-10 transition-colors"
        >
          <X size={16} />
        </button>
      )}

      <button
        type="submit"
        className="bg-primary text-background font-label-caps text-label-caps uppercase px-10 py-4 rounded-full hover:bg-primary-fixed transition-all duration-300 shadow-[0_0_20px_rgba(78,222,163,0.3)] hover:shadow-[0_0_30px_rgba(78,222,163,0.5)] relative z-10"
      >
        Analyze
      </button>

      {focused && suggestions.length > 0 ? (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 glass-card rounded-3xl p-3 shadow-2xl">
          {suggestions.map((s) => (
            <Link key={s.id} href={`/colleges/${s.slug}`} className="block rounded-2xl px-5 py-3 transition-colors hover:bg-white/5">
              <p className="text-body-md font-medium text-on-surface">{s.name}</p>
              <p className="mt-0.5 text-sm text-on-surface-variant/80">{s.city}, {s.state}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </form>
  );
}
