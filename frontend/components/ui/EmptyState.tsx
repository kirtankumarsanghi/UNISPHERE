import Link from "next/link";
import { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description, action }: { icon: LucideIcon; title: string; description: string; action?: { label: string; href: string } }) {
  return <div className="rounded-2xl border border-border bg-surface p-8 text-center"><Icon className="mx-auto mb-3 text-accent" /><h3 className="font-syne text-2xl font-bold tracking-tight">{title}</h3><p className="mt-2 text-muted">{description}</p>{action ? <Link href={action.href} className="mt-4 inline-block rounded-[8px] bg-accent px-5 py-2.5 font-semibold">{action.label}</Link> : null}</div>;
}