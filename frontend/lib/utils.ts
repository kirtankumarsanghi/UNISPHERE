import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatFees = (amount: number) => `?${Math.round(amount / 100000)}L/yr`;
export const formatPackage = (amount: number) => `?${Math.round(amount / 100000)} LPA`;
export const getGradientStyle = (from: string, to: string) => ({ background: `linear-gradient(135deg, ${from}, ${to})` });
export const getBestValue = (values: number[], mode: "highest" | "lowest") => {
  if (!values.length) return 0;
  return mode === "highest" ? Math.max(...values) : Math.min(...values);
};