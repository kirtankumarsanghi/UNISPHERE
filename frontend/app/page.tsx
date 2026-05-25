import { prisma } from "@/lib/prisma";
import { CollegeCard } from "@/components/college/CollegeCard";
import { SearchBar } from "@/components/college/SearchBar";
import { CompareTray } from "@/components/college/CompareTray";
import { SortDropdown } from "@/components/college/SortDropdown";
import { Pagination } from "@/components/college/Pagination";
import { CollegeCardSkeleton } from "@/components/college/CollegeCardSkeleton";
import type { Prisma } from "@prisma/client";

const stats = [
  { value: "1,200+", label: "Colleges" },
  { value: "4,800+", label: "Courses" },
  { value: "38K+", label: "Reviews" },
  { value: "96%", label: "Placement Data" }
];

export default async function Home({ searchParams }: { searchParams: Record<string, string | undefined> }) {
  const q = searchParams.q ?? "";
  const page = Math.max(Number(searchParams.page ?? "1"), 1);
  const limit = 12;

  const sort = searchParams.sort ?? "rating_desc";
  const [sortBy, orderRaw] = sort.split("_");
  const order: Prisma.SortOrder = orderRaw === "asc" ? "asc" : "desc";

  const where: Prisma.CollegeWhereInput | undefined = q
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { location: { contains: q, mode: "insensitive" } }
        ]
      }
    : undefined;

  const orderBy: Prisma.CollegeOrderByWithRelationInput =
    sortBy === "fees" ? { annualFees: order } : sortBy === "name" ? { name: order } : { rating: order };

  let colleges: Awaited<ReturnType<typeof prisma.college.findMany>> = [];
  let total = 0;
  let dbDown = false;

  try {
    const result = await Promise.all([
      prisma.college.findMany({ where, include: { placements: true }, take: limit, skip: (page - 1) * limit, orderBy }),
      prisma.college.count({ where })
    ]);
    colleges = result[0];
    total = result[1];
  } catch {
    dbDown = true;
  }

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div>
      <section className="relative overflow-hidden py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.22),transparent_55%)]" />
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-accent3/35 bg-accent3/10 px-4 py-1 text-[11px] font-semibold uppercase tracking-widest text-accent3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent3" /> 1,200+ colleges indexed across India
        </div>
        <h1 className="font-syne text-5xl font-extrabold tracking-tight sm:text-6xl">
          Find your <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">perfect</span> college match
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">Discover top campuses with transparent fees, placements, and real student reviews.</p>
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

      <section>
        <div className="mb-4 flex items-end justify-between">
          <div>
            <h2 className="font-syne text-2xl font-bold tracking-tight">Colleges</h2>
            <p className="text-sm text-muted">{total} results</p>
          </div>
          <SortDropdown />
        </div>

        {dbDown ? (
          <div className="rounded-2xl border border-accent2/30 bg-accent2/10 p-6 text-center text-sm text-accent2">
            Database connection failed. Add `DATABASE_URL` in `frontend/.env.local`, run `npm run db:push`, then refresh.
          </div>
        ) : colleges.length ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{colleges.map((college) => <CollegeCard key={college.id} college={college} />)}</div>
        ) : (
          <div className="rounded-2xl border border-border bg-surface p-10 text-center">
            <h3 className="font-syne text-2xl font-bold tracking-tight">No colleges found</h3>
            <p className="mt-2 text-muted">Try changing search or sorting filters.</p>
          </div>
        )}

        {!dbDown && !colleges.length ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <CollegeCardSkeleton key={i} />)}</div>
        ) : null}

        <Pagination currentPage={page} totalPages={totalPages} />
      </section>

      <CompareTray />
    </div>
  );
}