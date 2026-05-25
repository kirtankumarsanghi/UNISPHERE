import { prisma } from "@/lib/prisma";
import { CollegeCard } from "@/components/college/CollegeCard";
import { SearchBar } from "@/components/college/SearchBar";
import { CompareTray } from "@/components/college/CompareTray";
import { SortDropdown } from "@/components/college/SortDropdown";
import { Pagination } from "@/components/college/Pagination";
import type { Prisma } from "@prisma/client";

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

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({ where, include: { placements: true }, take: limit, skip: (page - 1) * limit, orderBy }),
    prisma.college.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return <div><section className="relative overflow-hidden py-20 text-center"><div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.25),transparent_55%)]" /><h1 className="font-syne text-5xl font-extrabold tracking-tight">Find your perfect college match</h1><p className="mx-auto mt-4 max-w-2xl text-muted">Discover top colleges across India with ratings, placements, and course-level details.</p><div className="mx-auto mt-8 max-w-2xl"><SearchBar defaultValue={q} /></div></section><section><div className="mb-4 flex items-end justify-between"><div><h2 className="font-syne text-2xl font-bold tracking-tight">Colleges</h2><p className="text-sm text-muted">{total} results</p></div><SortDropdown /></div><div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">{colleges.map((college) => <CollegeCard key={college.id} college={college} />)}</div><Pagination currentPage={page} totalPages={totalPages} /></section><CompareTray /></div>;
}