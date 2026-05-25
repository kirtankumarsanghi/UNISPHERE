import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const exam = searchParams.get("exam");
    const interest = searchParams.get("interest")?.trim();
    const rank = parseInt(searchParams.get("rank") || "0");
    
    if (!exam || !rank || rank <= 0) {
      return NextResponse.json({ error: "Invalid exam or rank" }, { status: 400 });
    }

    const cutoffs = await prisma.examCutoff.findMany({
      where: {
        examName: exam,
        ...(interest ? { courseName: { contains: interest, mode: "insensitive" } } : {}),
        closingRank: { gte: rank }, // The college's closing rank should be greater than or equal to the student's rank
      },
      include: {
        college: {
          select: {
            id: true,
            name: true,
            slug: true,
            city: true,
            state: true,
            rating: true,
            annualFees: true,
            gradientFrom: true,
            gradientTo: true,
            type: true,
            placements: { select: { avgPackage: true, placementPercent: true } }
          }
        }
      },
      orderBy: {
        closingRank: "asc"
      },
      take: 20
    });

    // Group by college to avoid returning the same college multiple times for different courses
    const uniqueColleges = new Map<string, { college: any; courses: { name: string; closingRank: number }[] }>();
    for (const cutoff of cutoffs) {
      if (!uniqueColleges.has(cutoff.college.id)) {
        uniqueColleges.set(cutoff.college.id, {
          college: cutoff.college,
          courses: [{ name: cutoff.courseName, closingRank: cutoff.closingRank }]
        });
      } else {
        const existing = uniqueColleges.get(cutoff.college.id);
        existing.courses.push({ name: cutoff.courseName, closingRank: cutoff.closingRank });
      }
    }

    const results = Array.from(uniqueColleges.values()).sort((a, b) => {
      const aBest = Math.min(...a.courses.map((course) => course.closingRank));
      const bBest = Math.min(...b.courses.map((course) => course.closingRank));
      return aBest - bBest;
    });
    
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
