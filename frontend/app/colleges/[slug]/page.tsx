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
    { label: "Annual Fees", value: formatFees(college.annualFees) },
    { label: "Avg Package", value: formatPackage(college.placements?.avgPackage ?? 0) },
    { label: "Highest Package", value: formatPackage(college.placements?.highestPackage ?? 0) },
    { label: "Placement %", value: `${college.placements?.placementPercent ?? 0}%` },
  ];

  return (
    <div className="pb-24">
      <nav className="mb-4 flex items-center gap-2 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
        <Link href="/" className="transition-colors hover:text-on-surface">Home</Link>
        <span className="text-white/10">/</span>
        <Link href="/" className="transition-colors hover:text-on-surface">Colleges</Link>
        <span className="text-white/10">/</span>
        <span className="text-on-surface">{college.name}</span>
      </nav>

      <CollegeHero college={college} />

      <section className="my-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {quickStats.map((s, i) => (
          <div key={s.label} className="group overflow-hidden rounded-[2rem] glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(78,222,163,0.1)]">
            <p className="font-headline-md text-[24px] text-on-surface">{s.value}</p>
            <p className="mt-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant transition-colors group-hover:text-on-surface">{s.label}</p>
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
          <h2 className="mb-4 font-headline-md text-[24px] text-on-surface">Similar Colleges</h2>
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
