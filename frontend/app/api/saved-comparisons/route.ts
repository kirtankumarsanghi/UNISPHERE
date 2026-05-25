import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json([]);

    const saved = await prisma.savedComparison.findMany({
      where: { userId: session.user.id },
      orderBy: { savedAt: "desc" }
    });
    return NextResponse.json(saved);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { collegeIds, name } = await req.json();
    if (!collegeIds || !Array.isArray(collegeIds) || collegeIds.length < 2) {
      return NextResponse.json({ error: "At least 2 colleges required to save a comparison" }, { status: 400 });
    }

    const entry = await prisma.savedComparison.create({
      data: {
        userId: session.user.id,
        collegeIds,
        name: name || "Saved Comparison"
      }
    });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
