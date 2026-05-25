import { formatFees } from "@/lib/utils";

type Course = { id: string; name: string; degree: string; duration: string; annualFees: number; totalSeats: number };

export function CoursesTab({ courses }: { courses: Course[] }) {
  if (!courses.length) return <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted">No courses data available</p>;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead className="bg-surface2 text-left font-syne text-xs uppercase tracking-wider text-muted">
          <tr>
            <th className="p-3">Course</th><th className="p-3">Degree</th><th className="p-3">Duration</th><th className="p-3">Annual Fees</th><th className="p-3">Seats</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c.id} className="border-t border-border hover:bg-surface2/70">
              <td className="p-3">{c.name}</td><td className="p-3">{c.degree}</td><td className="p-3">{c.duration}</td><td className="p-3 text-blue-400">{formatFees(c.annualFees)}</td><td className="p-3">{c.totalSeats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}