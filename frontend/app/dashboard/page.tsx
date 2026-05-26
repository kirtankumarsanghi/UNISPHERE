import { Bookmark, Calendar, CheckCircle2, ChevronRight, Clock, FileText, Settings, Target, TrendingUp, BrainCircuit, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getFallbackColleges } from "@/lib/fallback-loader";
import { CollegeCard } from "@/components/college/CollegeCard";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";

export default async function DashboardPage() {
  const allColleges = await getFallbackColleges();
  const savedColleges = allColleges.slice(0, 3); // Mock saved
  const recommendations = allColleges.slice(5, 7); // Mock recommendations

  const applications = [
    { id: 1, name: "IIT Bombay", course: "B.Tech Computer Science", status: "Submitted", date: "Oct 15", icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { id: 2, name: "NIT Trichy", course: "B.Tech ECE", status: "In Progress", date: "Due Nov 1", icon: Clock, color: "text-amber-400", bg: "bg-amber-500/10" },
    { id: 3, name: "BITS Pilani", course: "B.E. Computer Science", status: "Not Started", date: "Opens Dec", icon: FileText, color: "text-blue-400", bg: "bg-blue-500/10" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-bg-base">
      {/* Top Banner */}
      <div className="glass-card rounded-none border-b-0 border-white/5 bg-bg-base/60 backdrop-blur-2xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-gradient-to-tr from-primary to-emerald-500 p-[2px]">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#0F0F13] text-xl font-bold text-white">
                KS
              </div>
            </div>
            <div>
              <h1 className="font-headline-lg text-[32px] text-on-surface">Welcome back, Kirtan!</h1>
              <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70 mt-1">JEE Mains Target: 99.5 %ile</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="rounded-xl glass-panel p-3 text-on-surface-variant hover:text-on-surface">
              <Settings size={18} />
            </button>
            <Link href="/quiz" className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-label-caps text-[12px] uppercase tracking-widest text-background hover:bg-primary/90 transition-colors">
              <Target size={16} /> Update Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Saved Colleges", val: "12", icon: Bookmark, color: "text-violet-400" },
                { label: "Active Apps", val: "3", icon: FileText, color: "text-blue-400" },
                { label: "Top Match", val: "94%", icon: TrendingUp, color: "text-emerald-400" },
                { label: "Deadlines", val: "2", icon: Calendar, color: "text-amber-400" },
              ].map((stat, i) => (
                <div key={i} className="rounded-[2rem] glass-card p-6">
                  <div className={`mb-3 inline-flex rounded-xl glass-panel p-2.5 ${stat.color}`}>
                    <stat.icon size={18} />
                  </div>
                  <p className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant/70 mb-1">{stat.label}</p>
                  <p className="font-headline-md text-[24px] text-on-surface">{stat.val}</p>
                </div>
              ))}
            </div>

            {/* Application Tracker */}
            <div className="rounded-[2rem] glass-card overflow-hidden">
              <div className="border-b border-white/[0.04] p-6 flex items-center justify-between">
                <h2 className="font-headline-md text-[20px] text-on-surface">Application Tracker</h2>
                <button className="font-label-caps text-[10px] uppercase tracking-widest text-primary hover:text-primary/80">View All</button>
              </div>
              <div className="divide-y divide-white/[0.04]">
                {applications.map((app) => (
                  <div key={app.id} className="p-6 flex items-center justify-between group hover:bg-white/[0.02] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${app.bg} ${app.color}`}>
                        <app.icon size={18} />
                      </div>
                      <div>
                        <h3 className="font-body-md font-semibold text-on-surface">{app.name}</h3>
                        <p className="font-body-md text-[12px] text-on-surface-variant">{app.course}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-4">
                      <div className="hidden sm:block">
                        <p className={`font-label-caps text-[10px] uppercase tracking-widest ${app.color}`}>{app.status}</p>
                        <p className="font-body-md text-[11px] text-on-surface-variant/70 mt-0.5">{app.date}</p>
                      </div>
                      <ChevronRight size={16} className="text-on-surface-variant/50 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Application Pipeline Kanban */}
            <KanbanBoard initialColleges={allColleges.slice(0, 6)} />

          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Action Card */}
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary/80 to-emerald-600 p-8 ring-1 ring-primary/30 shadow-[0_0_30px_rgba(78,222,163,0.15)]">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
              <BrainCircuit size={32} className="mb-4 text-white" />
              <h3 className="font-headline-md text-[24px] text-white">Chances Updated</h3>
              <p className="mt-2 font-body-md text-[14px] text-white/90">We've recalculated your admission chances based on the latest 2024 cutoff releases.</p>
              <Link href="/predictor" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 font-label-caps text-[12px] uppercase tracking-widest text-primary font-bold transition-colors hover:bg-white/90">
                Check My Chances <ArrowRight size={16} />
              </Link>
            </div>

            {/* For You / Recommendations */}
            <div className="rounded-[2rem] glass-card p-6">
              <h2 className="mb-6 font-headline-md text-[20px] text-on-surface">Recommended for You</h2>
              <div className="space-y-4">
                {recommendations.map((college) => (
                  <div key={college.id} className="flex gap-4 group cursor-pointer">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-bg-surface ring-1 ring-white/10">
                      {/* Using fallback div if image not available in this simplified view */}
                      <div className="flex h-full w-full items-center justify-center font-bold text-text-muted text-xs bg-white/[0.02]">
                        {college.abbreviation || college.name.substring(0,3)}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-body-md font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-1">{college.name}</h4>
                      <p className="font-body-md text-[12px] text-on-surface-variant mt-0.5">{college.city}, {college.state}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 font-label-caps text-[9px] uppercase tracking-widest text-primary">92% Match</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
