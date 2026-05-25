import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

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
    const { collegeId } = await req.json();
    if (!collegeId) return NextResponse.json({ error: "collegeId required" }, { status: 400 });
    try {
      const entry = await prisma.savedCollege.create({ data: { collegeId, userId: session.user.id } });
      return NextResponse.json(entry);
    } catch {
      return NextResponse.json({ error: "Already saved" }, { status: 409 });
    }
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { collegeId } = await req.json();
    if (!collegeId) return NextResponse.json({ error: "collegeId required" }, { status: 400 });
    await prisma.savedCollege.delete({ where: { userId_collegeId: { userId: session.user.id, collegeId } } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}