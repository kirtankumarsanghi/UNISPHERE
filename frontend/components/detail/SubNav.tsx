export function SubNav({ reviewCount }: { reviewCount: number }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses" },
    { id: "placements", label: "Placements" },
    { id: "reviews", label: `Reviews (${reviewCount})` }
  ];

  return (
    <div className="sticky top-[57px] z-40 mb-6 border-b border-border bg-bg/90 backdrop-blur">
      <div className="flex flex-wrap gap-4 py-3">
        {tabs.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="border-b-2 border-transparent pb-2 text-sm text-muted transition-all duration-200 hover:border-accent hover:text-accent">
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}