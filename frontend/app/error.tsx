"use client";

import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Keep console logging for local debugging and error overlays.
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl rounded-2xl border border-border bg-surface p-8 text-center">
      <h2 className="font-syne text-2xl font-bold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted">An unexpected error occurred while rendering this page.</p>
      <button onClick={reset} className="mt-4 rounded-[8px] bg-accent px-4 py-2 font-semibold text-white">
        Try again
      </button>
    </div>
  );
}
