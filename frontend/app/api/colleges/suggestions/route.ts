import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get("q")?.trim();
    if (!q || q.length < 1) return NextResponse.json([]);

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
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}