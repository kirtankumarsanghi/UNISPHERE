"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CompareCollege = { id: string; name: string; abbreviation: string };

type CompareState = {
  compareIds: string[];
  compareColleges: CompareCollege[];
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
      addToCompare: (college) => {
        const { compareIds, compareColleges } = get();
        if (compareIds.includes(college.id)) return { ok: true };
        if (compareIds.length >= 3) return { ok: false, message: "Max 3 colleges" };
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