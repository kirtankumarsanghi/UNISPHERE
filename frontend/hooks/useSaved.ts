"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type SavedState = {
  savedIds: string[];
  toggleSave: (collegeId: string) => Promise<{ ok: boolean; saved: boolean; message?: string }>;
  isSaved: (id: string) => boolean;
  hydrate: (ids: string[]) => void;
};

export const useSaved = create<SavedState>()(
  persist(
    (set, get) => ({
      savedIds: [],
      toggleSave: async (collegeId) => {
        const alreadySaved = get().savedIds.includes(collegeId);

        set((s) => {
          let next = [...s.savedIds];
          if (alreadySaved) {
            next = next.filter(id => id !== collegeId);
          } else {
            next.push(collegeId);
          }
          return { savedIds: next };
        });

        // Offline mode: always return success
        return { ok: true, saved: !alreadySaved };
      },
      isSaved: (id) => get().savedIds.includes(id),
      hydrate: (ids) => set({ savedIds: ids })
    }),
    { name: "saved-storage" }
  )
);