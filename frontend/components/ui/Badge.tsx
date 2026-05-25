import { cn } from "@/lib/utils";

export const Badge = ({ className, children }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("rounded-full border border-border bg-surface2 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted", className)}>{children}</span>
);