import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ status: "ready", db: "ok", time: new Date().toISOString() });
  } catch {
    return NextResponse.json({ status: "not_ready", db: "down" }, { status: 503 });
  }
}