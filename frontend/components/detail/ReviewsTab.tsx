type Review = { id: string; rating: number; title: string; content: string; authorName: string; batch: string | null; course: string | null; helpful: number; createdAt: Date };

export function ReviewsTab({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">No reviews available.</p>;

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="space-y-4">
      <div className="rounded-[24px] bg-white/[0.02] p-8 ring-1 ring-white/5 transition-all duration-300 hover:ring-white/10">
        <p className="font-mono text-5xl font-extrabold tracking-tighter text-text-primary">{avg.toFixed(1)}</p>
        <p className="mt-2 text-[13px] font-medium text-text-muted">Average rating from {reviews.length} reviews</p>
      </div>
      {reviews.map((r) => (
        <article key={r.id} className="rounded-[24px] bg-white/[0.02] p-6 ring-1 ring-white/5 transition-all duration-300 hover:bg-white/[0.04] hover:ring-white/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-display text-[15px] font-bold text-text-primary">{r.authorName}</span>
            {r.batch && <span className="rounded-full bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary ring-1 ring-white/10">Batch {r.batch}</span>}
            {r.course && <span className="rounded-full bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-text-secondary ring-1 ring-white/10">{r.course}</span>}
            <span className="ml-auto flex items-center gap-1 rounded-full bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] font-bold text-text-primary ring-1 ring-white/10">
              {r.rating.toFixed(1)} <span className="text-white/50">★</span>
            </span>
          </div>
          <h4 className="mt-4 font-display text-lg font-bold text-text-primary">{r.title}</h4>
          <p className="mt-2 text-[14px] leading-relaxed text-text-secondary">{r.content}</p>
          <div className="mt-6 flex items-center gap-2">
            <span className="rounded-full bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-text-muted ring-1 ring-white/5">Helpful: {r.helpful}</span>
          </div>
        </article>
      ))}
    </section>
  );
}
