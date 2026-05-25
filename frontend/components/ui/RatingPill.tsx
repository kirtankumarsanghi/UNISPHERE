import { Star } from "lucide-react";

export const RatingPill = ({ rating }: { rating: number }) => (
  <div className="inline-flex items-center gap-1 rounded-full border border-accent3/40 bg-accent3/10 px-2 py-1 text-xs text-accent3"><Star size={12} fill="currentColor" />{rating.toFixed(1)}</div>
);