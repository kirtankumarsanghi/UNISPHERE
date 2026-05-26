import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { discussionCreateSchema } from "@/lib/validators";

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

    const parsed = discussionCreateSchema.safeParse(await req.json());
    if (!parsed.success) return NextResponse.json({ error: "Invalid fields" }, { status: 400 });

    const { title, content, collegeId } = parsed.data;

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
