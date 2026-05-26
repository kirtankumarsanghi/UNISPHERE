"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CompareCollege = { id: string; name: string; abbreviation: string };

type CompareState = {
  compareIds: string[];
  compareColleges: CompareCollege[];
  setCompare: (colleges: CompareCollege[]) => void;
  addToCompare: (college: CompareCollege) => { ok: boolean; message?: string };
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isInCompare: (id: string) => boolean;
};

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      compareIds: [],
      compareColleges: [],
      setCompare: (colleges) => {
        const unique = colleges
          .filter((c, index, arr) => arr.findIndex((x) => x.id === c.id) === index)
          .slice(0, 5);
        set({ compareIds: unique.map((c) => c.id), compareColleges: unique });
      },
      addToCompare: (college) => {
        const { compareIds, compareColleges } = get();
        if (compareIds.includes(college.id)) return { ok: true };
        if (compareIds.length >= 5) return { ok: false, message: "Max 5 colleges" };
        set({ compareIds: [...compareIds, college.id], compareColleges: [...compareColleges, college] });
        return { ok: true };
      },
      removeFromCompare: (id) => {
        set((s) => ({ compareIds: s.compareIds.filter((c) => c !== id), compareColleges: s.compareColleges.filter((c) => c.id !== id) }));
      },
      clearCompare: () => set({ compareIds: [], compareColleges: [] }),
      isInCompare: (id) => get().compareIds.includes(id)
    }),
    { name: "compare-storage" }
  )
);
