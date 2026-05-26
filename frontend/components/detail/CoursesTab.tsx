import { formatFees } from "@/lib/utils";

type Course = { id: string; name: string; degree: string; duration: string; annualFees: number; totalSeats: number };

export function CoursesTab({ courses }: { courses: Course[] }) {
  if (!courses.length) return <p className="rounded-[24px] bg-white/[0.02] p-8 text-sm text-text-muted ring-1 ring-white/5">No courses data available</p>;
  return (
    <div className="overflow-hidden rounded-[24px] bg-white/[0.02] ring-1 ring-white/5 transition-all duration-300 hover:ring-white/10">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-left font-mono text-[10px] font-bold uppercase tracking-widest text-text-secondary">
            <tr>
              <th className="px-6 py-4 font-bold">Course</th>
              <th className="px-6 py-4 font-bold">Degree</th>
              <th className="px-6 py-4 font-bold">Duration</th>
              <th className="px-6 py-4 font-bold">Annual Fees</th>
              <th className="px-6 py-4 font-bold">Seats</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {courses.map((c) => (
              <tr key={c.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="px-6 py-4 text-text-primary">{c.name}</td>
                <td className="px-6 py-4 text-text-muted">{c.degree}</td>
                <td className="px-6 py-4 text-text-muted">{c.duration}</td>
                <td className="px-6 py-4 font-mono font-medium text-text-primary">{formatFees(c.annualFees)}</td>
                <td className="px-6 py-4 text-text-muted">{c.totalSeats}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}