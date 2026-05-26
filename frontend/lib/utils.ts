import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

const formatLakh = (amount: number) => {
  const lakhs = amount / 100000;
  return Number.isInteger(lakhs) ? String(lakhs) : lakhs.toFixed(1);
};

export const formatFees = (amount: number) => `₹${formatLakh(amount)}L/yr`;
export const formatPackage = (amount: number) => `₹${formatLakh(amount)} LPA`;

export const getGradientStyle = (from: string, to: string) => ({
  background: `linear-gradient(135deg, ${from}, ${to})`
});

export const getBestValue = (values: number[], mode: "highest" | "lowest") => {
  if (!values.length) return 0;
  return mode === "highest" ? Math.max(...values) : Math.min(...values);
};
