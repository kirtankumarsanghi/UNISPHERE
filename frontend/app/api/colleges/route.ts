import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { collegesQuerySchema } from "@/lib/validators";
import { getFallbackColleges } from "@/lib/fallback-loader";

const byContains = (v: string, q: string) => v.toLowerCase().includes(q.toLowerCase());

export async function GET(req: NextRequest) {
  const raw = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = collegesQuerySchema.safeParse(raw);
  if (!parsed.success) return NextResponse.json({ error: "Invalid query params" }, { status: 400 });

  const {
    q = "", type, state, city, course, degree,
    minFees = 0, maxFees = 2500000, minRating = 0, minPlacement = 0,
    minYear = 1900, maxNirf = 9999, sortBy = "rating", order = "desc", page = 1, limit = 12
  } = parsed.data;

  const safePage = Math.max(page, 1);
  const safeLimit = Math.min(Math.max(limit, 1), 50);

  try {
    const and: Prisma.CollegeWhereInput[] = [];
    if (q) and.push({ OR: [{ name: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }, { city: { contains: q, mode: "insensitive" } }, { state: { contains: q, mode: "insensitive" } }, { courses: { some: { name: { contains: q, mode: "insensitive" } } } }] });
    if (type) and.push({ type: type as never });
    if (state) and.push({ state });
    if (city) and.push({ city: { contains: city, mode: "insensitive" } });
    if (course) and.push({ courses: { some: { name: { contains: course, mode: "insensitive" } } } });
    if (degree) and.push({ courses: { some: { degree: { contains: degree, mode: "insensitive" } } } });
    and.push({ annualFees: { gte: minFees, lte: maxFees } });
    and.push({ rating: { gte: minRating } });
    and.push({ established: { gte: minYear } });
    and.push({ OR: [{ nirf: null }, { nirf: { lte: maxNirf } }] });
    if (minPlacement > 0) and.push({ placements: { is: { avgPackage: { gte: minPlacement } } } });

    const where: Prisma.CollegeWhereInput = { AND: and };
    const orderBy: Prisma.CollegeOrderByWithRelationInput =
      sortBy === "fees" ? { annualFees: order }
      : sortBy === "name" ? { name: order }
      : sortBy === "placement" ? { placements: { avgPackage: order } }
      : sortBy === "popular" ? { totalReviews: "desc" }
      : { rating: order };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({ where, include: { placements: true, courses: { select: { name: true, degree: true } } }, orderBy, skip: (safePage - 1) * safeLimit, take: safeLimit }),
      prisma.college.count({ where })
    ]);

    return NextResponse.json({ colleges, total, page: safePage, totalPages: Math.ceil(total / safeLimit) });
  } catch {
    const fallbackColleges = await getFallbackColleges();
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

    const total = data.length;
    const start = (safePage - 1) * safeLimit;
    const colleges = data.slice(start, start + safeLimit);
    return NextResponse.json({ colleges, total, page: safePage, totalPages: Math.max(1, Math.ceil(total / safeLimit)), fallback: true });
  }
}
