import { notFound } from "next/navigation";
import { unstable_cache } from "next/cache";
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
import { ROICalculator } from "@/components/detail/ROICalculator";
import { AICampusGuide } from "@/components/detail/AICampusGuide";
import { BackButton } from "@/components/ui/BackButton";
import type { Metadata } from "next";
import Link from "next/link";

type PageProps = { params: { slug: string } };

const getCollege = unstable_cache(
  async (idOrSlug: string) =>
    prisma.college.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      include: {
        courses: true,
        placements: true,
        reviews: { orderBy: { createdAt: "desc" }, take: 10 },
      },
    }),
  ["college-detail"],
  { revalidate: 300 }
);

const getSimilarColleges = unstable_cache(
  async (type: string, excludeId: string) =>
    prisma.college.findMany({
      where: { type: type as never, id: { not: excludeId } },
      include: { placements: true },
      take: 4,
      orderBy: { rating: "desc" },
    }),
  ["college-similar"],
  { revalidate: 300 }
);

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const fallbackColleges = await getFallbackColleges();

  try {
    const college = await getCollege(params.slug);
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
  let college: Awaited<ReturnType<typeof getCollege>> | ReturnType<typeof mapFallbackCollege> | null = null;
  let similarColleges: any[] = [];
  const fallbackColleges = await getFallbackColleges();
  const fallback = fallbackColleges.find((item) => item.slug === params.slug || item.id === params.slug);

  try {
    college = await getCollege(params.slug);
    if (college) {
      similarColleges = await getSimilarColleges(college.type, college.id);
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
    { label: "Established", value: String(college.established) },
    ...(college.nirf ? [{ label: "NIRF Rank", value: `#${college.nirf}` }] : []),
  ];

  return (
    <div className="pb-24">
      <div className="mb-4 flex items-center gap-4">
        <BackButton fallback="/" />
        <nav className="flex items-center gap-2 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
          <Link href="/" className="transition-colors hover:text-on-surface">Home</Link>
          <span className="text-white/10">/</span>
          <Link href="/" className="transition-colors hover:text-on-surface">Colleges</Link>
          <span className="text-white/10">/</span>
          <span className="text-on-surface line-clamp-1">{college.name}</span>
        </nav>
      </div>

      <CollegeHero college={college} />

      <section className="my-8 grid grid-cols-2 gap-3 md:grid-cols-4">
        {quickStats.map((s, i) => (
          <div key={s.label} className="group overflow-hidden rounded-[2rem] glass-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(78,222,163,0.1)]">
            <p className="font-headline-md text-[24px] text-on-surface">{s.value}</p>
            <p className="mt-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant transition-colors group-hover:text-on-surface">{s.label}</p>
          </div>
        ))}
      </section>

      <SubNav reviewCount={college.totalReviews ?? college.reviews.length} />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <section id="overview" className="scroll-mt-32"><OverviewTab overview={college.overview} established={college.established} website={college.website} /></section>
          <section id="roi" className="scroll-mt-32">
            <ROICalculator 
              collegeName={college.name} 
              defaultFee={college.annualFees * 4} 
              defaultSalary={college.placements?.avgPackage ?? 800000} 
            />
          </section>
          <section id="courses" className="scroll-mt-32"><CoursesTab courses={college.courses} /></section>
          <section id="placements" className="scroll-mt-32"><PlacementsTab placement={college.placements} /></section>
          <section id="reviews" className="scroll-mt-32"><ReviewsTab reviews={college.reviews} /></section>
        </div>
        <DetailSidebar college={college} />
      </div>

      {similarColleges.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 font-headline-md text-[24px] text-on-surface">Similar Colleges</h2>
          <SimilarColleges colleges={similarColleges} />
        </section>
      )}

      {/* Floating AI Campus Guide Widget */}
      <AICampusGuide collegeName={college.name} />
    </div>
  );
}

function mapFallbackCollege(college: FallbackCollege) {
  // --- Rich Overviews ---
  const overviewMap: Record<string, string> = {
    "iit-madras": "Indian Institute of Technology Madras, established in 1959, is consistently ranked as India's #1 engineering institution. Located on a 617-acre campus surrounded by the Guindy National Park in Chennai, IIT Madras is known for its cutting-edge research in AI, data science, quantum computing, and sustainable energy. The institute has incubated over 300 startups through its Research Park — the largest university-based incubation center in South Asia. With a vibrant student community of 10,000+, world-class labs, and partnerships with MIT, Stanford, and Cambridge, IIT Madras offers an unparalleled academic experience.",
    "iit-delhi": "Indian Institute of Technology Delhi, founded in 1961, stands as one of India's most prestigious engineering institutions. Situated on a 325-acre campus in Hauz Khas, New Delhi, IIT Delhi is a hub for innovation and entrepreneurship. Its graduates have founded companies like Flipkart, Zomato, and Snapdeal. The institute excels in research areas including nanotechnology, biomedical engineering, and artificial intelligence. With 13 multidisciplinary departments, 6 centres of excellence, and collaborations with over 50 international universities, IIT Delhi produces leaders who shape global technology and business.",
    "iit-bombay": "Indian Institute of Technology Bombay, established in 1958 with assistance from UNESCO and the Soviet Union, is located on a 550-acre campus at Powai, Mumbai. Consistently ranked among India's top 3 engineering institutions, IIT Bombay is renowned for its exceptional placement record, strong alumni network (including founders of Paytm and InMobi), and groundbreaking research in fields like semiconductor design, aerospace, and computational sciences. The institute houses over 30 research centres and has strategic alliances with leading universities worldwide including Georgia Tech, NUS, and ETH Zurich.",
    "iit-kanpur": "Indian Institute of Technology Kanpur, established in 1959 with cooperation from a consortium of nine US universities, pioneered computer science education in India. Spread over 1,055 acres along the Grand Trunk Road, IIT Kanpur introduced the first computer science department in the country and has been a leader in aerospace engineering, materials science, and entrepreneurship. The campus houses a world-class wind tunnel, high-performance computing facility, and the SIDBI Innovation & Incubation Centre that has nurtured over 100 startups.",
    "iit-kharagpur": "Indian Institute of Technology Kharagpur, established in 1951, is the oldest and largest IIT with a sprawling 2,100-acre campus in West Bengal. Often called the 'Cradle of the IIT system,' IIT Kharagpur offers the widest range of academic programs among all IITs, spanning engineering, sciences, management, law, and architecture. The institute is home to the Rajiv Gandhi School of Intellectual Property Law and has produced notable alumni including Sundar Pichai (CEO, Google) and Arvind Krishna (CEO, IBM). Its Kalpana Chawla Space Technology Cell and Advanced VLSI Design Lab are globally recognized.",
    "iit-roorkee": "Indian Institute of Technology Roorkee, originally established in 1847 as the Thomason College of Civil Engineering, is the oldest technical institution in Asia. Granted IIT status in 2001, the institute sits on a 365-acre campus at the foothills of the Himalayas in Uttarakhand. IIT Roorkee specializes in civil engineering, earthquake engineering, water resources, and renewable energy. It houses the National Centre for Earthquake Technology and the Alternate Hydro Energy Centre. The historic campus blends colonial-era architecture with state-of-the-art research facilities.",
    "iit-hyderabad": "Indian Institute of Technology Hyderabad, established in 2008, has rapidly emerged as one of India's leading new-generation IITs. Located on a 576-acre campus in Kandi, Sangareddy district, IIT Hyderabad has pioneered a flexible, interdisciplinary curriculum that allows students to design their own academic pathways. The institute excels in AI & machine learning research, healthcare technology, and climate science, with strong industry collaborations with companies like Google, Microsoft, and TCS. IIT Hyderabad's research park and entrepreneurship cell have incubated over 60 deep-tech startups.",
    "iit-guwahati": "Indian Institute of Technology Guwahati, established in 1994, is situated on a 700-acre campus on the banks of the Brahmaputra River in Assam. Known for its picturesque campus — often called the most beautiful among all IITs — the institute has emerged as a leader in nanotechnology, rural technology, and Northeast India development studies. IIT Guwahati houses the Centre for Nanotechnology, the Centre for the Environment, and a world-class central library. With strong placement records and growing research output, it consistently ranks among India's top 10 engineering institutions.",
  };

  // --- Website URLs ---
  const websiteMap: Record<string, string> = {
    "iit-madras": "https://www.iitm.ac.in",
    "iit-delhi": "https://home.iitd.ac.in",
    "iit-bombay": "https://www.iitb.ac.in",
    "iit-kanpur": "https://www.iitk.ac.in",
    "iit-kharagpur": "https://www.iitkgp.ac.in",
    "iit-roorkee": "https://www.iitr.ac.in",
    "iit-hyderabad": "https://www.iith.ac.in",
    "iit-guwahati": "https://www.iitg.ac.in",
    "iit-indore": "https://www.iiti.ac.in",
    "iit-varanasi-bhu": "https://www.iitbhu.ac.in",
    "iit-tirupati": "https://www.iittp.ac.in",
    "iit-bhubaneswar": "https://www.iitbbs.ac.in",
    "iit-dhanbad-ism": "https://www.iitism.ac.in",
    "iit-gandhinagar": "https://www.iitgn.ac.in",
    "iit-mandi": "https://www.iitmandi.ac.in",
    "iit-patna": "https://www.iitp.ac.in",
    "iit-ropar": "https://www.iitrpr.ac.in",
    "iit-jodhpur": "https://www.iitj.ac.in",
    "iit-palakkad": "https://iitpkd.ac.in",
    "iit-dharwad": "https://www.iitdh.ac.in",
    "iit-bhilai": "https://www.iitbhilai.ac.in",
    "iit-jammu": "https://www.iitjammu.ac.in",
    "iit-goa": "https://www.iitgoa.ac.in",
  };

  // --- Top Recruiters by Type ---
  const recruitersByType: Record<string, string[]> = {
    IIT: ["Google", "Microsoft", "Amazon", "Goldman Sachs", "Morgan Stanley", "McKinsey", "BCG", "Adobe", "Apple", "Samsung", "Intel", "Qualcomm", "DE Shaw", "Tower Research", "Uber", "Meta"],
    NIT: ["TCS", "Infosys", "Wipro", "Amazon", "Microsoft", "Samsung", "L&T", "Cognizant", "HCL", "Oracle", "Capgemini", "Accenture", "Deloitte", "Goldman Sachs", "JP Morgan"],
    IIIT: ["Google", "Microsoft", "Amazon", "Flipkart", "Adobe", "Samsung", "Uber", "Oracle", "Walmart Labs", "Qualcomm", "DE Shaw", "Sprinklr", "Directi", "Myntra"],
    PRIVATE: ["TCS", "Infosys", "Wipro", "Cognizant", "Capgemini", "Deloitte", "Accenture", "HCL", "Tech Mahindra", "L&T Infotech", "Mindtree", "Mphasis"],
    GOVERNMENT: ["BHEL", "DRDO", "ISRO", "HAL", "ONGC", "NTPC", "Indian Railways", "TCS", "Infosys", "L&T", "GAIL", "Coal India"],
    DEEMED: ["TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "Amazon", "Microsoft", "Capgemini", "HCL", "Oracle", "SAP Labs"],
    AUTONOMOUS: ["TCS", "Infosys", "Wipro", "L&T", "Cognizant", "Amazon", "Capgemini", "Accenture", "HCL", "Deloitte"],
  };

  // --- Expanded Courses by Type ---
  const expandedCoursesByType: Record<string, { name: string; degree: string; duration: string; totalSeats: number }[]> = {
    IIT: [
      { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Electrical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 110 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Civil Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 80 },
      { name: "Chemical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 70 },
      { name: "Aerospace Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 50 },
      { name: "Mathematics and Computing", degree: "B.Tech", duration: "4 years", totalSeats: 60 },
      { name: "Engineering Physics", degree: "B.Tech", duration: "4 years", totalSeats: 40 },
    ],
    NIT: [
      { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 180 },
      { name: "Electronics and Communication Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 150 },
      { name: "Electrical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 150 },
      { name: "Civil Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Chemical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 80 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", totalSeats: 90 },
    ],
    IIIT: [
      { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 200 },
      { name: "Electronics and Communication Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Data Science and Artificial Intelligence", degree: "B.Tech", duration: "4 years", totalSeats: 60 },
      { name: "Computer Science (Cybersecurity)", degree: "B.Tech", duration: "4 years", totalSeats: 60 },
      { name: "Software Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 80 },
    ],
    PRIVATE: [
      { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 300 },
      { name: "Electronics and Communication Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 200 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 180 },
      { name: "Civil Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", totalSeats: 180 },
      { name: "Biotechnology", degree: "B.Tech", duration: "4 years", totalSeats: 60 },
      { name: "Computer Science (AI & ML)", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Business Administration", degree: "BBA", duration: "3 years", totalSeats: 120 },
    ],
    GOVERNMENT: [
      { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 150 },
      { name: "Electronics and Communication Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Civil Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 100 },
      { name: "Electrical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 100 },
      { name: "Chemical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 60 },
    ],
    DEEMED: [
      { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 240 },
      { name: "Electronics and Communication Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 180 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 150 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Computer Science (Data Science)", degree: "B.Tech", duration: "4 years", totalSeats: 90 },
      { name: "Biomedical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 60 },
    ],
    AUTONOMOUS: [
      { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 180 },
      { name: "Electronics and Communication Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 120 },
      { name: "Civil Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 80 },
      { name: "Electrical Engineering", degree: "B.Tech", duration: "4 years", totalSeats: 90 },
      { name: "Information Technology", degree: "B.Tech", duration: "4 years", totalSeats: 90 },
    ],
  };

  // Build real overview
  const overview = overviewMap[college.slug] ??
    `${college.name}, established in ${college.established}, is a premier ${college.type === "IIT" || college.type === "NIT" || college.type === "IIIT" ? college.type : college.type.toLowerCase()} institution located in ${college.city}, ${college.state}. The institute offers rigorous academic programs across engineering, sciences, and technology disciplines. With a strong emphasis on research, innovation, and industry collaboration, ${college.abbreviation} prepares students for leadership roles in top multinational corporations, startups, and research organizations. The campus provides modern infrastructure including well-equipped laboratories, a central library, sports complexes, and comfortable hostels. ${college.name} consistently ranks among India's top engineering institutions with outstanding placement records and a growing alumni network.`;

  // Get courses for this type
  const typeCourses = expandedCoursesByType[college.type] ?? expandedCoursesByType.GOVERNMENT;
  const enrichedCourses = typeCourses.map((course, index) => ({
    id: `${college.id}-course-${index}`,
    name: course.name,
    degree: course.degree,
    duration: course.duration,
    annualFees: college.annualFees,
    totalSeats: course.totalSeats,
  }));

  return {
    ...college,
    placements: {
      ...college.placements,
      topRecruiters: recruitersByType[college.type] ?? recruitersByType.GOVERNMENT,
      year: 2024,
    },
    overview,
    website: websiteMap[college.slug] ?? null,
    reviews: [],
    courses: enrichedCourses,
  };
}
