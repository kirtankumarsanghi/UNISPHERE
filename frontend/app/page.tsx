import { prisma } from "@/lib/prisma";
import { fallbackColleges } from "@/lib/fallback-colleges";
import { CollegeCard } from "@/components/college/CollegeCard";
import { SearchBar } from "@/components/college/SearchBar";
import { CompareTray } from "@/components/college/CompareTray";
import { SortDropdown } from "@/components/college/SortDropdown";
import { Pagination } from "@/components/college/Pagination";
import { FilterSidebar } from "@/components/college/FilterSidebar";
import { MobileFilterSheet } from "@/components/layout/MobileFilterSheet";
import type { Prisma } from "@prisma/client";

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
  const maxFees = Number(asSingle(resolved.maxFees) ?? "2500000");
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
  and.push({ annualFees: { gte: Number.isNaN(minFees) ? 0 : minFees, lte: Number.isNaN(maxFees) ? 2500000 : maxFees } });
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
  let stats = [
    { value: "0", label: "Colleges" },
    { value: "0", label: "Courses" },
    { value: "0", label: "Reviews" },
    { value: "0%", label: "Placement Data" },
  ];
  let fallback = false;

  try {
    const [c, t, totalColleges, totalCourses, totalReviews, placementCount] = await Promise.all([
      prisma.college.findMany({ where, include: { placements: true }, take: limit, skip: (page - 1) * limit, orderBy }),
      prisma.college.count({ where }),
      prisma.college.count(),
      prisma.course.count(),
      prisma.review.count(),
      prisma.placement.count(),
    ]);
    colleges = c;
    total = t;
    stats = [
      { value: totalColleges.toLocaleString(), label: "Colleges" },
      { value: totalCourses.toLocaleString(), label: "Courses" },
      { value: totalReviews.toLocaleString(), label: "Reviews" },
      { value: `${Math.round((placementCount / Math.max(totalColleges, 1)) * 100)}%`, label: "Placement Data" },
    ];
  } catch {
    fallback = true;
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
      { value: String(fallbackColleges.length), label: "Colleges" },
      { value: String(fallbackColleges.reduce((acc, c) => acc + c.courses.length, 0)), label: "Courses" },
      { value: String(fallbackColleges.reduce((acc, c) => acc + c.totalReviews, 0)), label: "Reviews" },
      { value: "100%", label: "Placement Data" },
    ];
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div>
      <section className="relative overflow-hidden py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.22),transparent_55%)]" />
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-accent3/35 bg-accent3/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent3" /> Discover your future, one campus at a time
        </div>
        <h1 className="font-syne text-5xl font-extrabold tracking-tight sm:text-6xl">Find your perfect <span className="bg-gradient-to-r from-accent to-accent3 bg-clip-text text-transparent">college match</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">Search, filter, compare, and save colleges with real placement data and student insights.</p>
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
              <p className="text-sm text-muted">{total} results {fallback ? "(offline data)" : ""}</p>
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
