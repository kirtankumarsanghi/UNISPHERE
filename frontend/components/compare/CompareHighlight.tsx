export function CompareHighlight({ children, active }: { children: React.ReactNode; active: boolean }) {
  return <span className={active ? "rounded-md bg-accent3/10 px-1.5 py-0.5 font-semibold text-accent3" : ""}>{children}</span>;
}