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
        const previous = get().savedIds;

        set((s) => {
          let next = [...s.savedIds];
          if (alreadySaved) {
            next = next.filter(id => id !== collegeId);
          } else {
            next.push(collegeId);
          }
          return { savedIds: next };
        });

        try {
          const res = await fetch("/api/saved", {
            method: alreadySaved ? "DELETE" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ collegeId }),
          });

          if (res.ok) return { ok: true, saved: !alreadySaved };

          if (res.status === 401) {
            return { ok: true, saved: !alreadySaved, message: "Saved locally. Login to sync across devices." };
          }

          set({ savedIds: previous });
          const body = await res.json().catch(() => ({}));
          return { ok: false, saved: alreadySaved, message: body?.error ?? "Could not update saved colleges" };
        } catch {
          set({ savedIds: previous });
          return { ok: false, saved: alreadySaved, message: "Network error while saving college" };
        }
      },
      isSaved: (id) => get().savedIds.includes(id),
      hydrate: (ids) => set({ savedIds: ids })
    }),
    { name: "saved-storage" }
  )
);
