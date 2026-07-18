import Image from "next/image";

/**
 * Brand logo from public/logo (per brief: use the files already there).
 * "logo cw2.png" is the transparent-background lockup with a dark mark, so on
 * dark surfaces we invert and hue-rotate: the mark and "Cliq" read white while
 * the purple "Worx" stays in the purple family.
 */
export function Logo({ className = "h-9" }: { className?: string }) {
  return (
    <Image
      src="/logo/logo-nav.png"
      alt="Cliqworx. Strategy. Technology. Growth."
      width={1124}
      height={264}
      priority
      className={`w-auto ${className}`}
      style={{ filter: "invert(1) hue-rotate(180deg) saturate(1.4)" }}
    />
  );
}
