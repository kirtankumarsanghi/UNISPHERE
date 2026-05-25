import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="font-syne text-8xl font-extrabold text-accent/20">404</div>
      <h1 className="mt-4 font-syne text-3xl font-bold tracking-tight">Page Not Found</h1>
      <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
      <Link href="/" className="mt-6 rounded-[8px] bg-accent px-6 py-2.5 font-semibold text-white hover:-translate-y-[1px] hover:bg-[#7c75ff]">
        Back to Home
      </Link>
    </div>
  );
}