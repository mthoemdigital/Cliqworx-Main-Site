type ChevronProps = {
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  strokeWidth?: number;
  gradient?: boolean;
};

let gradientIdCounter = 0;

/**
 * The brand's core motif: derived from the logo's internal "X".
 * Used as list markers, button arrows, and (stacked x3) as section dividers.
 * Never freehand this shape elsewhere — always render through this component.
 */
export function Chevron({
  className = "size-4",
  direction = "right",
  strokeWidth = 2.5,
  gradient = false,
}: ChevronProps) {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  }[direction];

  const gradientId = gradient
    ? `chevron-gradient-${(gradientIdCounter += 1)}`
    : undefined;

  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      {gradient && gradientId && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--cliq-purple)" />
            <stop offset="1" stopColor="var(--cliq-violet)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M6 2 L11 8 L6 14"
        stroke={gradient && gradientId ? `url(#${gradientId})` : "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Three stacked gradient chevrons with slight overlap. The brand's section divider. */
export function ChevronDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-0 py-2 ${className}`}
      aria-hidden="true"
    >
      {[0, 1, 2].map((i) => (
        <span key={i} style={i > 0 ? { marginLeft: "-14px" } : undefined}>
          <Chevron direction="right" gradient strokeWidth={3} className="size-8" />
        </span>
      ))}
    </div>
  );
}
