export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-2xl space-y-4 py-16 text-center">
        <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-surface2" />
        <div className="mx-auto h-4 w-80 animate-pulse rounded bg-surface2" />
        <div className="mx-auto h-12 w-full max-w-lg animate-pulse rounded-xl bg-surface2" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-border bg-surface p-4">
            <div className="h-28 animate-pulse rounded-xl bg-surface2" />
            <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-surface2" />
            <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-surface2" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="h-12 animate-pulse rounded-lg bg-surface2" />
              <div className="h-12 animate-pulse rounded-lg bg-surface2" />
              <div className="h-12 animate-pulse rounded-lg bg-surface2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}