import { prisma } from "@/lib/prisma";
import { CollegeCard } from "@/components/college/CollegeCard";
import { SearchBar } from "@/components/college/SearchBar";
import { CompareTray } from "@/components/college/CompareTray";
import { SortDropdown } from "@/components/college/SortDropdown";
import { Pagination } from "@/components/college/Pagination";
import { FilterSidebar } from "@/components/college/FilterSidebar";
import { MobileFilterSheet } from "@/components/layout/MobileFilterSheet";
import type { Prisma } from "@prisma/client";

export default async function Home({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const page = Math.max(Number(searchParams.page ?? "1"), 1);
  const limit = 12;

  const q = searchParams.q ?? "";
  const type = searchParams.type;
  const state = searchParams.state;
  const city = searchParams.city;
  const course = searchParams.course;
  const degree = searchParams.degree;
  const minFees = Number(searchParams.minFees ?? "0");
  const maxFees = Number(searchParams.maxFees ?? "2500000");
  const minRating = Number(searchParams.minRating ?? "0");
  const minPlacement = Number(searchParams.minPlacement ?? "0");
  const minYear = Number(searchParams.minYear ?? "1900");
  const maxNirf = Number(searchParams.maxNirf ?? "9999");

  const sort = searchParams.sort ?? "rating_desc";
  const [sortBy, orderRaw] = sort.split("_");
  const order: Prisma.SortOrder = orderRaw === "asc" ? "asc" : "desc";

  const and: Prisma.CollegeWhereInput[] = [];
  if (q) and.push({ OR: [{ name: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }, { courses: { some: { name: { contains: q, mode: "insensitive" } } } }] });
  if (type) and.push({ type: type as never });
  if (state) and.push({ state });
  if (city) and.push({ city: { contains: city, mode: "insensitive" } });
  if (course) and.push({ courses: { some: { name: { contains: course, mode: "insensitive" } } } });
  if (degree) and.push({ courses: { some: { degree: { contains: degree, mode: "insensitive" } } } });
  and.push({ annualFees: { gte: Number.isNaN(minFees) ? 0 : minFees, lte: Number.isNaN(maxFees) ? 2500000 : maxFees } });
  if (!Number.isNaN(minRating) && minRating > 0) and.push({ rating: { gte: minRating } });
  if (!Number.isNaN(minPlacement) && minPlacement > 0) and.push({ placements: { is: { avgPackage: { gte: minPlacement } } } });
  if (!Number.isNaN(minYear) && minYear > 1900) and.push({ established: { gte: minYear } });
  if (!Number.isNaN(maxNirf) && maxNirf < 9999) and.push({ nirf: { lte: maxNirf } });

  const where: Prisma.CollegeWhereInput = and.length ? { AND: and } : {};

  const orderBy: Prisma.CollegeOrderByWithRelationInput =
    sortBy === "fees"
      ? { annualFees: order }
      : sortBy === "name"
        ? { name: order }
        : sortBy === "placement"
          ? { placements: { avgPackage: order } }
          : sortBy === "popular"
            ? { totalReviews: "desc" }
            : { rating: order };

  const [colleges, total, totalColleges, totalCourses, totalReviews, placementCount] = await Promise.all([
    prisma.college.findMany({ where, include: { placements: true }, take: limit, skip: (page - 1) * limit, orderBy }),
    prisma.college.count({ where }),
    prisma.college.count(),
    prisma.course.count(),
    prisma.review.count(),
    prisma.placement.count()
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const stats = [
    { value: totalColleges.toLocaleString(), label: "Colleges" },
    { value: totalCourses.toLocaleString(), label: "Courses" },
    { value: totalReviews.toLocaleString(), label: "Reviews" },
    { value: `${Math.round((placementCount / Math.max(totalColleges, 1)) * 100)}%`, label: "Placement Data" }
  ];

  return (
    <div>
      <section className="relative overflow-hidden py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.22),transparent_55%)]" />
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-accent3/35 bg-accent3/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent3" /> Discover your future, one campus at a time.
        </div>
        <h1 className="font-syne text-5xl font-extrabold tracking-tight sm:text-6xl">Find your perfect college match</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">Search, filter, compare, and save colleges with real placement and review insights.</p>
        <div className="mx-auto mt-8 max-w-2xl"><SearchBar defaultValue={q} /></div>
        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-surface/60 p-3">
              <div className="font-syne text-xl font-extrabold tracking-tight">{s.value}</div>
              <div className="text-xs text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-[280px_1fr]">
        <div className="hidden md:block"><FilterSidebar /></div>
        <div>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="font-syne text-2xl font-bold tracking-tight">Colleges</h2>
              <p className="text-sm text-muted">{total} results</p>
            </div>
            <SortDropdown />
          </div>

          {colleges.length ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{colleges.map((college) => <CollegeCard key={college.id} college={college} />)}</div>
          ) : (
            <div className="rounded-2xl border border-border bg-surface p-10 text-center"><h3 className="font-syne text-2xl font-bold tracking-tight">No colleges found</h3><p className="mt-2 text-muted">Try changing search or filters.</p></div>
          )}

          <Pagination currentPage={page} totalPages={totalPages} />
        </div>
      </section>

      <MobileFilterSheet />
      <CompareTray />
    </div>
  );
}