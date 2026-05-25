"use client";

import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SavedHydrator } from "@/components/providers/SavedHydrator";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <SavedHydrator />
        {children}
      </ToastProvider>
    </SessionProvider>
  );
}