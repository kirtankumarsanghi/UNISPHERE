export default function CollegeDetailLoading() {
  return (
    <div className="pb-24 animate-pulse">
      {/* Breadcrumbs skeleton */}
      <div className="mb-4 flex items-center gap-2">
        <div className="h-3 w-12 rounded-full bg-white/5"></div>
        <span className="text-white/10">/</span>
        <div className="h-3 w-16 rounded-full bg-white/5"></div>
        <span className="text-white/10">/</span>
        <div className="h-3 w-32 rounded-full bg-white/10"></div>
      </div>

      {/* Hero Skeleton */}
      <div className="relative h-[300px] sm:h-[400px] overflow-hidden rounded-[2.5rem] glass-card border-white/5 bg-white/[0.02]">
        <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-transparent to-transparent z-10" />
        <div className="absolute bottom-0 left-0 z-20 w-full p-8 md:p-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end">
            <div className="h-24 w-24 shrink-0 rounded-[1.5rem] bg-white/10 md:h-32 md:w-32"></div>
            <div className="flex-1 space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-20 rounded-full bg-white/10"></div>
                <div className="h-6 w-24 rounded-full bg-white/10"></div>
              </div>
              <div className="h-10 w-3/4 rounded-lg bg-white/10 md:w-1/2"></div>
              <div className="h-5 w-1/3 rounded-lg bg-white/5"></div>
            </div>
            <div className="flex shrink-0 gap-3">
              <div className="h-12 w-32 rounded-xl bg-white/10"></div>
              <div className="h-12 w-12 rounded-xl bg-white/10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Skeleton */}
      <section className="my-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-[2rem] glass-card p-5 h-[104px]">
            <div className="h-8 w-20 rounded-lg bg-white/10 mb-3"></div>
            <div className="h-3 w-16 rounded-full bg-white/5"></div>
          </div>
        ))}
      </section>

      {/* Tabs Skeleton */}
      <div className="sticky top-20 z-40 mb-8 border-b border-white/5 bg-bg-base/80 backdrop-blur-xl">
        <div className="flex gap-6 overflow-x-auto px-1 py-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-5 w-20 rounded-full bg-white/10 shrink-0"></div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <div className="glass-card rounded-[2rem] p-6 lg:p-8 space-y-4">
            <div className="h-8 w-1/3 rounded-lg bg-white/10 mb-6"></div>
            <div className="h-4 w-full rounded-full bg-white/5"></div>
            <div className="h-4 w-full rounded-full bg-white/5"></div>
            <div className="h-4 w-5/6 rounded-full bg-white/5"></div>
            <div className="h-4 w-4/6 rounded-full bg-white/5"></div>
          </div>
        </div>
        
        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="glass-card rounded-[2rem] p-6 h-[300px]">
            <div className="h-6 w-32 rounded-lg bg-white/10 mb-6"></div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <div className="h-4 w-20 rounded-full bg-white/5"></div>
                <div className="h-4 w-16 rounded-full bg-white/10"></div>
              </div>
              <div className="flex justify-between">
                <div className="h-4 w-24 rounded-full bg-white/5"></div>
                <div className="h-4 w-12 rounded-full bg-white/10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
