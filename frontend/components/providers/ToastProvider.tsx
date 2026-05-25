"use client";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: number; message: string; tone?: "success" | "error" | "info" };

const ToastContext = createContext<{ push: (message: string, tone?: Toast["tone"]) => void }>({ push: () => undefined });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const push = useCallback((message: string, tone: Toast["tone"] = "info") => {
    const id = Date.now() + Math.floor(Math.random() * 1000);
    setToasts((prev) => [...prev, { id, message, tone }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2400);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-20 z-[100] space-y-2">
        {toasts.map((t) => (
          <div key={t.id} className={`rounded-xl border px-4 py-2 text-sm shadow-lg ${t.tone === "success" ? "border-accent3/40 bg-accent3/10 text-accent3" : t.tone === "error" ? "border-accent2/40 bg-accent2/10 text-accent2" : "border-accent/40 bg-accent/10 text-[#a89dff]"}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);