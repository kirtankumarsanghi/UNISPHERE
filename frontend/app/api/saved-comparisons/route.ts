import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { savedComparisonSchema } from "@/lib/validators";

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

    const parsed = savedComparisonSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "At least 2 valid colleges are required" }, { status: 400 });

    const { collegeIds, name } = parsed.data;

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
