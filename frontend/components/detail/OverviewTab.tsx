export function OverviewTab({ overview }: { overview: string }) {
  return <section className="rounded-2xl border border-border bg-surface p-5"><h3 className="font-syne text-xl font-bold tracking-tight">About</h3><p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-text/85">{overview}</p></section>;
}