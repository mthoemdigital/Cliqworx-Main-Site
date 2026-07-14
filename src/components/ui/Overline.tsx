import { Chevron } from "./Chevron";

export function Overline({
  children,
  tone = "light",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <p
      className={`overline flex items-center gap-3 ${
        tone === "dark" ? "text-cliq-silver" : "text-cliq-slate"
      }`}
    >
      <Chevron className="size-3 text-cliq-purple" strokeWidth={3} />
      {children}
    </p>
  );
}
