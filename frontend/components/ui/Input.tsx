import { cn } from "@/lib/utils";

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn("w-full rounded-[12px] border border-border bg-surface px-4 py-3 text-text placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/15 focus:outline-none", props.className)} />;
}