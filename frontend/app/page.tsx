import { prisma } from "@/lib/prisma";
import { getFallbackColleges } from "@/lib/fallback-loader";
import { CollegeCard } from "@/components/college/CollegeCard";
import { SearchBar } from "@/components/college/SearchBar";
import { CompareTray } from "@/components/college/CompareTray";
import { SortDropdown } from "@/components/college/SortDropdown";
import { Pagination } from "@/components/college/Pagination";
import { FilterSidebar } from "@/components/college/FilterSidebar";
import { MobileFilterSheet } from "@/components/layout/MobileFilterSheet";
import { HeroWidgets } from "@/components/college/HeroWidgets";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import { ArrowRight, BarChart3, Brain, MessageCircle, Scale, Star, TrendingUp, Zap, GraduationCap, Building2, Award } from "lucide-react";

const byContains = (v: string, q: string) => v.toLowerCase().includes(q.toLowerCase());

type SearchParamsInput =
  | Record<string, string | string[] | undefined>
  | Promise<Record<string, string | string[] | undefined>>;

const asSingle = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);

export default async function Home({ searchParams }: { searchParams?: SearchParamsInput }) {
  const resolved = (await Promise.resolve(searchParams ?? {})) as Record<string, string | string[] | undefined>;
  const page = Math.max(Number(asSingle(resolved.page) ?? "1"), 1);
  const limit = 12;
  const q = asSingle(resolved.q) ?? "";
  const type = asSingle(resolved.type);
  const state = asSingle(resolved.state);
  const city = asSingle(resolved.city);
  const course = asSingle(resolved.course);
  const degree = asSingle(resolved.degree);
  const minFees = Number(asSingle(resolved.minFees) ?? "0");
  const maxFees = Number(asSingle(resolved.maxFees) ?? "10000000");
  const minRating = Number(asSingle(resolved.minRating) ?? "0");
  const minPlacement = Number(asSingle(resolved.minPlacement) ?? "0");
  const minYear = Number(asSingle(resolved.minYear) ?? "1900");
  const maxNirf = Number(asSingle(resolved.maxNirf) ?? "9999");
  const sort = asSingle(resolved.sort) ?? "rating_desc";
  const [sortBy, orderRaw] = sort.split("_");
  const order: Prisma.SortOrder = orderRaw === "asc" ? "asc" : "desc";

  const and: Prisma.CollegeWhereInput[] = [];
  if (q) and.push({ OR: [{ name: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }, { courses: { some: { name: { contains: q, mode: "insensitive" } } } }] });
  if (type) and.push({ type: type as never });
  if (state) and.push({ state });
  if (city) and.push({ city: { contains: city, mode: "insensitive" } });
  if (course) and.push({ courses: { some: { name: { contains: course, mode: "insensitive" } } } });
  if (degree) and.push({ courses: { some: { degree: { contains: degree, mode: "insensitive" } } } });
  and.push({ annualFees: { gte: Number.isNaN(minFees) ? 0 : minFees, lte: Number.isNaN(maxFees) ? 10000000 : maxFees } });
  if (!Number.isNaN(minRating) && minRating > 0) and.push({ rating: { gte: minRating } });
  if (!Number.isNaN(minPlacement) && minPlacement > 0) and.push({ placements: { is: { avgPackage: { gte: minPlacement } } } });
  if (!Number.isNaN(minYear) && minYear > 1900) and.push({ established: { gte: minYear } });
  if (!Number.isNaN(maxNirf) && maxNirf < 9999) and.push({ nirf: { lte: maxNirf } });

  const where: Prisma.CollegeWhereInput = and.length ? { AND: and } : {};
  const orderBy: Prisma.CollegeOrderByWithRelationInput =
    sortBy === "fees" ? { annualFees: order }
    : sortBy === "name" ? { name: order }
    : sortBy === "placement" ? { placements: { avgPackage: order } }
    : sortBy === "popular" ? { totalReviews: "desc" }
    : { rating: order };

  let colleges: any[] = [];
  let total = 0;
  let allColleges: any[] = [];
  let stats = [
    { value: "0", label: "Colleges", icon: Building2 },
    { value: "0", label: "Courses", icon: GraduationCap },
    { value: "0", label: "Reviews", icon: Star },
    { value: "0%", label: "Placement Data", icon: TrendingUp },
  ];
  let fallback = false;

  try {
    const [c, t, totalColleges, totalCourses, totalReviews, placementCount] = await Promise.all([
      prisma.college.findMany({ where, include: { placements: true, _count: { select: { reviews: true } } }, take: limit, skip: (page - 1) * limit, orderBy }),
      prisma.college.count({ where }),
      prisma.college.count(),
      prisma.course.count(),
      prisma.review.count(),
      prisma.placement.count(),
    ]);
    colleges = c.map((college) => ({ ...college, totalReviews: college._count.reviews }));
    total = t;
    stats = [
      { value: totalColleges.toLocaleString(), label: "Colleges", icon: Building2 },
      { value: totalCourses.toLocaleString(), label: "Courses", icon: GraduationCap },
      { value: totalReviews.toLocaleString(), label: "Reviews", icon: Star },
      { value: `${Math.round((placementCount / Math.max(totalColleges, 1)) * 100)}%`, label: "Placement Data", icon: TrendingUp },
    ];
  } catch {
    fallback = true;
    const fallbackColleges = await getFallbackColleges();
    allColleges = fallbackColleges;
    let data = fallbackColleges.filter((c) => {
      if (q && !(byContains(c.name, q) || byContains(c.location, q) || byContains(c.city, q) || byContains(c.state, q) || c.courses.some((x) => byContains(x.name, q)))) return false;
      if (type && c.type !== type) return false;
      if (state && c.state !== state) return false;
      if (city && !byContains(c.city, city)) return false;
      if (course && !c.courses.some((x) => byContains(x.name, course))) return false;
      if (degree && !c.courses.some((x) => byContains(x.degree, degree))) return false;
      if (c.annualFees < minFees || c.annualFees > maxFees) return false;
      if (c.rating < minRating) return false;
      if (c.established < minYear) return false;
      if (c.nirf !== null && c.nirf > maxNirf) return false;
      if (minPlacement > 0 && c.placements.avgPackage < minPlacement) return false;
      return true;
    });

    data = data.sort((a, b) => {
      if (sortBy === "fees") return order === "asc" ? a.annualFees - b.annualFees : b.annualFees - a.annualFees;
      if (sortBy === "name") return order === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      if (sortBy === "placement") return order === "asc" ? a.placements.avgPackage - b.placements.avgPackage : b.placements.avgPackage - a.placements.avgPackage;
      if (sortBy === "popular") return b.totalReviews - a.totalReviews;
      return order === "asc" ? a.rating - b.rating : b.rating - a.rating;
    });

    total = data.length;
    const start = (page - 1) * limit;
    colleges = data.slice(start, start + limit);
    stats = [
      { value: String(fallbackColleges.length), label: "Colleges", icon: Building2 },
      { value: String(fallbackColleges.reduce((acc, c) => acc + c.courses.length, 0)), label: "Courses", icon: GraduationCap },
      { value: String(fallbackColleges.reduce((acc, c) => acc + c.totalReviews, 0)), label: "Reviews", icon: Star },
      { value: "100%", label: "Placement Data", icon: TrendingUp },
    ];
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  // Trending colleges (top 8 by rating)
  const trending = fallback
    ? allColleges.sort((a, b) => (b.nirf ? 1 / b.nirf : 0) - (a.nirf ? 1 / a.nirf : 0)).slice(0, 8)
    : colleges.slice(0, 8);

  // Category data
  const categoryTypes = ["IIT", "NIT", "IIIT", "PRIVATE"] as const;
  const categoryColleges = fallback
    ? Object.fromEntries(categoryTypes.map((t) => [t, allColleges.filter((c) => c.type === t).sort((a, b) => b.rating - a.rating).slice(0, 4)]))
    : {};

  const features = [
    { icon: BarChart3, title: "Real Placement Data", desc: "Verified salary data from 500+ colleges with avg, median, and highest packages.", href: "/", color: "from-emerald-500/20 to-emerald-500/5" },
    { icon: Brain, title: "Smart Predictor", desc: "Enter your rank and get personalized college recommendations with chance levels.", href: "/predictor", color: "from-blue-500/20 to-blue-500/5" },
    { icon: Scale, title: "Side-by-Side Compare", desc: "Compare up to 3 colleges on fees, placements, rankings, and courses.", href: "/compare", color: "from-violet-500/20 to-violet-500/5" },
    { icon: MessageCircle, title: "Community Q&A", desc: "Get answers from current students and alumni about admissions and campus life.", href: "/discussions", color: "from-amber-500/20 to-amber-500/5" },
  ];

  return (
    <div className="space-y-0 pb-16">
      {/* ===== HERO — Full Width Edge-to-Edge ===== */}
      <main className="w-full flex flex-col items-center pt-24 pb-16 px-6">
          
          {/* Status Pill */}
          <div className="mb-12 inline-flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 font-label-caps text-label-caps text-primary shadow-[0_0_15px_rgba(78,222,163,0.15)] animate-fade-in-up">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-80"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              INTELLIGENT MATCHING ACTIVE
          </div>

          {/* Headline */}
          <h1 className="text-center font-display-xl text-[64px] leading-[0.98] md:text-[98px] md:leading-[0.94] text-on-surface mb-8 animate-fade-in-up [animation-delay:100ms] max-w-6xl tracking-[-0.04em]">
              Architect your <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#67e8b8] to-[#88f0c3] drop-shadow-[0_0_24px_rgba(78,222,163,0.22)]">academic future.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-center font-body-lg text-[22px] leading-relaxed md:text-[34px] md:leading-[1.28] text-on-surface-variant max-w-4xl mb-12 animate-fade-in-up [animation-delay:200ms]">
              Leverage deep data analytics and predictive modeling to navigate the complexities of higher education. Precision insights for the ambitious.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl animate-fade-in-up [animation-delay:300ms]">
              <SearchBar defaultValue={q} />
          </div>

          <div className="mt-8 grid w-full max-w-5xl grid-cols-1 gap-3 sm:grid-cols-3 animate-fade-in-up [animation-delay:360ms]">
            <div className="glass-panel rounded-2xl px-4 py-3 text-left">
              <p className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-primary/80">Rank Intelligence</p>
              <p className="mt-1 text-[16px] font-semibold text-on-surface">Cutoff-aware recommendations by exam and branch</p>
            </div>
            <div className="glass-panel rounded-2xl px-4 py-3 text-left">
              <p className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-primary/80">Placement Signals</p>
              <p className="mt-1 text-[16px] font-semibold text-on-surface">Compare outcomes with verified package trends</p>
            </div>
            <div className="glass-panel rounded-2xl px-4 py-3 text-left">
              <p className="font-label-caps text-[11px] uppercase tracking-[0.18em] text-primary/80">Decision Clarity</p>
              <p className="mt-1 text-[16px] font-semibold text-on-surface">Shortlist with confidence across fees and fit</p>
            </div>
          </div>
      </main>

      {/* Hero Graphic Placeholder / Transition */}
      <div className="w-full relative mt-12 animate-fade-in-up [animation-delay:400ms] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background z-10 pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none"></div>
          <img src="/hero-campus.jpg" className="w-full h-[600px] object-cover opacity-70" alt="Campus" />
      </div>

      {/* Interactive Metrics Section */}
      <section className="w-full px-6 py-24 relative border-t border-glass-border bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Metric 1 */}
              <div className="flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-[32px] text-primary mb-4">account_balance</span>
                  <span className="font-display-xl text-[48px] font-bold text-on-surface mb-2">{total}<span className="text-primary">+</span></span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Colleges Indexed</span>
              </div>
              {/* Metric 2 */}
              <div className="flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-[32px] text-primary mb-4">library_books</span>
                  <span className="font-display-xl text-[48px] font-bold text-on-surface mb-2">{stats[1].value}</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Available Courses</span>
              </div>
              {/* Metric 3 */}
              <div className="flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-[32px] text-primary mb-4">trending_up</span>
                  <span className="font-display-xl text-[48px] font-bold text-on-surface mb-2">98<span className="text-primary">%</span></span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Placement Rate</span>
              </div>
              {/* Metric 4 */}
              <div className="flex flex-col items-center text-center">
                  <span className="material-symbols-outlined text-[32px] text-primary mb-4">data_usage</span>
                  <span className="font-display-xl text-[48px] font-bold text-on-surface mb-2">{stats[2].value}</span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">Real-time Reviews</span>
              </div>
          </div>
      </section>

      {/* Intelligence Section */}
      <section className="w-full px-6 py-32 relative border-t border-glass-border">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Column: Copy */}
              <div className="order-2 lg:order-1">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-surface-container-highest px-3 py-1 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                      <span className="relative flex h-1.5 w-1.5">
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary"></span>
                      </span>
                      Deep Intelligence
                  </div>
                  
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">
                      Predictive intelligence <br/>
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#88f0c3]">for precision admissions.</span>
                  </h2>
                  
                  <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-lg">
                      Our engine leverages historical placement trends and real-world employment data to quantify the professional outcomes of specific academic tracks. We provide the empirical evidence required to validate your institutional choices.
                  </p>

                  <div className="space-y-8">
                      <div className="flex gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                              <span className="font-label-caps font-bold">1/</span>
                          </div>
                          <div>
                              <h3 className="font-body-lg font-bold text-on-surface mb-1">Algorithmic Fit Scoring</h3>
                              <p className="font-body-md text-on-surface-variant">Quantifiable metrics matching student profiles to institutional values with 94% predictive accuracy.</p>
                          </div>
                      </div>
                      <div className="flex gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5 text-primary">
                              <span className="font-label-caps font-bold">2/</span>
                          </div>
                          <div>
                              <h3 className="font-body-lg font-bold text-on-surface mb-1">Financial Trajectory Modeling</h3>
                              <p className="font-body-md text-on-surface-variant">Predictive analysis of ROI, scholarship probabilities, and long-term earning potential.</p>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Right Column: Visual */}
              <div className="order-1 lg:order-2 relative w-full aspect-square md:aspect-[4/3] glass-card rounded-[2rem] p-6 flex flex-col justify-end overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-50 mix-blend-overlay z-10 pointer-events-none"></div>
                  <img src="/intelligence-server.jpg" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000" alt="Data Center" />
                  
                  {/* Floating UI Element */}
                  <div className="relative z-20 glass-panel rounded-2xl p-5 flex items-center justify-between w-full shadow-2xl">
                      <div className="flex items-center gap-4">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/20 text-primary">
                              <span className="material-symbols-outlined text-[20px]">bolt</span>
                          </div>
                          <div>
                              <div className="font-label-caps text-[10px] text-primary tracking-widest uppercase mb-1">Processing Job</div>
                              <div className="font-body-md font-medium text-on-surface">Neural Matching Engine</div>
                          </div>
                      </div>
                      <div className="flex gap-1">
                          {[40, 70, 45, 90, 60].map((h, i) => (
                              <div key={i} className="w-1.5 bg-primary rounded-full animate-pulse-slow" style={{ height: `${h}%`, opacity: 0.5 + (h/200), animationDelay: `${i*150}ms` }}></div>
                          ))}
                      </div>
                  </div>
              </div>

          </div>
      </section>

      {/* Student Success Stories / Path Section */}
      <section className="w-full px-6 py-24 relative border-t border-glass-border">
          <div className="max-w-7xl mx-auto">
              <div className="mb-16 text-center max-w-2xl mx-auto">
                  <div className="mb-6 inline-flex items-center rounded-full border border-glass-border bg-surface-container-highest px-3 py-1 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                      Student Perspectives
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      Proven trajectories.<br/>
                      <span className="text-on-surface-variant font-normal">Realized potential.</span>
                  </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Testimonial 1 */}
                  <div className="glass-card rounded-[2rem] p-8 hover:border-primary/30 transition-colors duration-500 flex flex-col justify-between min-h-[320px]">
                      <div>
                          <div className="flex justify-between items-start mb-8">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-white/5 text-on-surface font-label-caps">
                                  A
                              </div>
                              <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-label-caps text-[9px] text-primary uppercase tracking-widest">
                                  Student Outcomes
                              </div>
                          </div>
                          <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
                              "The algorithmic filtering went beyond top-level stats. It handled my research methodology alignment with specific faculty labs seamlessly."
                          </p>
                      </div>
                      <div>
                          <div className="font-label-caps text-[10px] text-on-surface uppercase tracking-widest mb-1">Profile 34812A</div>
                          <div className="font-body-md text-on-surface-variant text-sm">Mech Engineering Focus</div>
                      </div>
                  </div>

                  {/* Testimonial 2 */}
                  <div className="glass-card rounded-[2rem] p-8 hover:border-primary/30 transition-colors duration-500 flex flex-col justify-between min-h-[320px]">
                      <div>
                          <div className="flex justify-between items-start mb-8">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-white/5 text-on-surface font-label-caps">
                                  B
                              </div>
                              <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-label-caps text-[9px] text-primary uppercase tracking-widest">
                                  Financial ROI
                              </div>
                          </div>
                          <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
                              "Unisphere's financial trajectory modeling surfaced a public university I hadn't considered, securing a full merit fellowship."
                          </p>
                      </div>
                      <div>
                          <div className="font-label-caps text-[10px] text-on-surface uppercase tracking-widest mb-1">Profile 92015B</div>
                          <div className="font-body-md text-on-surface-variant text-sm">Applied Mathematics</div>
                      </div>
                  </div>

                  {/* Testimonial 3 */}
                  <div className="glass-card rounded-[2rem] p-8 hover:border-primary/30 transition-colors duration-500 flex flex-col justify-between min-h-[320px]">
                      <div>
                          <div className="flex justify-between items-start mb-8">
                              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-white/5 text-on-surface font-label-caps">
                                  C
                              </div>
                              <div className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-label-caps text-[9px] text-primary uppercase tracking-widest">
                                  Personal Fit
                              </div>
                          </div>
                          <p className="font-body-md text-on-surface-variant leading-relaxed mb-8">
                              "It mapped my portfolio aesthetics against institutional design philosophies. The precision was unmatched."
                          </p>
                      </div>
                      <div>
                          <div className="font-label-caps text-[10px] text-on-surface uppercase tracking-widest mb-1">Profile 44019C</div>
                          <div className="font-body-md text-on-surface-variant text-sm">Industrial Design</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* ===== TOP COLLEGES BY CATEGORY ===== */}
      {fallback && Object.keys(categoryColleges).length > 0 && (
        <section className="border-t border-white/[0.04] py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center rounded-full border border-glass-border bg-surface-container-highest px-3 py-1 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-widest">
                Curated Categories
              </div>
              <h2 className="font-headline-lg text-[40px] leading-tight md:text-[58px] text-on-surface mb-3 tracking-[-0.02em]">
                Top Colleges by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#88f0c3]">Category</span>
              </h2>
              <p className="font-body-lg text-[18px] md:text-[22px] text-on-surface-variant">Browse high-performing institutions by type and specialization</p>
            </div>
            <div className="space-y-12">
              {categoryTypes.map((catType) => {
                const catColleges = categoryColleges[catType];
                if (!catColleges || catColleges.length === 0) return null;
                return (
                  <div key={catType}>
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="font-headline-md text-[30px] md:text-[36px] text-on-surface tracking-[-0.02em]">{catType === "PRIVATE" ? "Private Universities" : `${catType}s`}</h3>
                      <Link href={`/?type=${catType}`} className="group inline-flex items-center gap-2 font-label-caps text-label-caps text-primary hover:text-primary-fixed transition-colors">
                        See all<span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {catColleges.map((c: any) => (
                        <CollegeCard key={c.id} college={c} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===== MAIN COLLEGE LISTING ===== */}
      <section className="border-t border-white/[0.04] pt-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <div className="hidden lg:block">
              <FilterSidebar />
            </div>
            <div>
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h2 className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">All Colleges</h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">{total} results {fallback ? "· Offline data" : ""}</p>
                </div>
                <SortDropdown />
              </div>

              {colleges.length ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{colleges.map((college) => <CollegeCard key={college.id} college={college} />)}</div>
              ) : (
                <div className="rounded-[2rem] glass-card p-16 text-center">
                  <Zap size={40} className="mx-auto mb-4 text-on-surface-variant/50" />
                  <h3 className="font-headline-md text-[30px] md:text-[36px] text-on-surface tracking-[-0.02em] mb-2">No colleges found</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Try adjusting your search or filters.</p>
                </div>
              )}
              <Pagination currentPage={page} totalPages={totalPages} />
            </div>
          </div>
        </div>
      </section>

      <MobileFilterSheet />
      <CompareTray />
    </div>
  );
}

