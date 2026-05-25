type Review = { id: string; rating: number; title: string; content: string; authorName: string; batch: string | null; course: string | null; helpful: number; createdAt: Date };

export function ReviewsTab({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">No reviews available.</p>;

  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="space-y-4">
      <div className="rounded-2xl border border-border bg-surface p-4">
        <p className="font-syne text-4xl font-extrabold tracking-tight text-accent3">{avg.toFixed(1)}</p>
        <p className="text-sm text-muted">Average rating from {reviews.length} reviews</p>
      </div>
      {reviews.map((r) => (
        <article key={r.id} className="rounded-2xl border border-border bg-surface p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="font-syne text-base font-semibold text-text">{r.authorName}</span>
            {r.batch ? <span className="rounded-full border border-border bg-surface2 px-2 py-0.5">Batch {r.batch}</span> : null}
            {r.course ? <span className="rounded-full border border-border bg-surface2 px-2 py-0.5">{r.course}</span> : null}
            <span className="rounded-full border border-accent3/40 bg-accent3/10 px-2 py-0.5 text-accent3">{r.rating.toFixed(1)}?</span>
          </div>
          <h4 className="mt-2 font-semibold">{r.title}</h4>
          <p className="mt-1 text-sm text-text/80">{r.content}</p>
          <p className="mt-2 text-xs text-muted">Helpful: {r.helpful}</p>
        </article>
      ))}
    </section>
  );
}