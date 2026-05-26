import { Loader2 } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 animate-fade-in">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="font-label-caps text-label-caps uppercase tracking-widest text-on-surface-variant animate-pulse">Loading...</p>
    </div>
  );
}
