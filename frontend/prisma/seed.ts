import { PrismaClient, CollegeType } from "@prisma/client";
import { fallbackColleges } from "../lib/fallback-colleges";

const prisma = new PrismaClient();

const reviewerPool = [
  "Aarav Sharma",
  "Diya Nair",
  "Rohan Verma",
  "Meera Iyer",
  "Kabir Singh",
  "Ananya Rao",
  "Ishaan Gupta",
  "Sneha Menon",
  "Pranav Joshi",
  "Nikita Das",
];

const recruitersByType: Record<CollegeType, string[]> = {
  IIT: ["Google", "Microsoft", "Amazon", "NVIDIA", "Goldman Sachs"],
  NIT: ["Amazon", "Adobe", "Oracle", "Deloitte", "Infosys"],
  IIIT: ["Atlassian", "Uber", "Samsung", "Qualcomm", "Accenture"],
  GOVERNMENT: ["TCS", "Infosys", "Wipro", "L&T", "Cognizant"],
  PRIVATE: ["TCS", "Infosys", "Capgemini", "Accenture", "Cognizant"],
  DEEMED: ["Accenture", "Cognizant", "Wipro", "Tech Mahindra", "HCL"],
  AUTONOMOUS: ["TCS", "HCL", "Deloitte", "Siemens", "Bosch"],
};

const examByType: Record<CollegeType, string[]> = {
  IIT: ["JEE Advanced", "JEE Main"],
  NIT: ["JEE Main"],
  IIIT: ["JEE Main"],
  GOVERNMENT: ["JEE Main", "State CET"],
  PRIVATE: ["JEE Main", "State CET", "BITSAT", "CUET"],
  DEEMED: ["JEE Main", "State CET", "CUET"],
  AUTONOMOUS: ["JEE Main", "State CET"],
};

const courseBias: Record<string, number> = {
  "Computer Science and Engineering": 0,
  "Data Science": 1200,
  "Electronics and Communication": 2600,
  "Electrical Engineering": 3400,
  "Mechanical Engineering": 4600,
  "Civil Engineering": 6200,
  MBA: 12000,
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

function getBaseRank(type: CollegeType, nirf: number | null, rating: number) {
  const nirfImpact = nirf ? nirf * 160 : 10000;
  const ratingImpact = Math.round((5 - rating) * 1800);
  const typeBonus =
    type === CollegeType.IIT
      ? -2800
      : type === CollegeType.NIT
      ? -800
      : type === CollegeType.IIIT
      ? -400
      : type === CollegeType.GOVERNMENT
      ? 700
      : type === CollegeType.AUTONOMOUS
      ? 1100
      : type === CollegeType.DEEMED
      ? 1600
      : 2200;

  return clamp(3200 + nirfImpact + ratingImpact + typeBonus, 400, 260000);
}

function mapType(type: string): CollegeType {
  if (type in CollegeType) return type as CollegeType;
  return CollegeType.PRIVATE;
}

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.savedComparison.deleteMany();
  await prisma.review.deleteMany();
  await prisma.examCutoff.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  const sourceColleges = fallbackColleges.slice(0, 120);

  for (let idx = 0; idx < sourceColleges.length; idx += 1) {
    const college = sourceColleges[idx];
    const type = mapType(college.type);
    const totalReviews = clamp(college.totalReviews, 3, 40);
    const reviewers = [
      reviewerPool[(idx * 3) % reviewerPool.length],
      reviewerPool[(idx * 3 + 1) % reviewerPool.length],
      reviewerPool[(idx * 3 + 2) % reviewerPool.length],
    ];

    const created = await prisma.college.create({
      data: {
        name: college.name,
        slug: college.slug,
        abbreviation: college.abbreviation,
        city: college.city,
        state: college.state,
        location: college.location,
        type,
        established: college.established,
        annualFees: college.annualFees,
        rating: college.rating,
        totalReviews,
        nirf: college.nirf,
        gradientFrom: college.gradientFrom,
        gradientTo: college.gradientTo,
        overview: `${college.name} is a recognized institute with strong academics, active student life, and placement outcomes supported by published institutional reports.`,
        website: null,
        courses: {
          create: college.courses.map((course, index) => ({
            name: course.name,
            degree: course.degree,
            duration: course.degree.toLowerCase().includes("mba") ? "2 years" : "4 years",
            annualFees: clamp(college.annualFees + index * 5000, 80000, 1200000),
            totalSeats: course.degree.toLowerCase().includes("mba") ? 90 : 180,
          })),
        },
        placements: {
          create: {
            avgPackage: college.placements.avgPackage,
            highestPackage: college.placements.highestPackage,
            medianPackage: college.placements.medianPackage,
            placementPercent: college.placements.placementPercent,
            topRecruiters: recruitersByType[type],
            year: 2024,
          },
        },
        reviews: {
          create: [
            {
              rating: college.rating,
              title: "Strong academics and curriculum",
              content: "The curriculum is structured well, faculty support is available, and project opportunities are meaningful.",
              authorName: reviewers[0],
              batch: "2025",
              course: "B.Tech",
            },
            {
              rating: clamp(college.rating - 0.2, 3.6, 5),
              title: "Placements and internships",
              content: "Placement cell is active and internship opportunities are regularly shared with students.",
              authorName: reviewers[1],
              batch: "2024",
              course: "B.Tech",
            },
            {
              rating: clamp(college.rating - 0.3, 3.5, 5),
              title: "Campus life and peer learning",
              content: "The campus has active clubs and events, creating a collaborative and competitive environment.",
              authorName: reviewers[2],
              batch: "2026",
              course: "B.Tech",
            },
          ],
        },
      },
      include: { courses: true },
    });

    const baseRank = getBaseRank(type, college.nirf, college.rating);
    const examList = examByType[type];

    for (const examName of examList) {
      for (const course of created.courses) {
        const bias = courseBias[course.name] ?? 5200;
        const examBias = examName === "JEE Advanced" ? -2200 : examName === "BITSAT" ? 5400 : 1800;
        const openingRank = clamp(Math.round(baseRank + bias + examBias), 150, 280000);
        const closingRank = clamp(openingRank + 2800 + idx * 35, openingRank + 600, 300000);

        await prisma.examCutoff.create({
          data: {
            collegeId: created.id,
            examName,
            courseName: course.name,
            category: "GENERAL",
            closingRank,
            year: 2024,
          },
        });
      }
    }
  }
}

main().finally(async () => prisma.$disconnect());
