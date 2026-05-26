"use client";

import { useState } from "react";
import { ChevronRight, Calculator, ChevronDown, TrendingUp, MapPin, Sparkles } from "lucide-react";
import Link from "next/link";
import { formatFees, formatPackage } from "@/lib/utils";
import { getCollegeImage } from "@/lib/college-images";

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [percentile, setPercentile] = useState("");
  const [inputMode, setInputMode] = useState<"rank" | "percentile">("rank");
  const [category, setCategory] = useState("General");
  const [interest, setInterest] = useState("Computer Science and Engineering");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);
  const [expandedCollege, setExpandedCollege] = useState<string | null>(null);

  const exams = ["JEE Main", "JEE Advanced", "GATE", "CAT", "NEET", "CUET", "BITSAT", "State CET"];
  const categories = ["General", "OBC", "SC", "ST", "EWS"];
  const interests = [
    "Computer Science and Engineering",
    "Electronics and Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Data Science",
    "MBA",
  ];

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();

    let finalRank = rank;
    if (inputMode === "percentile" && percentile) {
      const pct = parseFloat(percentile);
      if (pct > 0 && pct <= 100) {
        finalRank = String(Math.round(((100 - pct) / 100) * 1200000));
        setRank(finalRank);
      }
    }

    if (!finalRank || parseInt(finalRank) <= 0) return;

    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(
        `/api/predictor?exam=${encodeURIComponent(exam)}&rank=${finalRank}&interest=${encodeURIComponent(interest)}&category=${encodeURIComponent(category)}`
      );
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const getChanceLevel = (closingRank: number, userRank: number) => {
    const ratio = userRank / closingRank;
    if (ratio <= 0.6) return { label: "High", color: "bg-emerald-500/20 text-emerald-400 ring-emerald-500/30", dot: "bg-emerald-400" };
    if (ratio <= 0.85) return { label: "Medium", color: "bg-amber-500/20 text-amber-400 ring-amber-500/30", dot: "bg-amber-400" };
    return { label: "Low", color: "bg-red-500/20 text-red-400 ring-red-500/30", dot: "bg-red-400" };
  };

  const totalEligible = results.length;
  const totalCourses = results.reduce((acc, r) => acc + r.courses.length, 0);
  const highChance = results.filter((r) => {
    const userRank = parseInt(rank);
    const bestCR = Math.min(...r.courses.map((c: any) => c.closingRank));
    return userRank / bestCR <= 0.6;
  }).length;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full glass-panel px-4 py-1.5 font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant/70">
          <Sparkles size={12} /> AI-Powered Predictions
        </div>
        <h1 className="font-display-xl text-[48px] sm:text-[64px] text-on-surface">
          College Predictor
        </h1>
        <p className="mx-auto mt-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Enter your exam, rank, and category to find colleges where you have a strong chance of admission based on historical cutoff data.
        </p>
      </div>

      {/* Prediction Form */}
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] glass-card shadow-[0_10px_40px_-15px_rgba(78,222,163,0.1)]">
        <form onSubmit={handlePredict} className="p-8 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Exam */}
            <div>
              <label className="mb-2 block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Exam</label>
              <select
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary/50"
              >
                {exams.map((e) => <option key={e} value={e} className="bg-surface-deep">{e}</option>)}
              </select>
            </div>

            {/* Rank / Percentile toggle */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                  {inputMode === "rank" ? "Your Rank" : "Your Percentile"}
                </label>
                <button
                  type="button"
                  onClick={() => setInputMode(inputMode === "rank" ? "percentile" : "rank")}
                  className="font-label-caps text-[9px] text-on-surface-variant/70 transition-colors hover:text-on-surface"
                >
                  Switch to {inputMode === "rank" ? "Percentile" : "Rank"}
                </button>
              </div>
              {inputMode === "rank" ? (
                <input
                  type="number"
                  placeholder="e.g. 15000"
                  value={rank}
                  onChange={(e) => setRank(e.target.value)}
                  min="1"
                  required
                  className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
                />
              ) : (
                <input
                  type="number"
                  placeholder="e.g. 98.5"
                  value={percentile}
                  onChange={(e) => setPercentile(e.target.value)}
                  min="0"
                  max="100"
                  step="0.01"
                  required
                  className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface placeholder:text-on-surface-variant/50 outline-none transition-all focus:ring-1 focus:ring-primary/50"
                />
              )}
            </div>

            {/* Category */}
            <div>
              <label className="mb-2 block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCategory(c)}
                    className={`rounded-full px-4 py-2 font-label-caps text-label-caps transition-all ${
                      category === c
                        ? "bg-primary text-background ring-1 ring-primary shadow-[0_0_15px_rgba(78,222,163,0.3)]"
                        : "glass-panel text-on-surface-variant hover:bg-white/[0.06] hover:text-on-surface"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Interest */}
            <div className="sm:col-span-2">
              <label className="mb-2 block font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Preferred Branch</label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-xl glass-panel px-4 py-3 font-body-md text-sm text-on-surface outline-none transition-all focus:ring-1 focus:ring-primary/50"
              >
                {interests.map((item) => <option key={item} value={item} className="bg-surface-deep">{item}</option>)}
              </select>
            </div>

            {/* Submit */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading || (!rank && !percentile)}
                className="flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 font-label-caps text-[13px] uppercase tracking-widest text-background transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(78,222,163,0.4)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? (
                  <span className="flex items-center gap-2"><span className="h-4 w-4 animate-spin rounded-full border-2 border-background/20 border-t-background" /> Predicting...</span>
                ) : (
                  <><Calculator size={16} /> Predict Colleges</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Summary Stats */}
      {searched && results.length > 0 && (
        <div className="mt-12 grid grid-cols-3 gap-4 animate-fade-in-up">
          <div className="rounded-2xl glass-card p-6 text-center">
            <p className="font-display-xl text-[32px] text-on-surface">{totalEligible}</p>
            <p className="mt-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Eligible Colleges</p>
          </div>
          <div className="rounded-2xl glass-card p-6 text-center">
            <p className="font-display-xl text-[32px] text-on-surface">{totalCourses}</p>
            <p className="mt-1 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Available Courses</p>
          </div>
          <div className="rounded-2xl glass-card border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="font-display-xl text-[32px] text-primary">{highChance}</p>
            <p className="mt-1 font-label-caps text-[10px] uppercase tracking-widest text-primary/80">High Chance</p>
          </div>
        </div>
      )}

      {/* Results */}
      {searched && (
        <div className="mt-12 animate-fade-in-up">
          <h2 className="mb-6 font-headline-md text-[24px] text-on-surface">
            {results.length > 0 ? "Your Predicted Colleges" : "No colleges found for this rank"}
          </h2>

          <div className="space-y-3">
            {results.map((result) => {
              const userRank = parseInt(rank);
              const bestCR = Math.min(...result.courses.map((c: any) => c.closingRank));
              const chance = getChanceLevel(bestCR, userRank);
              const isExpanded = expandedCollege === result.college.id;
              const imgUrl = getCollegeImage(result.college.slug);

              return (
                <div key={result.college.id} className="overflow-hidden rounded-2xl glass-card transition-all hover:border-primary/30">
                  {/* Main row */}
                  <div className="flex items-center gap-4 p-4 sm:p-5">
                    {/* College image/gradient */}
                    <div className="hidden h-16 w-16 flex-none overflow-hidden rounded-xl sm:block">
                      {imgUrl ? (
                        <img src={imgUrl} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full" style={{ background: `linear-gradient(135deg, ${result.college.gradientFrom}, ${result.college.gradientTo})` }} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <Link href={`/colleges/${result.college.slug}`} className="truncate font-headline-md text-[18px] text-on-surface transition-colors hover:text-primary">
                          {result.college.name}
                        </Link>
                        <span className={`flex-none rounded-full px-2.5 py-0.5 text-[10px] font-bold ring-1 ${chance.color}`}>
                          {chance.label}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-3 font-body-md text-[12px] text-on-surface-variant">
                        <span className="flex items-center gap-1"><MapPin size={10} /> {result.college.city}, {result.college.state}</span>
                        <span>·</span>
                        <span>{result.college.type}</span>
                        <span>·</span>
                        <span>{result.college.rating}★</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="hidden items-center gap-4 lg:flex">
                      <div className="text-right">
                        <p className="font-body-md font-semibold text-on-surface">{formatFees(result.college.annualFees)}</p>
                        <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Fees/yr</p>
                      </div>
                      <div className="text-right">
                        <p className="font-body-md font-semibold text-on-surface">{formatPackage(result.college.placements?.avgPackage ?? 0)}</p>
                        <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">Avg Pkg</p>
                      </div>
                    </div>

                    {/* Expand toggle */}
                    <button
                      onClick={() => setExpandedCollege(isExpanded ? null : result.college.id)}
                      className="flex-none rounded-lg glass-panel p-2 text-on-surface-variant transition-all hover:bg-white/[0.06] hover:text-on-surface"
                    >
                      <ChevronDown size={16} className={`transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                    </button>
                  </div>

                  {/* Expanded courses */}
                  {isExpanded && (
                    <div className="border-t border-white/[0.04] bg-surface-deep/30 p-4 sm:p-5 animate-fade-in">
                      <p className="mb-3 font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70">
                        Eligible Courses ({result.courses.length})
                      </p>
                      <div className="space-y-2">
                        {result.courses.map((c: any, i: number) => {
                          const courseChance = getChanceLevel(c.closingRank, userRank);
                          return (
                            <div key={i} className="flex items-center justify-between rounded-lg glass-panel px-4 py-3">
                              <span className="font-body-md text-[13px] text-on-surface">{c.name}</span>
                              <div className="flex items-center gap-3">
                                <span className="font-body-md text-[12px] text-on-surface-variant">Cutoff: {c.closingRank.toLocaleString()}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${courseChance.color}`}>
                                  {courseChance.label}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
