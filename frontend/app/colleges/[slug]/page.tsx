import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getFallbackColleges } from "@/lib/fallback-loader";
import type { FallbackCollege } from "@/lib/fallback-colleges";
import { formatFees, formatPackage } from "@/lib/utils";
import { CollegeHero } from "@/components/detail/CollegeHero";
import { SubNav } from "@/components/detail/SubNav";
import { OverviewTab } from "@/components/detail/OverviewTab";
import { CoursesTab } from "@/components/detail/CoursesTab";
import { PlacementsTab } from "@/components/detail/PlacementsTab";
import { ReviewsTab } from "@/components/detail/ReviewsTab";
import { DetailSidebar } from "@/components/detail/DetailSidebar";
import { SimilarColleges } from "@/components/detail/SimilarColleges";
import type { Metadata } from "next";
import Link from "next/link";

type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fallbackColleges = await getFallbackColleges();

  try {
    const college = await prisma.college.findFirst({ where: { OR: [{ id: params.slug }, { slug: params.slug }] } });
    if (college) {
      return {
        title: `${college.name} - Unisphere`,
        description: `Explore courses, placements & reviews for ${college.name}. ${college.overview.slice(0, 120)}`,
      };
    }
  } catch {}

  const fallback = fallbackColleges.find((item) => item.slug === params.slug || item.id === params.slug);
  if (fallback) {
    return {
      title: `${fallback.name} - Unisphere`,
      description: `Explore courses, placements & reviews for ${fallback.name}.`,
    };
  }

  return { title: "College - Unisphere" };
}

export default async function CollegeDetail({ params }: PageProps) {
  let college: Awaited<ReturnType<typeof fetchCollege>> | ReturnType<typeof mapFallbackCollege> | null = null;
  let similarColleges: any[] = [];
  const fallbackColleges = await getFallbackColleges();
  const fallback = fallbackColleges.find((item) => item.slug === params.slug || item.id === params.slug);

  try {
    college = await fetchCollege(params.slug);
    if (college) {
      similarColleges = await prisma.college.findMany({
        where: { type: college.type, id: { not: college.id } },
        include: { placements: true },
        take: 4,
        orderBy: { rating: "desc" },
      });
    }
  } catch {
    // fallback handled below
  }

  if (!college && fallback) {
    college = mapFallbackCollege(fallback);
    similarColleges = fallbackColleges
      .filter((item) => item.type === fallback.type && item.slug !== fallback.slug)
      .slice(0, 4)
      .map((item) => mapFallbackCollege(item));
  }

  if (!college) notFound();

  const quickStats = [
    { label: "Annual Fees", value: formatFees(college.annualFees), tone: "text-blue-400" },
    { label: "Avg Package", value: formatPackage(college.placements?.avgPackage ?? 0), tone: "text-blue-400" },
    { label: "Highest Package", value: formatPackage(college.placements?.highestPackage ?? 0), tone: "text-blue-400" },
    { label: "Placement %", value: `${college.placements?.placementPercent ?? 0}%`, tone: "text-accent3" },
  ];

  return (
    <div>
      <nav className="mb-3 flex items-center gap-1 text-xs text-muted">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span>&gt;</span>
        <Link href="/" className="hover:text-accent">Colleges</Link>
        <span>&gt;</span>
        <span className="text-text">{college.name}</span>
      </nav>

      <CollegeHero college={college} />

      <section className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
        {quickStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-surface p-3 transition-all hover:border-accent/30">
            <p className={`font-syne text-xl font-extrabold tracking-tight ${s.tone}`}>{s.value}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </section>

      <SubNav reviewCount={college.reviews.length} />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <section id="overview"><OverviewTab overview={college.overview} established={college.established} website={college.website} /></section>
          <section id="courses"><CoursesTab courses={college.courses} /></section>
          <section id="placements"><PlacementsTab placement={college.placements} /></section>
          <section id="reviews"><ReviewsTab reviews={college.reviews} /></section>
        </div>
        <DetailSidebar college={college} />
      </div>

      {similarColleges.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-syne text-2xl font-bold tracking-tight">Similar Colleges</h2>
          <SimilarColleges colleges={similarColleges} />
        </section>
      )}
    </div>
  );
}

async function fetchCollege(idOrSlug: string) {
  return prisma.college.findFirst({
    where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
    include: { courses: true, placements: true, reviews: { orderBy: { createdAt: "desc" }, take: 10 } },
  });
}

function mapFallbackCollege(college: FallbackCollege) {
  return {
    ...college,
    placements: {
      ...college.placements,
      topRecruiters: [],
      year: 2024,
    },
    overview: `${college.name} is a recognized institute with strong academics, student community, and placement support.`,
    website: null,
    reviews: [],
    courses: college.courses.map((course, index) => ({
      id: `${college.id}-course-${index}`,
      name: course.name,
      degree: course.degree,
      duration: "4 years",
      annualFees: college.annualFees,
      totalSeats: 120,
    })),
  };
}
