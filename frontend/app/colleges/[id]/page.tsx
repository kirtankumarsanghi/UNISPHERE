import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatFees, formatPackage } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const college = await prisma.college.findFirst({ where: { OR: [{ id: params.id }, { slug: params.id }] } });
  return { title: college ? `${college.name} | CampusLens` : "College | CampusLens" };
}

export default async function CollegeDetail({ params }: { params: { id: string } }) {
  const college = await prisma.college.findFirst({ where: { OR: [{ id: params.id }, { slug: params.id }] }, include: { courses: true, placements: true, reviews: true } });
  if (!college) notFound();
  return <div><div className="mb-2 text-xs text-muted">Home &gt; Colleges &gt; {college.name}</div><section className="mb-6 rounded-2xl p-8" style={{ background: `linear-gradient(135deg, ${college.gradientFrom}, ${college.gradientTo})` }}><div className="font-syne text-4xl font-extrabold tracking-tight">{college.name}</div><p className="mt-2 text-white/80">{college.city}, {college.state}</p></section><section className="grid grid-cols-2 gap-3 md:grid-cols-4"><div className="rounded-xl border border-border bg-surface p-3">{formatFees(college.annualFees)}</div><div className="rounded-xl border border-border bg-surface p-3">{formatPackage(college.placements?.avgPackage ?? 0)}</div><div className="rounded-xl border border-border bg-surface p-3">{formatPackage(college.placements?.highestPackage ?? 0)}</div><div className="rounded-xl border border-border bg-surface p-3">{college.placements?.placementPercent ?? 0}%</div></section></div>;
}