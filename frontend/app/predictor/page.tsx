"use client";

import { useState } from "react";
import { Search, ChevronRight, Calculator } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { CollegeCard } from "@/components/college/CollegeCard";

export default function PredictorPage() {
  const [exam, setExam] = useState("JEE Main");
  const [rank, setRank] = useState("");
  const [interest, setInterest] = useState("Computer Science and Engineering");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [searched, setSearched] = useState(false);

  const exams = ["JEE Main", "JEE Advanced", "GATE", "CAT", "NEET", "CUET", "BITSAT", "State CET"];
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
    if (!rank || parseInt(rank) <= 0) return;
    
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/predictor?exam=${encodeURIComponent(exam)}&rank=${rank}&interest=${encodeURIComponent(interest)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 text-center">
        <div className="mx-auto mb-4 inline-flex items-center justify-center rounded-full bg-accent/10 p-4 text-accent">
          <Calculator size={32} />
        </div>
        <h1 className="font-syne text-4xl font-extrabold tracking-tight">College Predictor</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Enter your exam and rank to find colleges and courses where you have a strong chance of admission based on historical cutoff data.
        </p>
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-xl">
        <form onSubmit={handlePredict} className="grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto]">
          <div>
            <label className="mb-2 block text-sm font-semibold">Select Exam</label>
            <select
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {exams.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Your Rank</label>
            <Input
              type="number"
              placeholder="e.g. 15000"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              min="1"
              required
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold">Your Interest</label>
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {interests.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={loading || !rank || !interest}
              className="flex h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 font-semibold text-white transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 md:w-auto"
            >
              {loading ? "Predicting..." : "Predict"} <ChevronRight size={16} />
            </button>
          </div>
        </form>
      </div>

      {searched && (
        <div className="mt-16">
          <h2 className="mb-6 font-syne text-2xl font-bold tracking-tight">
            {results.length > 0 ? "Recommended Colleges for You" : "No colleges found for this rank"}
          </h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <div key={result.college.id} className="relative group">
                <CollegeCard college={result.college} />
                <div className="absolute left-0 right-0 top-[105%] z-10 hidden rounded-xl border border-border bg-surface p-4 shadow-xl group-hover:block">
                  <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted">Eligible Courses (Cutoff Rank)</p>
                  <ul className="space-y-1 text-sm">
                    {result.courses.map((c: any, i: number) => (
                      <li key={i} className="flex justify-between border-b border-border/50 py-1 last:border-0">
                        <span className="truncate pr-4 text-text">{c.name}</span>
                        <span className="font-semibold text-accent3">{c.closingRank}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
