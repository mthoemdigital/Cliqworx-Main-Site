"use client";

/* ============================================================
   Performance-marketing visual toolkit
   Lightweight, dependency-free animated SVG charts + a count-up
   hook. Everything draws itself on scroll and honours
   prefers-reduced-motion. Shared by the hero dashboard and the
   case-study cards so the whole page reads as one system.
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// ─── Count-up on scroll ───────────────────────────────────────────────────────

export function useCountUp(
  target: number,
  { duration = 1600, decimals = 0 }: { duration?: number; decimals?: number } = {}
) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduce]);

  const display =
    decimals > 0
      ? value.toLocaleString("en-ZA", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
      : Math.round(value).toLocaleString("en-ZA");

  return { ref, display };
}

// ─── Area / line chart (self-drawing) ─────────────────────────────────────────

export function AreaChart({
  data,
  color = "#7B2FFF",
  height = 120,
  strokeWidth = 2.5,
  showAxis = false,
  labels,
  gradientId,
}: {
  data: number[];
  color?: string;
  height?: number;
  strokeWidth?: number;
  showAxis?: boolean;
  labels?: string[];
  gradientId: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const W = 300;
  const H = height;
  const pad = 6;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const stepX = (W - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = pad + i * stepX;
    const y = pad + (H - pad * 2) * (1 - (d - min) / range);
    return [x, y] as const;
  });
  const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0].toFixed(1)},${H} L${pts[0][0].toFixed(1)},${H} Z`;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${H + (showAxis ? 16 : 0)}`}
      className="w-full"
      style={{ display: "block" }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.28} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${gradientId})`}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        vectorEffect="non-scaling-stroke"
      />
      {showAxis && labels && (
        <g>
          {labels.map((l, i) => (
            <text
              key={l + i}
              x={pad + i * stepX}
              y={H + 12}
              fontSize={8}
              fill="#8888AA"
              textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}
            >
              {l}
            </text>
          ))}
        </g>
      )}
    </svg>
  );
}

// ─── Donut ─────────────────────────────────────────────────────────────────────

export function Donut({
  segments,
  size = 128,
  thickness = 18,
}: {
  segments: { value: number; color: string; label: string }[];
  size?: number;
  thickness?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  let offset = 0;

  return (
    <svg ref={ref} viewBox={`0 0 ${size} ${size}`} width={size} height={size} aria-hidden="true">
      <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
        {segments.map((s, i) => {
          const frac = s.value / total;
          const dash = frac * c;
          const seg = (
            <motion.circle
              key={s.label}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
              initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.12 }}
              style={{ transformOrigin: "center" }}
            />
          );
          offset += dash;
          return seg;
        })}
      </g>
    </svg>
  );
}

// ─── Horizontal bars (funnel) ─────────────────────────────────────────────────

export function FunnelBars({
  rows,
  color = "#7B2FFF",
}: {
  rows: { label: string; value: string; pct: number }[];
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="space-y-2.5">
      {rows.map((row, i) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className="text-[11px] w-16 shrink-0" style={{ color: "#8888AA" }}>
            {row.label}
          </span>
          <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: "rgba(123,47,255,0.08)" }}>
            <motion.div
              className="h-full rounded-md"
              style={{ background: `linear-gradient(90deg, ${color}, #9B5FFF)` }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${row.pct}%` } : {}}
              transition={{ duration: 1, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="text-[11px] font-bold w-14 text-right shrink-0" style={{ color: "#1A1A2E" }}>
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Grouped vertical bars (before / after) ───────────────────────────────────

export function BeforeAfterBars({
  groups,
  height = 96,
}: {
  groups: { before: number; after: number }[];
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const max = Math.max(...groups.flatMap((g) => [g.before, g.after])) || 1;
  return (
    <div ref={ref} className="flex items-end justify-between gap-2" style={{ height }}>
      {groups.map((g, i) => (
        <div key={i} className="flex-1 flex items-end justify-center gap-1">
          <motion.div
            className="w-full max-w-[10px] rounded-t"
            style={{ background: "rgba(255,255,255,0.18)" }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${(g.before / max) * 100}%` } : {}}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.08 }}
          />
          <motion.div
            className="w-full max-w-[10px] rounded-t"
            style={{ background: "linear-gradient(180deg, #9B5FFF, #7B2FFF)" }}
            initial={{ height: 0 }}
            animate={inView ? { height: `${(g.after / max) * 100}%` } : {}}
            transition={{ duration: 0.7, delay: 0.25 + i * 0.08 }}
          />
        </div>
      ))}
    </div>
  );
}

// ─── Heatmap (Clarity-style) ──────────────────────────────────────────────────

export function Heatmap({ cols = 12, rows = 5 }: { cols?: number; rows?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  // Deterministic pseudo-random field with two warm "hot spots".
  const cells = Array.from({ length: cols * rows }, (_, i) => {
    const x = i % cols;
    const y = Math.floor(i / cols);
    const d1 = Math.hypot(x - cols * 0.32, y - rows * 0.45);
    const d2 = Math.hypot(x - cols * 0.72, y - rows * 0.55);
    const heat = Math.max(0, 1 - d1 / 3) * 0.9 + Math.max(0, 1 - d2 / 2.4) * 1;
    return Math.min(1, heat);
  });
  const colorFor = (h: number) => {
    if (h > 0.75) return "#F43F5E";
    if (h > 0.5) return "#F97316";
    if (h > 0.3) return "#EAB308";
    if (h > 0.15) return "#7B2FFF";
    return "rgba(123,47,255,0.14)";
  };
  return (
    <div
      ref={ref}
      className="grid gap-[2px] rounded-lg overflow-hidden p-1.5"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, background: "#0D0D1A" }}
      aria-hidden="true"
    >
      {cells.map((h, i) => (
        <motion.div
          key={i}
          className="rounded-[2px] aspect-square"
          style={{ background: colorFor(h) }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: h < 0.15 ? 0.5 : 1 } : {}}
          transition={{ duration: 0.5, delay: (i % cols) * 0.02 }}
        />
      ))}
    </div>
  );
}
