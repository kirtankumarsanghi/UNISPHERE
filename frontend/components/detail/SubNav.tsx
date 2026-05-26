"use client";

export function SubNav({ reviewCount }: { reviewCount: number }) {
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "roi", label: "ROI Calculator" },
    { id: "courses", label: "Courses" },
    { id: "placements", label: "Placements" },
    { id: "reviews", label: `Reviews (${reviewCount})` }
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="sticky top-[73px] z-40 mb-8 bg-bg-base/80 backdrop-blur-xl">
      <div className="flex gap-8 border-b border-white/5 py-4 overflow-x-auto scrollbar-hide">
        {tabs.map((t) => (
          <a 
            key={t.id} 
            href={`#${t.id}`} 
            onClick={(e) => handleClick(e, t.id)}
            className="relative whitespace-nowrap text-[16px] font-headline-md text-on-surface-variant transition-colors duration-200 hover:text-primary hover:scale-105"
          >
            {t.label}
          </a>
        ))}
      </div>
    </div>
  );
}