import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const collegeId = searchParams.get("collegeId");

    const questions = await prisma.question.findMany({
      where: collegeId ? { collegeId } : undefined,
      include: {
        user: { select: { name: true, image: true } },
        college: { select: { name: true, slug: true } },
        answers: {
          include: {
            user: { select: { name: true, image: true } }
          },
          orderBy: { createdAt: "desc" }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, collegeId } = await req.json();
    if (!title || !content) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const question = await prisma.question.create({
      data: {
        title,
        content,
        userId: session.user.id,
        collegeId: collegeId || null
      }
    });

    return NextResponse.json(question, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
