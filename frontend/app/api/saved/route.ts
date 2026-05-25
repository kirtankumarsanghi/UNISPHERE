import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveCollegeSchema } from "@/lib/validators";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const saved = await prisma.savedCollege.findMany({ where: { userId: session.user.id }, select: { collegeId: true } });
    return NextResponse.json(saved.map((s) => s.collegeId));
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = saveCollegeSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "collegeId required" }, { status: 400 });

    const { collegeId } = parsed.data;
    const college = await prisma.college.findUnique({ where: { id: collegeId }, select: { id: true } });
    if (!college) return NextResponse.json({ error: "College not found" }, { status: 404 });

    const entry = await prisma.savedCollege.create({ data: { collegeId, userId: session.user.id } });
    return NextResponse.json(entry, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Already saved" }, { status: 409 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const parsed = saveCollegeSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "collegeId required" }, { status: 400 });

    const { collegeId } = parsed.data;
    await prisma.savedCollege.delete({ where: { userId_collegeId: { userId: session.user.id, collegeId } } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      return NextResponse.json({ error: "Save entry not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}