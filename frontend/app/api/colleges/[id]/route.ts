import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const college = await prisma.college.findFirst({
      where: { OR: [{ id }, { slug: id }] },
      include: { courses: true, placements: true, reviews: { orderBy: { createdAt: "desc" }, take: 10 } }
    });
    if (!college) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(college);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}