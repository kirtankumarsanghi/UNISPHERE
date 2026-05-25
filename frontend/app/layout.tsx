import "./globals.css";
import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SavedHydrator } from "@/components/providers/SavedHydrator";
import { AuthProvider } from "@/components/providers/AuthProvider";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300", "400", "500", "600", "700"] });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["700", "800"] });

export const metadata: Metadata = {
  title: "Unisphere — Discover your future, one campus at a time",
  description: "Search, compare, and save Indian colleges with real placement data, course details, and student reviews. Find your perfect college match on Unisphere.",
  keywords: ["colleges", "IIT", "NIT", "placements", "engineering", "MBA", "compare colleges", "India"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${syne.variable}`}>
        <AuthProvider>
          <ToastProvider>
            <SavedHydrator />
            <Navbar />
            <main className="mx-auto min-h-[calc(100vh-140px)] w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
