export type FAQCategory = "admissions" | "placements" | "campus" | "fees" | "exams";

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
};

export const faqCategories: { key: FAQCategory; label: string }[] = [
  { key: "admissions", label: "Admissions" },
  { key: "placements", label: "Placements" },
  { key: "campus", label: "Campus Life" },
  { key: "fees", label: "Fees & Aid" },
  { key: "exams", label: "Exams" },
];

export const faqData: FAQItem[] = [
  // ADMISSIONS
  {
    id: "faq-1",
    question: "What is the difference between JEE Main and JEE Advanced?",
    answer:
      "JEE Main is the first stage conducted by NTA for admission to NITs, IIITs, and other centrally funded institutions. JEE Advanced is the second stage, conducted by one of the IITs on a rotational basis, exclusively for admission to 23 IITs. Only the top 2,50,000 JEE Main qualifiers are eligible to appear for JEE Advanced. JEE Main uses MCQ and numerical-type questions, while JEE Advanced has more complex multi-answer and matrix-match questions.",
    category: "admissions",
  },
  {
    id: "faq-2",
    question: "How does the JoSAA counselling process work?",
    answer:
      "JoSAA (Joint Seat Allocation Authority) conducts centralized counselling for IITs, NITs, IIITs, and GFTIs. After JEE results, you register on the JoSAA portal, fill your choices (college + branch combinations), and the system allocates seats through multiple rounds based on your rank, category, and preferences. There are typically 6 regular rounds + 2 special rounds. You can accept a seat in one round and still upgrade in subsequent rounds through the 'float' or 'slide' option.",
    category: "admissions",
  },
  {
    id: "faq-3",
    question: "Can I get into a top NIT with a JEE Main rank of 20,000?",
    answer:
      "With a General category rank around 20,000 in JEE Main, you can expect admission to mid-tier NITs like NIT Jaipur, NIT Allahabad, or NIT Nagpur in popular branches like CSE or ECE. For top NITs (Trichy, Surathkal, Warangal), you'd typically need a rank under 5,000 for CSE. However, if you're open to branches like Civil, Chemical, or Mining Engineering, a rank of 20,000 can still get you into several top NITs. OBC/SC/ST candidates get seats at much higher ranks due to reservation.",
    category: "admissions",
  },
  {
    id: "faq-4",
    question: "Is BITS Pilani better than lower-ranked IITs?",
    answer:
      "BITS Pilani (Pilani campus) is often compared to IITs ranked 10-15. BITS offers a unique flexible curriculum with no attendance requirements, a strong practice school program (6-month industry internship), and excellent placements especially in CS and ECE. However, IITs generally have better research infrastructure, government funding, brand recognition for higher studies abroad, and the IIT tag which carries significant weight. The choice depends on your priorities — if you value academic freedom and industry exposure, BITS is excellent; if you value research and the IIT brand, even newer IITs can be worthwhile.",
    category: "admissions",
  },

  // PLACEMENTS
  {
    id: "faq-5",
    question: "What is the average placement package at IITs vs NITs?",
    answer:
      "Top IITs (Bombay, Delhi, Madras, Kanpur, Kharagpur) have average packages of ₹20-30 LPA with highest packages exceeding ₹2 Crore (international offers). Newer IITs average around ₹12-18 LPA. Top NITs (Trichy, Surathkal, Warangal) offer averages of ₹12-18 LPA, while other NITs range from ₹6-12 LPA. Note that these are averages — CS/IT branches typically get 1.5-2x the overall average, while some branches like Civil or Mining may get lower. Also, median package is often a better indicator than average, as a few extremely high offers can skew the mean.",
    category: "placements",
  },
  {
    id: "faq-6",
    question: "Which branch has the best placement prospects?",
    answer:
      "Computer Science and Engineering (CSE) consistently leads in placements across all college tiers, with the highest packages and most offers. Electronics & Communication (ECE) follows closely, especially in VLSI and embedded systems roles. Data Science / AI & ML branches are rapidly growing. However, branch matters less at top IITs where even Mechanical or Civil graduates get placed in IT/consulting roles. At NITs and below, branch choice significantly impacts placement outcomes. Trending fields: AI/ML, Cloud Computing, Cybersecurity, and Quantitative Finance.",
    category: "placements",
  },
  {
    id: "faq-7",
    question: "Do companies prefer IIT graduates over NIT graduates?",
    answer:
      "Many top companies (Google, Microsoft, Goldman Sachs, etc.) recruit from both IITs and top NITs. However, some exclusive recruiters like certain quant firms, hedge funds, and premium consulting firms only visit IITs. The IIT brand does carry more weight in the initial career phase and for global opportunities. That said, after 3-5 years of experience, your skills and track record matter far more than your college tag. Many NIT graduates outperform IIT graduates in the long run through skill development and work experience.",
    category: "placements",
  },

  // CAMPUS LIFE
  {
    id: "faq-8",
    question: "What is hostel life like at IITs and NITs?",
    answer:
      "Most IITs and NITs have mandatory on-campus hostels for the first year, and many extend this to all four years. Rooms are typically shared (2-3 per room) in the first year, with single rooms available from the second year at some colleges. Hostel facilities vary — older IITs like Kharagpur and Madras have sprawling green campuses, while newer ones may have more modern but compact facilities. Messes serve vegetarian and non-vegetarian options. Hostels are the center of social life — late-night coding sessions, fest preparations, and lifelong friendships happen here.",
    category: "campus",
  },
  {
    id: "faq-9",
    question: "How are technical fests and cultural events at engineering colleges?",
    answer:
      "IITs host some of India's largest college fests. IIT Bombay's Techfest and Mood Indigo, IIT Delhi's Rendezvous, IIT Kharagpur's Spring Fest, and IIT Madras's Saarang attract 50,000-1,00,000+ footfall. NITs have similarly vibrant fests. These events feature technical competitions, hackathons, guest lectures by industry leaders, cultural performances, and pro-nights with major artists. Active participation in fests builds project management, leadership, and networking skills that are highly valued by recruiters.",
    category: "campus",
  },
  {
    id: "faq-10",
    question: "Are there good sports and extracurricular facilities?",
    answer:
      "Top IITs have Olympic-sized swimming pools, cricket grounds, football fields, tennis courts, badminton courts, and gyms. Inter-IIT Sports Meet is an annual competition. Many colleges also have active clubs for robotics, astronomy, debate, music, dance, photography, and entrepreneurship. NITs generally have good sports infrastructure too, though it varies by campus age and location. Participation in extracurriculars is strongly encouraged — many placement interviews specifically ask about non-academic achievements.",
    category: "campus",
  },

  // FEES
  {
    id: "faq-11",
    question: "What is the total cost of a B.Tech at an IIT?",
    answer:
      "Annual tuition at IITs is approximately ₹2-2.5 Lakhs, with hostel, mess, and other fees adding another ₹1-1.5 Lakhs per year. Total 4-year cost: approximately ₹12-16 Lakhs. SC/ST students get a full tuition fee waiver and additional scholarships. Students from families earning below ₹5 LPA per year can get full fee waivers through the MCM (Merit-cum-Means) scholarship. Many banks offer education loans at subsidized rates for IIT students. Considering the average placement of ₹20+ LPA, the ROI is among the best in Indian higher education.",
    category: "fees",
  },
  {
    id: "faq-12",
    question: "How do private college fees compare to government institutions?",
    answer:
      "Government IITs/NITs charge ₹2-3 Lakhs/year. Top private colleges like BITS Pilani charge ₹5-6 Lakhs/year, VIT and SRM charge ₹2-4 Lakhs/year, and Manipal charges ₹4-5 Lakhs/year. Some private deemed universities can charge ₹8-15 Lakhs/year. Management quota seats in private colleges can cost ₹15-40 Lakhs for the full program. When comparing, factor in placement outcomes — a government college at ₹10L total cost with ₹15 LPA average package is a much better ROI than a private college at ₹25L total cost with ₹6 LPA average.",
    category: "fees",
  },
  {
    id: "faq-13",
    question: "What scholarships are available for engineering students?",
    answer:
      "Major scholarships include: AICTE Pragati (for girls, ₹50,000/year), AICTE Saksham (for disabled, ₹50,000/year), Central Sector Scheme (₹20,000/year), NSP Merit Scholarships, and state-level scholarships. IITs offer MCM scholarships covering full tuition for economically weaker students. Many private companies (Reliance, Tata, Infosys Foundation) also offer merit-based scholarships. Additionally, most colleges have fee waiver programs for students from families below a certain income threshold.",
    category: "fees",
  },

  // EXAMS
  {
    id: "faq-14",
    question: "How should I prepare for JEE Main in the last 3 months?",
    answer:
      "Focus on: (1) Completing the syllabus — don't start new topics, strengthen what you know. (2) Solve previous year papers (2019-2024) — NTA often repeats concepts. (3) Take full-length mock tests every 2-3 days to build stamina and time management. (4) Revise formulas and shortcuts daily using flashcards. (5) Focus on high-weightage chapters: Mechanics, Electrostatics, Organic Chemistry, Coordinate Geometry, Calculus. (6) Don't neglect easier sections — securing marks in easy questions is more important than solving tough ones. (7) Maintain health — sleep 7+ hours and exercise regularly.",
    category: "exams",
  },
  {
    id: "faq-15",
    question: "Is coaching necessary for cracking JEE?",
    answer:
      "Coaching is not strictly necessary but is highly recommended for most students. About 90% of IIT qualifiers take some form of coaching (offline or online). However, multiple toppers have cracked JEE through self-study using resources like NCERT, HC Verma, Irodov, and free YouTube lectures. Online platforms like Unacademy, Physics Wallah, and BYJU's offer affordable alternatives to expensive offline coaching. The key factors are: consistent self-study (4-6 hours daily), solving a high volume of problems, and regular mock tests — whether you do this through coaching or independently.",
    category: "exams",
  },
  {
    id: "faq-16",
    question: "What are the important dates for JEE 2025-2026?",
    answer:
      "JEE Main is typically conducted in two sessions: Session 1 in January and Session 2 in April. JEE Advanced usually takes place in late May or early June. JoSAA counselling begins immediately after JEE Advanced results, typically in June-July. Registration for JEE Main opens 2-3 months before the exam on the NTA website (jeemain.nta.nic.in). Always check the official NTA website for exact dates as they may change. BITSAT is usually held in May, and state CETs (MHT-CET, KCET, etc.) are held between April-June.",
    category: "exams",
  },
  {
    id: "faq-17",
    question: "How is the NIRF ranking calculated?",
    answer:
      "NIRF (National Institutional Ranking Framework) uses 5 parameters: Teaching, Learning & Resources (TLR) — 30%, Research and Professional Practice (RP) — 30%, Graduation Outcomes (GO) — 20% (includes placements and higher education), Outreach and Inclusivity (OI) — 10%, and Perception (PR) — 10%. Colleges self-report data which is verified by NIRF. While NIRF is the most widely recognized Indian ranking, it has limitations — it favors older, larger institutions and the 'Perception' parameter can be subjective. Use it as one factor among many when choosing a college.",
    category: "exams",
  },
];
