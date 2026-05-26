"use client";
import { useState } from "react";
import { ArrowRight, BrainCircuit, CheckCircle2, ChevronLeft, RefreshCw, Trophy, Target, Banknote, MapPin } from "lucide-react";
import Link from "next/link";
import { fallbackColleges } from "@/lib/fallback-colleges";
import { CollegeCard } from "@/components/college/CollegeCard";

type QuizState = {
  step: number;
  type: string | null;
  budget: string | null;
  state: string | null;
  degree: string | null;
  difficulty: string | null;
};

export default function QuizPage() {
  const [state, setState] = useState<QuizState>({
    step: 0,
    type: null,
    budget: null,
    state: null,
    degree: null,
    difficulty: null,
  });

  const [results, setResults] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);

  const steps = [
    {
      title: "What type of institution are you aiming for?",
      field: "type",
      options: [
        { id: "IIT", label: "IITs", desc: "The premier engineering institutes", icon: Trophy },
        { id: "NIT", label: "NITs / IIITs", desc: "Top-tier national institutes", icon: Target },
        { id: "PRIVATE", label: "Top Private", desc: "Leading private universities", icon: BrainCircuit },
        { id: "ANY", label: "No Preference", desc: "Show me the best overall", icon: CheckCircle2 },
      ]
    },
    {
      title: "What is your comfortable annual fee budget?",
      field: "budget",
      options: [
        { id: "LOW", label: "Under ₹2 Lakhs", desc: "Most Govt. institutes with fee waivers", icon: Banknote },
        { id: "MED", label: "₹2 - ₹5 Lakhs", desc: "Standard fees for NITs/IITs", icon: Banknote },
        { id: "HIGH", label: "Above ₹5 Lakhs", desc: "Premium private institutions", icon: Banknote },
        { id: "ANY", label: "No Constraint", desc: "Budget is not an issue", icon: Banknote },
      ]
    },
    {
      title: "Pick your preferred degree program",
      field: "degree",
      options: [
        { id: "B.Tech", label: "B.Tech", desc: "Engineering undergraduate", icon: GraduationCap },
        { id: "B.E.", label: "B.E.", desc: "Engineering undergraduate", icon: GraduationCap },
        { id: "MBA", label: "MBA", desc: "Management postgraduate", icon: GraduationCap },
        { id: "B.Sc", label: "B.Sc", desc: "Science undergraduate", icon: GraduationCap },
        { id: "BCA", label: "BCA", desc: "Computer applications", icon: GraduationCap },
        { id: "ANY", label: "No Preference", desc: "Show all programs", icon: CheckCircle2 },
      ]
    },
    {
      title: "Which state do you prefer?",
      field: "state",
      options: [
        { id: "ANY", label: "Anywhere", desc: "No state preference", icon: MapPin },
        { id: "Delhi", label: "Delhi", desc: "National Capital Region", icon: MapPin },
        { id: "Uttar Pradesh", label: "Uttar Pradesh", desc: "North India", icon: MapPin },
        { id: "Maharashtra", label: "Maharashtra", desc: "West India", icon: MapPin },
        { id: "Karnataka", label: "Karnataka", desc: "South India", icon: MapPin },
        { id: "Tamil Nadu", label: "Tamil Nadu", desc: "South India", icon: MapPin },
        { id: "Telangana", label: "Telangana", desc: "South India", icon: MapPin },
        { id: "Gujarat", label: "Gujarat", desc: "West India", icon: MapPin },
        { id: "Rajasthan", label: "Rajasthan", desc: "West India", icon: MapPin },
        { id: "Madhya Pradesh", label: "Madhya Pradesh", desc: "Central India", icon: MapPin },
        { id: "West Bengal", label: "West Bengal", desc: "East India", icon: MapPin },
        { id: "Bihar", label: "Bihar", desc: "East India", icon: MapPin },
        { id: "Odisha", label: "Odisha", desc: "East India", icon: MapPin },
        { id: "Andhra Pradesh", label: "Andhra Pradesh", desc: "South India", icon: MapPin },
        { id: "Kerala", label: "Kerala", desc: "South India", icon: MapPin },
        { id: "Punjab", label: "Punjab", desc: "North India", icon: MapPin },
        { id: "Haryana", label: "Haryana", desc: "North India", icon: MapPin },
        { id: "Uttarakhand", label: "Uttarakhand", desc: "North India", icon: MapPin },
        { id: "Jharkhand", label: "Jharkhand", desc: "East India", icon: MapPin },
        { id: "Assam", label: "Assam", desc: "North East", icon: MapPin },
        { id: "Chhattisgarh", label: "Chhattisgarh", desc: "Central India", icon: MapPin },
        { id: "Himachal Pradesh", label: "Himachal Pradesh", desc: "North India", icon: MapPin },
        { id: "Goa", label: "Goa", desc: "West India", icon: MapPin },
      ]
    }
  ];

  const handleNext = async (field: keyof QuizState, value: string) => {
    const newState = { ...state, [field]: value, step: state.step + 1 };
    setState(newState);

    if (newState.step === steps.length) {
      setLoading(true);
      try {
        const pool = await fetchMatchedColleges(newState);
        setResults(pool.slice(0, 3));
      } catch {
        const pool = filterFallbackColleges(newState);
        setResults(pool.slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
  };

  const reset = () => {
    setState({ step: 0, type: null, budget: null, state: null, degree: null, difficulty: null });
    setResults(null);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg-base py-12 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 ring-1 ring-primary/20">
            <BrainCircuit size={24} className="text-primary" />
          </div>
          <h1 className="font-headline-lg text-[32px] sm:text-[40px] text-on-surface">College Match Quiz</h1>
          <p className="mt-3 font-body-md text-[15px] text-on-surface-variant">Answer 3 quick questions to discover your personalized top college matches.</p>
        </div>

        {/* Quiz Container */}
        <div className="relative mx-auto max-w-2xl overflow-hidden rounded-[2rem] glass-card p-6 sm:p-10">
          
          {/* Progress Bar */}
          {!results && !loading && (
            <div className="mb-8 flex items-center justify-between gap-4">
              <div className="flex flex-1 gap-2">
                {steps.map((_, i) => (
                  <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i <= state.step ? "bg-primary" : "bg-white/10"}`} />
                ))}
              </div>
              <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">STEP {state.step + 1}/{steps.length}</span>
            </div>
          )}

          {/* Loader */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in-up">
              <div className="relative mb-6 h-16 w-16">
                <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                <div className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-t-primary border-r-primary" />
                <BrainCircuit size={24} className="absolute inset-0 m-auto text-primary" />
              </div>
              <h3 className="font-headline-md text-[20px] text-on-surface">Analyzing your profile...</h3>
              <p className="mt-2 font-body-md text-[14px] text-on-surface-variant/70">Matching against 170+ top institutions</p>
            </div>
          )}

          {/* Steps */}
          {!loading && !results && state.step < steps.length && (
            <div className="animate-fade-in-up">
              <h2 className="mb-6 font-headline-md text-[24px] text-on-surface">{steps[state.step].title}</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {steps[state.step].options.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => handleNext(steps[state.step].field as keyof QuizState, opt.id)}
                    className="group relative flex flex-col items-start gap-3 rounded-[2rem] glass-panel p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-primary/10 hover:ring-primary/30 hover:shadow-[0_0_20px_rgba(78,222,163,0.1)]"
                  >
                    <div className="rounded-xl bg-white/5 p-2.5 transition-colors group-hover:bg-primary/20 group-hover:text-primary">
                      <opt.icon size={18} />
                    </div>
                    <div>
                      <h4 className="font-headline-md text-[18px] text-on-surface transition-colors group-hover:text-primary">{opt.label}</h4>
                      <p className="mt-1 font-body-md text-[12px] leading-relaxed text-on-surface-variant">{opt.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
              {state.step > 0 && (
                <button
                  onClick={() => setState({ ...state, step: state.step - 1 })}
                  className="mt-8 flex items-center gap-2 font-label-caps text-[12px] uppercase tracking-widest text-on-surface-variant hover:text-on-surface"
                >
                  <ChevronLeft size={16} /> Back
                </button>
              )}
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="animate-fade-in-up">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full bg-emerald-500/20 p-3 text-emerald-400 ring-1 ring-emerald-500/30">
                  <CheckCircle2 size={32} />
                </div>
                <h2 className="font-headline-lg text-[32px] text-on-surface">Your Top Matches</h2>
                <p className="mt-2 font-body-md text-on-surface-variant">Based on your preferences, here are the best fits.</p>
              </div>

              {results.length > 0 ? (
                <div className="space-y-4">
                  {results.map((college, idx) => (
                    <div key={college.id} className="relative overflow-hidden rounded-[2rem] glass-card p-1 transition-all hover:ring-white/20">
                      {idx === 0 && (
                        <div className="absolute -right-12 top-6 rotate-45 bg-amber-500 px-12 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-950 shadow-lg z-10">
                          #1 Match
                        </div>
                      )}
                      <CollegeCard college={college} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-[2rem] glass-card p-12 text-center">
                  <p className="font-body-md text-on-surface-variant">No perfect matches found for that exact combination.</p>
                  <p className="mt-2 font-body-md text-[14px] text-on-surface-variant/70">Try broadening your budget or location preferences.</p>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <button
                  onClick={reset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl glass-panel px-6 py-3 font-label-caps text-[12px] uppercase tracking-widest text-on-surface hover:bg-white/10"
                >
                  <RefreshCw size={16} /> Retake Quiz
                </button>
                <Link
                  href="/predictor"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 font-label-caps text-[12px] uppercase tracking-widest text-background font-bold hover:bg-primary/90"
                >
                  Try Advanced Predictor <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

const filterByState = (colleges: any[], state: string | null) => {
  if (!state || state === "ANY") return colleges;
  return colleges.filter((c) => String(c.state ?? "").includes(state));
};

const filterByType = (colleges: any[], type: string | null) => {
  if (!type || type === "ANY") return colleges;
  if (type === "NIT") return colleges.filter((c) => c.type === "NIT" || c.type === "IIIT");
  return colleges.filter((c) => c.type === type);
};

const filterByBudget = (colleges: any[], budget: string | null) => {
  if (!budget || budget === "ANY") return colleges;
  if (budget === "LOW") return colleges.filter((c) => c.annualFees <= 200000);
  if (budget === "MED") return colleges.filter((c) => c.annualFees > 200000 && c.annualFees <= 500000);
  if (budget === "HIGH") return colleges.filter((c) => c.annualFees > 500000);
  return colleges;
};

const filterByDegree = (colleges: any[], degree: string | null) => {
  if (!degree || degree === "ANY") return colleges;
  return colleges.filter((c) => Array.isArray(c.courses) && c.courses.some((course: any) => String(course.degree ?? "").includes(degree)));
};

const fetchMatchedColleges = async (state: QuizState) => {
  const params = new URLSearchParams();
  params.set("sortBy", "rating");
  params.set("order", "desc");
  params.set("limit", "50");

  if (state.type && state.type !== "ANY" && state.type !== "NIT") {
    params.set("type", state.type);
  }

  if (state.budget && state.budget !== "ANY") {
    if (state.budget === "LOW") params.set("maxFees", "200000");
    if (state.budget === "MED") {
      params.set("minFees", "200001");
      params.set("maxFees", "500000");
    }
    if (state.budget === "HIGH") params.set("minFees", "500001");
  }

  if (state.degree && state.degree !== "ANY") {
    params.set("degree", state.degree);
  }

  if (state.state && state.state !== "ANY") {
    params.set("state", state.state);
  }

  const res = await fetch(`/api/colleges?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch colleges");
  const data = await res.json();
  const colleges = Array.isArray(data?.colleges) ? data.colleges : [];
  const withType = filterByType(colleges, state.type);
  const withBudget = filterByBudget(withType, state.budget);
  const withDegree = filterByDegree(withBudget, state.degree);
  const withState = filterByState(withDegree, state.state);
  return withState.sort((a, b) => b.rating - a.rating);
};

const filterFallbackColleges = (state: QuizState) => {
  const withType = filterByType(fallbackColleges, state.type);
  const withBudget = filterByBudget(withType, state.budget);
  const withDegree = filterByDegree(withBudget, state.degree);
  const withState = filterByState(withDegree, state.state);
  return withState.sort((a, b) => b.rating - a.rating);
};
