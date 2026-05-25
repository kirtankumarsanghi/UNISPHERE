import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatFees, formatPackage } from "@/lib/utils";
import { CollegeHero } from "@/components/detail/CollegeHero";
import { SubNav } from "@/components/detail/SubNav";
import { OverviewTab } from "@/components/detail/OverviewTab";
import { CoursesTab } from "@/components/detail/CoursesTab";
import { PlacementsTab } from "@/components/detail/PlacementsTab";
import { ReviewsTab } from "@/components/detail/ReviewsTab";
import { DetailSidebar } from "@/components/detail/DetailSidebar";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const college = await prisma.college.findFirst({ where: { OR: [{ id: params.id }, { slug: params.id }] } });
  return { title: college ? `${college.name} | CampusLens` : "College | CampusLens" };
}

export default async function CollegeDetail({ params }: { params: { id: string } }) {
  const college = await prisma.college.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }] },
    include: { courses: true, placements: true, reviews: { orderBy: { createdAt: "desc" }, take: 10 } }
  });

  if (!college) notFound();

  const quickStats = [
    { label: "Annual Fees", value: formatFees(college.annualFees), tone: "text-blue-400" },
    { label: "Avg Package", value: formatPackage(college.placements?.avgPackage ?? 0), tone: "text-blue-400" },
    { label: "Highest Package", value: formatPackage(college.placements?.highestPackage ?? 0), tone: "text-blue-400" },
    { label: "Placement %", value: `${college.placements?.placementPercent ?? 0}%`, tone: "text-accent3" }
  ];

  return (
    <div>
      <div className="mb-3 text-xs text-muted">Home &gt; Colleges &gt; {college.name}</div>

      <CollegeHero college={college} />

      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {quickStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-3">
            <p className={`font-syne text-xl font-extrabold tracking-tight ${s.tone}`}>{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <SubNav reviewCount={college.reviews.length} />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <section id="overview"><OverviewTab overview={college.overview} /></section>
          <section id="courses"><CoursesTab courses={college.courses} /></section>
          <section id="placements"><PlacementsTab placement={college.placements} /></section>
          <section id="reviews"><ReviewsTab reviews={college.reviews} /></section>
        </div>
        <DetailSidebar college={college} />
      </div>
    </div>
  );
}