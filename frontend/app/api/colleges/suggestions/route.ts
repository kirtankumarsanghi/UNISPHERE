import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getFallbackColleges } from "@/lib/fallback-loader";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();
  if (!q || q.length < 1) return NextResponse.json([]);

  try {
    const colleges = await prisma.college.findMany({
      where: {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { state: { contains: q, mode: "insensitive" } },
          { courses: { some: { name: { contains: q, mode: "insensitive" } } } }
        ]
      },
      select: { id: true, name: true, city: true, state: true, slug: true, abbreviation: true },
      take: 8,
      orderBy: { rating: "desc" }
    });
    return NextResponse.json(colleges);
  } catch {
    const fallbackColleges = await getFallbackColleges();
    const suggestions = fallbackColleges
      .filter((c) => [c.name, c.city, c.state, ...c.courses.map((x) => x.name)].some((t) => t.toLowerCase().includes(q.toLowerCase())))
      .slice(0, 8)
      .map((c) => ({ id: c.id, name: c.name, city: c.city, state: c.state, slug: c.slug, abbreviation: c.abbreviation }));

    return NextResponse.json(suggestions);
  }
}
