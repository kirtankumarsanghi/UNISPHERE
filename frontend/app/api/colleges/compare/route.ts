import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getFallbackColleges } from "@/lib/fallback-loader";

export async function GET(req: NextRequest) {
  const idsParam = req.nextUrl.searchParams.get("ids");
  if (!idsParam) return NextResponse.json({ error: "ids required" }, { status: 400 });
  const ids = idsParam.split(",").filter(Boolean).slice(0, 3);

  try {
    const colleges = await prisma.college.findMany({ where: { id: { in: ids } }, include: { placements: true, courses: true } });
    const byId = new Map(colleges.map((c) => [c.id, c]));
    const ordered = ids.map((id) => byId.get(id)).filter(Boolean);
    return NextResponse.json(ordered);
  } catch {
    const fallbackColleges = await getFallbackColleges();
    const byId = new Map(fallbackColleges.map((c) => [c.id, c]));
    const bySlug = new Map(fallbackColleges.map((c) => [c.slug, c]));

    const colleges = ids
      .map((id) => byId.get(id) ?? bySlug.get(id))
      .filter((c): c is NonNullable<typeof c> => Boolean(c))
      .map((c) => ({
        ...c,
        courses: c.courses.map((course, index) => ({
          id: `${c.id}-course-${index}`,
          name: course.name,
          degree: course.degree,
          duration: "4 years",
          annualFees: c.annualFees,
          totalSeats: 120,
        })),
      }));

    return NextResponse.json(colleges);
  }
}
