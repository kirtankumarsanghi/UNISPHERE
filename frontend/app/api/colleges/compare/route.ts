import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const idsParam = req.nextUrl.searchParams.get("ids");
    if (!idsParam) return NextResponse.json({ error: "ids required" }, { status: 400 });
    const ids = idsParam.split(",").filter(Boolean).slice(0, 3);
    const colleges = await prisma.college.findMany({ where: { id: { in: ids } }, include: { placements: true, courses: true } });
    return NextResponse.json(colleges);
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}