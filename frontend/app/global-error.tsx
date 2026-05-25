"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body className="bg-bg text-text">
        <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center justify-center px-6 py-16">
          <div className="w-full rounded-2xl border border-border bg-surface p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
            <h1 className="font-syne text-3xl font-extrabold tracking-tight">Application Error</h1>
            <p className="mt-3 text-sm text-muted">
              {error?.message || "A critical rendering error occurred. Please retry."}
            </p>
            <button
              onClick={reset}
              className="mt-6 rounded-[10px] bg-accent px-5 py-2.5 font-semibold text-white hover:brightness-110"
            >
              Reload App
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
