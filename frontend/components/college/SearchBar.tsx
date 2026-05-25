"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { useDebounce } from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

export function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue);
  const debounced = useDebounce(value, 300);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debounced) params.set("q", debounced); else params.delete("q");
    params.delete("page");
    router.replace(`${pathname}?${params.toString()}`);
  }, [debounced]);
  return <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search colleges by name or location" />;
}