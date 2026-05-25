import "./globals.css";
import { DM_Sans, Syne } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { SavedHydrator } from "@/components/providers/SavedHydrator";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["300", "400", "500"] });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["700", "800"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${syne.variable}`}>
        <ToastProvider>
          <SavedHydrator />
          <Navbar />
          <main className="mx-auto min-h-[calc(100vh-140px)] max-w-7xl px-6 py-8">{children}</main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}