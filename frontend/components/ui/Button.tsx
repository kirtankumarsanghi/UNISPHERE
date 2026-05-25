import { cn } from "@/lib/utils";

export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }) {
  const { variant = "primary", className, ...rest } = props;
  return <button className={cn("transition-all duration-200 rounded-[8px] px-5 py-2.5 font-semibold", variant === "primary" ? "bg-accent text-white hover:bg-[#7c75ff] hover:-translate-y-[1px]" : "border border-border text-text hover:border-accent hover:text-accent", className)} {...rest} />;
}