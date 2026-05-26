import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getFallbackColleges } from "@/lib/fallback-loader";
import { categoryMultipliers, cutoffData, percentileToRank } from "@/lib/cutoff-data";

const examTypeMap: Record<string, string[]> = {
  "JEE Advanced": ["IIT"],
  "JEE Main": ["IIT", "NIT", "IIIT", "GOVERNMENT", "AUTONOMOUS", "PRIVATE", "DEEMED"],
  BITSAT: ["PRIVATE", "DEEMED"],
  CUET: ["GOVERNMENT", "PRIVATE", "DEEMED", "AUTONOMOUS"],
  "State CET": ["GOVERNMENT", "PRIVATE", "AUTONOMOUS"],
  GATE: ["IIT", "NIT", "IIIT", "GOVERNMENT"],
  CAT: ["IIT", "PRIVATE", "DEEMED", "GOVERNMENT"],
  NEET: ["GOVERNMENT", "PRIVATE", "DEEMED"],
};

function estimateClosingRank(type: string, nirf: number | null, rating: number) {
  const typeBase =
    type === "IIT" ? 8000 :
    type === "NIT" ? 35000 :
    type === "IIIT" ? 45000 :
    type === "GOVERNMENT" ? 90000 :
    type === "AUTONOMOUS" ? 120000 :
    type === "DEEMED" ? 145000 : 170000;

  const nirfPenalty = nirf ? nirf * 350 : 26000;
  const ratingPenalty = Math.round((5 - rating) * 18000);
  return Math.max(1000, Math.min(300000, typeBase + nirfPenalty + ratingPenalty));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const exam = searchParams.get("exam") ?? "";
  const interest = searchParams.get("interest")?.trim();
  const categoryParam = searchParams.get("category") ?? "General";
  let rank = parseInt(searchParams.get("rank") || "0");

  if (!exam || rank <= 0) {
    return NextResponse.json({ error: "Invalid exam or rank" }, { status: 400 });
  }

  // Apply category multiplier — reserved categories have higher effective closing ranks
  const multiplier = categoryMultipliers[categoryParam] ?? 1.0;

  try {
    // Try real cutoff data from static file first
    const staticMatches = cutoffData
      .filter((entry) => entry.exam === exam)
      .filter((entry) => !interest || entry.courseName.toLowerCase().includes(interest.toLowerCase()))
      .map((entry) => ({
        ...entry,
        effectiveClosingRank: Math.round(entry.closingRankGeneral * multiplier),
      }))
      .filter((entry) => rank <= entry.effectiveClosingRank);

    if (staticMatches.length > 0) {
      // Group by college
      const fallbackColleges = await getFallbackColleges();
      const collegeMap = new Map(fallbackColleges.map((c) => [c.slug, c]));

      const grouped = new Map<string, { college: any; courses: { name: string; closingRank: number }[] }>();
      for (const match of staticMatches) {
        const college = collegeMap.get(match.collegeSlug);
        if (!college) continue;

        if (!grouped.has(match.collegeSlug)) {
          grouped.set(match.collegeSlug, {
            college: {
              id: college.id,
              name: college.name,
              slug: college.slug,
              city: college.city,
              state: college.state,
              rating: college.rating,
              annualFees: college.annualFees,
              gradientFrom: college.gradientFrom,
              gradientTo: college.gradientTo,
              type: college.type,
              abbreviation: college.abbreviation,
              placements: { avgPackage: college.placements.avgPackage, placementPercent: college.placements.placementPercent },
            },
            courses: [],
          });
        }
        grouped.get(match.collegeSlug)!.courses.push({
          name: match.courseName,
          closingRank: match.effectiveClosingRank,
        });
      }

      const results = Array.from(grouped.values())
        .sort((a, b) => {
          const aBest = Math.min(...a.courses.map((c) => c.closingRank));
          const bBest = Math.min(...b.courses.map((c) => c.closingRank));
          return aBest - bBest;
        })
        .slice(0, 20);

      return NextResponse.json(results);
    }

    // Fallback to estimated data
    throw new Error("Use fallback");
  } catch {
    const fallbackColleges = await getFallbackColleges();
    const allowedTypes = examTypeMap[exam] ?? Object.keys(examTypeMap).flatMap((key) => examTypeMap[key]);

    const results = fallbackColleges
      .filter((college) => allowedTypes.includes(college.type))
      .map((college) => {
        const matching = college.courses.filter((course) => !interest || course.name.toLowerCase().includes(interest.toLowerCase()));
        const baseRank = estimateClosingRank(college.type, college.nirf, college.rating);
        const adjustedBase = Math.round(baseRank * multiplier);
        const courses = (matching.length ? matching : college.courses).map((course, idx) => ({
          name: course.name,
          closingRank: Math.min(300000, adjustedBase + idx * 4500),
        }));

        return {
          college: {
            id: college.id,
            name: college.name,
            slug: college.slug,
            city: college.city,
            state: college.state,
            rating: college.rating,
            annualFees: college.annualFees,
            gradientFrom: college.gradientFrom,
            gradientTo: college.gradientTo,
            type: college.type,
            abbreviation: college.abbreviation,
            placements: { avgPackage: college.placements.avgPackage, placementPercent: college.placements.placementPercent },
          },
          courses,
        };
      })
      .filter((row) => row.courses.some((course) => course.closingRank >= rank))
      .map((row) => ({
        ...row,
        courses: row.courses.filter((course) => course.closingRank >= rank).slice(0, 4),
      }))
      .sort((a, b) => a.courses[0].closingRank - b.courses[0].closingRank)
      .slice(0, 20);

    return NextResponse.json(results);
  }
}
