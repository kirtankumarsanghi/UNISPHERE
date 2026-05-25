import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const toNum = (v: string | null, d: number) => (v ? Number(v) : d);

export async function GET(req: NextRequest) {
  try {
    const s = req.nextUrl.searchParams;
    const q = s.get("q")?.trim() ?? "";
    const type = s.get("type") ?? undefined;
    const state = s.get("state") ?? undefined;
    const city = s.get("city") ?? undefined;
    const course = s.get("course") ?? undefined;
    const degree = s.get("degree") ?? undefined;
    const minFees = toNum(s.get("minFees"), 0);
    const maxFees = toNum(s.get("maxFees"), 2500000);
    const minRating = toNum(s.get("minRating"), 0);
    const minPlacement = toNum(s.get("minPlacement"), 0);
    const minYear = toNum(s.get("minYear"), 1900);
    const maxNirf = toNum(s.get("maxNirf"), 9999);
    const sortBy = s.get("sortBy") ?? "rating";
    const order: Prisma.SortOrder = s.get("order") === "asc" ? "asc" : "desc";
    const page = Math.max(toNum(s.get("page"), 1), 1);
    const limit = Math.min(Math.max(toNum(s.get("limit"), 12), 1), 50);

    if ([minFees, maxFees, minRating, minPlacement, minYear, maxNirf, page, limit].some(Number.isNaN)) {
      return NextResponse.json({ error: "Invalid query params" }, { status: 400 });
    }

    const and: Prisma.CollegeWhereInput[] = [];

    if (q) {
      and.push({
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { location: { contains: q, mode: "insensitive" } },
          { city: { contains: q, mode: "insensitive" } },
          { state: { contains: q, mode: "insensitive" } },
          { courses: { some: { name: { contains: q, mode: "insensitive" } } } }
        ]
      });
    }

    if (type) and.push({ type: type as never });
    if (state) and.push({ state });
    if (city) and.push({ city: { contains: city, mode: "insensitive" } });
    if (course) and.push({ courses: { some: { name: { contains: course, mode: "insensitive" } } } });
    if (degree) and.push({ courses: { some: { degree: { contains: degree, mode: "insensitive" } } } });

    and.push({ annualFees: { gte: minFees, lte: maxFees } });
    and.push({ rating: { gte: minRating } });
    and.push({ established: { gte: minYear } });
    and.push({ OR: [{ nirf: null }, { nirf: { lte: maxNirf } }] });

    if (minPlacement > 0) {
      and.push({ placements: { is: { avgPackage: { gte: minPlacement } } } });
    }

    const where: Prisma.CollegeWhereInput = { AND: and };

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

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        include: { placements: true, courses: { select: { name: true, degree: true } } },
        orderBy,
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.college.count({ where })
    ]);

    return NextResponse.json({ colleges, total, page, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}