import { Star } from "lucide-react";

export const RatingPill = ({ rating }: { rating: number }) => (
  <div className="inline-flex items-center gap-1 rounded-full border border-accent3/35 bg-accent3/10 px-2 py-1 text-xs font-semibold text-accent3">
    <Star size={12} fill="#fbbf24" color="#fbbf24" />
    {rating.toFixed(1)}
  </div>
);