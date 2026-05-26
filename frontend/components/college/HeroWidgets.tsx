"use client";
import { ArrowUpRight, CheckCircle2, TrendingUp, Users } from "lucide-react";
import Image from "next/image";

export function HeroWidgets() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden sm:overflow-visible">
      {/* Widget 1: Prediction Match */}
      <div className="absolute -left-10 top-32 animate-float sm:left-[10%] sm:top-20 xl:left-[15%]">
        <div className="flex items-center gap-4 rounded-2xl bg-[#0F0F13]/80 p-4 shadow-2xl shadow-emerald-500/10 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 ring-1 ring-emerald-500/30">
            <CheckCircle2 size={24} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Match Found</p>
            <p className="font-display text-sm font-bold text-white">IIT Bombay • CSE</p>
            <p className="text-xs text-white/50">98% Acceptance Chance</p>
          </div>
        </div>
      </div>

      {/* Widget 2: Placement Stat */}
      <div
        className="absolute -right-5 bottom-40 animate-float sm:bottom-32 sm:right-[5%] xl:right-[15%]"
        style={{ animationDelay: "1s" }}
      >
        <div className="flex items-center gap-4 rounded-2xl bg-[#0F0F13]/80 p-4 shadow-2xl shadow-blue-500/10 ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/20 ring-1 ring-blue-500/30">
            <TrendingUp size={24} className="text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Avg. Package</p>
            <div className="flex items-end gap-2">
              <p className="font-display text-xl font-bold text-white">₹24.5L</p>
              <p className="mb-1 flex items-center text-[10px] font-bold text-emerald-400">
                +12% <ArrowUpRight size={12} />
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Widget 3: Live Community */}
      <div
        className="absolute left-10 bottom-20 hidden animate-float sm:block xl:left-[20%]"
        style={{ animationDelay: "2s" }}
      >
        <div className="flex items-center gap-3 rounded-2xl bg-[#0F0F13]/80 p-3 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-8 w-8 rounded-full bg-white/10 ring-2 ring-[#0F0F13]" />
            ))}
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white/90">2.4k+ Students</p>
            <p className="text-[9px] text-white/50">Online right now</p>
          </div>
        </div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute left-1/4 top-1/3 -z-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-[120px]" />
      <div className="absolute right-1/4 top-1/2 -z-10 h-64 w-64 rounded-full bg-blue-500/20 blur-[120px]" />
    </div>
  );
}
