import { PrismaClient, CollegeType } from "@prisma/client";

const prisma = new PrismaClient();

const colleges = [
  ["IIT Bombay","IITB","Mumbai","Maharashtra",CollegeType.IIT,1958,220000,4.9,3,"#0f172a","#3730a3"],
  ["IIT Delhi","IITD","New Delhi","Delhi",CollegeType.IIT,1961,225000,4.9,2,"#111827","#4c1d95"],
  ["IIT Madras","IITM","Chennai","Tamil Nadu",CollegeType.IIT,1959,210000,4.8,1,"#0b1120","#1d4ed8"],
  ["IIT Kanpur","IITK","Kanpur","Uttar Pradesh",CollegeType.IIT,1959,205000,4.8,4,"#1f2937","#4338ca"],
  ["IIT Kharagpur","IITKGP","Kharagpur","West Bengal",CollegeType.IIT,1951,215000,4.7,5,"#0f172a","#5b21b6"],
  ["IISc Bangalore","IISc","Bengaluru","Karnataka",CollegeType.GOVERNMENT,1909,180000,4.9,1,"#0a0f1f","#1e3a8a"],
  ["BITS Pilani","BITS","Pilani","Rajasthan",CollegeType.PRIVATE,1964,540000,4.5,20,"#1f2937","#7c2d12"],
  ["NIT Trichy","NITT","Tiruchirappalli","Tamil Nadu",CollegeType.NIT,1964,165000,4.6,9,"#111827","#0f766e"],
  ["NIT Surathkal","NITK","Mangaluru","Karnataka",CollegeType.NIT,1960,160000,4.5,12,"#172554","#1d4ed8"],
  ["IIIT Hyderabad","IIITH","Hyderabad","Telangana",CollegeType.IIIT,1998,420000,4.7,47,"#111827","#065f46"],
  ["VIT Vellore","VIT","Vellore","Tamil Nadu",CollegeType.PRIVATE,1984,420000,4.2,8,"#111827","#ea580c"],
  ["Manipal Institute of Technology","MIT","Manipal","Karnataka",CollegeType.PRIVATE,1957,480000,4.1,14,"#1e1b4b","#be123c"],
  ["Jadavpur University","JU","Kolkata","West Bengal",CollegeType.GOVERNMENT,1955,120000,4.4,17,"#172554","#7c3aed"],
  ["Delhi Technological University","DTU","New Delhi","Delhi",CollegeType.GOVERNMENT,1941,210000,4.3,29,"#0f172a","#0f766e"],
  ["Amity University Noida","AMITY","Noida","Uttar Pradesh",CollegeType.PRIVATE,2005,550000,3.9,49,"#1f2937","#be185d"],
  ["SRM Institute of Science and Technology","SRM","Chennai","Tamil Nadu",CollegeType.DEEMED,1985,450000,4.0,13,"#111827","#9a3412"],
  ["Thapar Institute of Engineering","TIET","Patiala","Punjab",CollegeType.DEEMED,1956,460000,4.1,20,"#1f2937","#0e7490"],
  ["PSG College of Technology","PSG","Coimbatore","Tamil Nadu",CollegeType.AUTONOMOUS,1951,190000,4.3,63,"#082f49","#164e63"],
  ["SASTRA University","SASTRA","Thanjavur","Tamil Nadu",CollegeType.DEEMED,1984,320000,4.0,34,"#1f2937","#166534"],
  ["Christ University Bangalore","CHRIST","Bengaluru","Karnataka",CollegeType.PRIVATE,1969,300000,4.0,90,"#111827","#334155"]
] as const;

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();

  for (const c of colleges) {
    const [name,abbreviation,city,state,type,established,annualFees,rating,nirf,gradientFrom,gradientTo] = c;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.college.create({
      data: {
        name, slug, abbreviation, city, state, type, established, annualFees, rating, nirf, gradientFrom, gradientTo,
        location: `${city}, ${state}`,
        totalReviews: 3,
        overview: `${name} is a leading institute known for strong academics, research culture, and campus life.`,
        website: `https://${slug}.edu.in`,
        courses: { create: [
          { name: "Computer Science and Engineering", degree: "B.Tech", duration: "4 years", annualFees, totalSeats: 180 },
          { name: "Mechanical Engineering", degree: "B.Tech", duration: "4 years", annualFees: Math.max(120000, annualFees - 20000), totalSeats: 120 },
          { name: "MBA", degree: "MBA", duration: "2 years", annualFees: Math.max(180000, annualFees + 40000), totalSeats: 60 }
        ] },
        placements: { create: { avgPackage: Math.round((annualFees * (type === CollegeType.IIT ? 9 : 4.5)) / 1), highestPackage: Math.round((annualFees * (type === CollegeType.IIT ? 25 : 12)) / 1), medianPackage: Math.round((annualFees * (type === CollegeType.IIT ? 7 : 3.8)) / 1), placementPercent: type === CollegeType.IIT ? 94 : 82, topRecruiters: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"], year: 2024 } },
        reviews: { create: [
          { rating, title: "Strong academics and faculty", content: "Great peer group, rigorous curriculum, and active clubs.", authorName: "Aarav Sharma", batch: "2025", course: "B.Tech CSE" },
          { rating: Math.max(3.8, rating - 0.2), title: "Good placements", content: "Placement support is consistent with many top recruiters visiting.", authorName: "Diya Nair", batch: "2024", course: "B.Tech Mechanical" },
          { rating: Math.max(3.7, rating - 0.3), title: "Campus and opportunities", content: "Campus is vibrant and offers strong internships and project exposure.", authorName: "Rohan Verma", batch: "2026", course: "MBA" }
        ] }
      }
    });
  }
}

main().finally(async () => prisma.$disconnect());