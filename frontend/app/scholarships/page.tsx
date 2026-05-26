"use client";

import { useState } from "react";
import { Search, GraduationCap, Banknote, MapPin, Users, Sparkles, AlertCircle } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

type Scholarship = {
  id: string;
  name: string;
  provider: string;
  amount: string;
  deadline: string;
  eligibility: string[];
  category: "merit" | "means" | "special";
  tags: string[];
  applyUrl?: string;
};

const SCHOLARSHIPS: Scholarship[] = [
  {
    id: "s1",
    name: "Central Sector Scheme of Scholarship",
    provider: "Ministry of Education",
    amount: "₹12,000 - ₹20,000 / year",
    deadline: "October 31, 2026",
    category: "merit",
    eligibility: ["Above 80th percentile in 12th Board", "Family income < ₹4.5 Lakhs/year", "Pursuing regular degree course"],
    tags: ["All India", "Merit-Based", "Govt"],
  },
  {
    id: "s2",
    name: "AICTE Pragati Scholarship for Girls",
    provider: "AICTE",
    amount: "₹50,000 / year",
    deadline: "November 15, 2026",
    category: "special",
    eligibility: ["Girl student in Technical Degree/Diploma", "Max 2 girls per family", "Family income < ₹8 Lakhs/year"],
    tags: ["Women Only", "Technical Courses"],
  },
  {
    id: "s3",
    name: "Post Matric Scholarship for SC/ST",
    provider: "Govt. of India",
    amount: "Full Tuition + Maintenance",
    deadline: "December 31, 2026",
    category: "means",
    eligibility: ["SC/ST Category", "Family income < ₹2.5 Lakhs/year"],
    tags: ["SC/ST", "Need-Based"],
  },
  {
    id: "s4",
    name: "Reliance Foundation Undergraduate Scholarships",
    provider: "Reliance Foundation",
    amount: "Up to ₹2,00,000",
    deadline: "October 15, 2026",
    category: "merit",
    eligibility: ["12th pass with minimum 60%", "Enrolled in 1st year regular UG degree", "Family income < ₹15 Lakhs/year"],
    tags: ["Private", "All India"],
  },
  {
    id: "s5",
    name: "HDFC Badhte Kadam Scholarship",
    provider: "HDFC Bank",
    amount: "₹15,000 - ₹1,00,000",
    deadline: "September 30, 2026",
    category: "means",
    eligibility: ["Passed previous class with >60%", "Family income < ₹6 Lakhs/year", "Crisis/Hardship preference"],
    tags: ["Private", "Need-Based"],
  },
  {
    id: "s6",
    name: "Inspire Scholarship (SHE)",
    provider: "Department of Science & Technology",
    amount: "₹80,000 / year",
    deadline: "November 30, 2026",
    category: "merit",
    eligibility: ["Top 1% in 12th Board (State/Central)", "Pursuing B.Sc/M.Sc in Basic/Natural Sciences"],
    tags: ["Science", "Merit-Based"],
  },
  {
    id: "s7",
    name: "ONGC Foundation Scholarship",
    provider: "ONGC Foundation",
    amount: "₹48,000 / year",
    deadline: "January 15, 2027",
    category: "merit",
    eligibility: ["SC/ST/OBC or General Category", "1st year Engineering/MBBS/MBA", "Minimum 60% in 12th class", "Family income < ₹4.5 Lakhs/year"],
    tags: ["Engineering", "Corporate", "Merit-cum-Means"],
  },
  {
    id: "s8",
    name: "L'Oréal India For Young Women In Science",
    provider: "L'Oréal India",
    amount: "₹2,50,000",
    deadline: "July 15, 2026",
    category: "special",
    eligibility: ["Young women who have passed Class 12 in Science (PCM/PCB)", "Minimum 85% in Class 12", "Family income < ₹6 Lakhs/year"],
    tags: ["Women Only", "Science", "Corporate"],
  },
  {
    id: "s9",
    name: "Tata Trusts Medical and Engineering Scholarship",
    provider: "Tata Trusts",
    amount: "Partial or Full Tuition Coverage",
    deadline: "December 31, 2026",
    category: "merit",
    eligibility: ["Undergraduate students in Medical or Engineering", "Based purely on academic excellence and interview process"],
    tags: ["Private", "Engineering", "Medical"],
  },
  {
    id: "s10",
    name: "Keep India Smiling Foundation Scholarship",
    provider: "Colgate-Palmolive",
    amount: "₹30,000 - ₹50,000 / year",
    deadline: "August 31, 2026",
    category: "means",
    eligibility: ["Class 10/12 passed with minimum 60%", "Enrolled in UG/Engineering/Vocational courses", "Family income < ₹5 Lakhs/year"],
    tags: ["Corporate", "Need-Based"],
  },
  {
    id: "s11",
    name: "FEE (Foundation for Excellence) Scholarship",
    provider: "FFE Foundation",
    amount: "₹40,000 / year",
    deadline: "October 31, 2026",
    category: "means",
    eligibility: ["1st year B.E./B.Tech or MBBS", "Exceptional academic performance in Class 12", "Family income < ₹3 Lakhs/year"],
    tags: ["Engineering", "Medical", "Need-Based"],
  },
  {
    id: "s12",
    name: "Vidyadhan Scholarship",
    provider: "Shibulal Family Philanthropic Initiatives",
    amount: "₹10,000 - ₹60,000 / year",
    deadline: "June 30, 2026",
    category: "means",
    eligibility: ["Class 10th passed with >90%", "Family income < ₹2 Lakhs/year", "State specific selections"],
    tags: ["Merit-cum-Means", "State Specific"],
  }
];

export default function ScholarshipsPage() {
  const [income, setIncome] = useState("all");
  const [category, setCategory] = useState("all");
  const [type, setType] = useState("all");
  const [gender, setGender] = useState("all");

  const getApplyUrl = (scholarship: Scholarship) =>
    scholarship.applyUrl ?? `https://www.google.com/search?q=${encodeURIComponent(`${scholarship.name} scholarship apply`)}`;

  const filteredScholarships = SCHOLARSHIPS.filter((s) => {
    // Basic income filter mapping
    if (income === "low" && !s.eligibility.some(e => e.includes("Lakhs") || e.includes("Need"))) {
      if (s.category !== "means") return false;
    }
    
    // Category mapping
    if (category === "scst" && !s.tags.includes("SC/ST") && s.id !== "s7") return false;
    if (category === "obc" && !s.tags.includes("OBC") && s.id !== "s7" && s.id === "s3") return false;
    
    // Type mapping
    if (type !== "all" && s.category !== type && !s.tags.includes(type === "merit" ? "Merit-Based" : "Need-Based")) return false;

    // Gender mapping
    if (gender === "male" && s.tags.includes("Women Only")) return false; 

    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 min-h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="mb-12 flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="pt-2">
          <BackButton fallback="/" />
        </div>
        <div className="text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 font-label-caps text-label-caps uppercase tracking-widest text-emerald-400/80 ring-1 ring-emerald-500/20">
            <Sparkles size={12} /> Financial Aid Portal
          </div>
          <h1 className="font-display-xl text-[48px] sm:text-[64px] text-on-surface leading-[1.1]">
            Scholarship Matcher
          </h1>
          <p className="mt-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            Discover and track scholarships you are eligible for. Filter by income, category, and merit to find funding for your college education.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
        
        {/* Filters Sidebar */}
        <div className="glass-card rounded-[2rem] p-6 h-fit sticky top-24 shadow-[0_10px_40px_-15px_rgba(78,222,163,0.1)] border-white/[0.04]">
          <h2 className="font-headline-md text-xl text-on-surface mb-6 flex items-center gap-2">
            <Search size={18} className="text-primary" /> Filter Matches
          </h2>

          <div className="space-y-6">
            <div>
              <label className="mb-3 block font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">Family Income</label>
              <select 
                value={income} onChange={(e) => setIncome(e.target.value)}
                className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary/50"
              >
                <option value="all" className="bg-surface-deep">Any Income</option>
                <option value="low" className="bg-surface-deep">Below ₹2.5 Lakhs/year</option>
                <option value="medium" className="bg-surface-deep">₹2.5L - ₹8 Lakhs/year</option>
                <option value="high" className="bg-surface-deep">Above ₹8 Lakhs/year</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">Category</label>
              <select 
                value={category} onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary/50"
              >
                <option value="all" className="bg-surface-deep">General / All</option>
                <option value="obc" className="bg-surface-deep">OBC</option>
                <option value="scst" className="bg-surface-deep">SC / ST</option>
              </select>
            </div>
            
            <div>
              <label className="mb-3 block font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">Gender</label>
              <select 
                value={gender} onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary/50"
              >
                <option value="all" className="bg-surface-deep">All</option>
                <option value="female" className="bg-surface-deep">Female</option>
                <option value="male" className="bg-surface-deep">Male</option>
              </select>
            </div>

            <div>
              <label className="mb-3 block font-label-caps text-[11px] uppercase tracking-widest text-on-surface-variant/70">Scholarship Type</label>
              <div className="flex flex-col gap-2">
                {[
                  { id: "all", label: "All Types" },
                  { id: "merit", label: "Merit-Based" },
                  { id: "means", label: "Need-Based (Means)" },
                  { id: "special", label: "Special Criteria" },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setType(t.id)}
                    className={`rounded-xl px-4 py-2.5 font-label-caps text-[12px] uppercase tracking-widest text-left transition-all ${
                      type === t.id
                        ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                        : "glass-panel text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div>
          <div className="mb-6 flex items-end justify-between">
            <p className="font-body-md text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">{filteredScholarships.length}</span> matching scholarships
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 animate-fade-in-up">
            {filteredScholarships.map((scholarship) => (
              <div key={scholarship.id} className="group overflow-hidden rounded-2xl glass-card transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_10px_40px_-15px_rgba(78,222,163,0.15)] flex flex-col sm:flex-row">
                
                {/* Left block (Amount & Deadline) */}
                <div className="bg-white/[0.02] sm:w-56 p-6 flex flex-col justify-center border-b sm:border-b-0 sm:border-r border-white/[0.04]">
                  <p className="font-label-caps text-[10px] uppercase tracking-widest text-primary mb-1">Max Amount</p>
                  <p className="font-mono text-xl font-bold text-emerald-400 mb-6">{scholarship.amount}</p>
                  
                  <div className="mt-auto">
                    <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-1">Deadline</p>
                    <p className="font-body-sm font-semibold text-amber-400 flex items-center gap-1">
                      <AlertCircle size={12} /> {scholarship.deadline}
                    </p>
                  </div>
                </div>

                {/* Main Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {scholarship.tags.map(tag => (
                      <span key={tag} className="rounded-full bg-white/[0.04] px-2.5 py-1 font-label-caps text-[9px] uppercase tracking-widest text-on-surface-variant/80 ring-1 ring-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-headline-md text-xl text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {scholarship.name}
                  </h3>
                  <p className="font-body-md text-sm text-on-surface-variant flex items-center gap-1.5 mb-6">
                    <Banknote size={14} className="opacity-50" /> Provided by {scholarship.provider}
                  </p>

                  <div className="mt-auto">
                    <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-2">Eligibility Criteria</p>
                    <ul className="space-y-1.5">
                      {scholarship.eligibility.map((crit, idx) => (
                        <li key={idx} className="font-body-sm text-[13px] text-on-surface-variant flex items-start gap-2">
                          <span className="text-primary shrink-0 mt-0.5">•</span>
                          {crit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/[0.04] flex items-center justify-end">
                    <a
                      href={getApplyUrl(scholarship)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label-caps text-[12px] uppercase tracking-widest text-on-surface hover:text-primary transition-colors flex items-center gap-1.5"
                    >
                      View Details & Apply <span className="text-primary transition-transform group-hover:translate-x-1">→</span>
                    </a>
                  </div>
                </div>
                
              </div>
            ))}

            {filteredScholarships.length === 0 && (
              <div className="rounded-[2rem] glass-card p-16 text-center flex flex-col items-center justify-center">
                <AlertCircle size={40} className="text-on-surface-variant/50 mb-4" />
                <h3 className="font-headline-md text-[24px] text-on-surface mb-2">No scholarships found</h3>
                <p className="font-body-md text-on-surface-variant">Try adjusting your filters to see more results.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
