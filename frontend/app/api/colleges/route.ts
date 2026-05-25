import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

const toNum = (v: string | null, d: number) => (v ? Number(v) : d);

export async function GET(req: NextRequest) {
  try {
    const s = req.nextUrl.searchParams;
    const q = s.get("q") ?? "";
    const type = s.get("type") ?? undefined;
    const state = s.get("state") ?? undefined;
    const minFees = toNum(s.get("minFees"), 0);
    const maxFees = toNum(s.get("maxFees"), 2500000);
    const minRating = toNum(s.get("minRating"), 0);
    const minPlacement = s.get("minPlacement");
    const sortBy = s.get("sortBy") ?? "rating";
    const order: Prisma.SortOrder = s.get("order") === "asc" ? "asc" : "desc";
    const page = Math.max(toNum(s.get("page"), 1), 1);
    const limit = Math.min(Math.max(toNum(s.get("limit"), 12), 1), 50);

    if ([minFees, maxFees, minRating, page, limit].some(Number.isNaN)) {
      return NextResponse.json({ error: "Invalid query params" }, { status: 400 });
    }

    const and: Prisma.CollegeWhereInput[] = [];
    if (q) and.push({ OR: [{ name: { contains: q, mode: "insensitive" } }, { location: { contains: q, mode: "insensitive" } }] });
    if (type) and.push({ type: type as Prisma.EnumCollegeTypeFilter["equals"] });
    if (state) and.push({ state });
    and.push({ annualFees: { gte: minFees, lte: maxFees } });
    and.push({ rating: { gte: minRating } });
    if (minPlacement && !Number.isNaN(Number(minPlacement))) {
      and.push({ placements: { is: { avgPackage: { gte: Number(minPlacement) } } } });
    }

    const where: Prisma.CollegeWhereInput = { AND: and };
    const orderBy: Prisma.CollegeOrderByWithRelationInput =
      sortBy === "fees"
        ? { annualFees: order }
        : sortBy === "name"
        ? { name: order }
        : sortBy === "placement"
        ? { placements: { avgPackage: order } }
        : { rating: order };

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({ where, include: { placements: true }, orderBy, skip: (page - 1) * limit, take: limit }),
      prisma.college.count({ where })
    ]);

    return NextResponse.json({ colleges, total, page, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}