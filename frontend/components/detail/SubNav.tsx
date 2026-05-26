export function SubNav({ reviewCount }: { reviewCount: number }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "courses", label: "Courses" },
    { id: "placements", label: "Placements" },
    { id: "reviews", label: `Reviews (${reviewCount})` }
  ];

  return (
    <div className="sticky top-[73px] z-40 mb-8 bg-bg-base/80 backdrop-blur-xl">
      <div className="flex gap-6 border-b border-white/5 py-4 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <a key={t.id} href={`#${t.id}`} className="relative whitespace-nowrap text-[13px] font-bold text-text-muted transition-colors duration-200 hover:text-text-primary">
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}