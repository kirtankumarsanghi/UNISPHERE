"use client";
import { create } from "zustand";

type SavedState = {
  savedIds: Set<string>;
  toggleSave: (collegeId: string) => Promise<{ ok: boolean; saved: boolean; message?: string }>;
  isSaved: (id: string) => boolean;
  hydrate: (ids: string[]) => void;
};

export const useSaved = create<SavedState>((set, get) => ({
  savedIds: new Set<string>(),
  toggleSave: async (collegeId) => {
    const alreadySaved = get().savedIds.has(collegeId);

    set((s) => {
      const next = new Set(s.savedIds);
      if (alreadySaved) next.delete(collegeId); else next.add(collegeId);
      return { savedIds: next };
    });

    try {
      const res = await fetch("/api/saved", {
        method: alreadySaved ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId })
      });

      if (!res.ok) {
        set((s) => {
          const rollback = new Set(s.savedIds);
          if (alreadySaved) rollback.add(collegeId); else rollback.delete(collegeId);
          return { savedIds: rollback };
        });

        if (res.status === 401) return { ok: false, saved: alreadySaved, message: "Please log in to save colleges." };
        if (res.status === 409) return { ok: false, saved: true, message: "Already saved." };
        return { ok: false, saved: alreadySaved, message: "Could not update saved colleges." };
      }

      return { ok: true, saved: !alreadySaved };
    } catch {
      set((s) => {
        const rollback = new Set(s.savedIds);
        if (alreadySaved) rollback.add(collegeId); else rollback.delete(collegeId);
        return { savedIds: rollback };
      });
      return { ok: false, saved: alreadySaved, message: "Network error while saving." };
    }
  },
  isSaved: (id) => get().savedIds.has(id),
  hydrate: (ids) => set({ savedIds: new Set(ids) })
}));