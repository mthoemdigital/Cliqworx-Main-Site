"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ChevronDown, Cpu, Target, TrendingUp } from "lucide-react";

const HeroField = dynamic(() => import("@/components/three/HeroField"), { ssr: false });

// ─── Layered 3D Slab Visual ──────────────────────────────────────────────────
function LayeredSlabs() {
  const slabs = [
    { label: "Strategy", color: "#7B2FFF", sub: "Direction. Diagnosis. Roadmap.", z: 80 },
    // Brief fix: middle pillar is "Build" (nav parity); sub-label kept as designed.
    { label: "Build", color: "#5B1FDF", sub: "Build. Integrate. Automate.", z: 40 },
    { label: "Growth", color: "#3B0FAF", sub: "Acquire. Convert. Scale.", z: 0 },
  ];

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: "420px", perspective: "1200px" }}
    >
      {/* R3F particle-mesh cone behind the slabs (enhancement layer) */}
      <div className="absolute inset-0 opacity-70" aria-hidden="true">
        <HeroField />
      </div>

      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(123,47,255,0.3) 0%, transparent 70%)",
          transform: "translateY(20px)",
        }}
      />

      <motion.div
        animate={{ rotateY: [-8, 8, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {slabs.map((slab, i) => (
          <motion.div
            key={slab.label}
            initial={{ opacity: 0, z: -40 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            style={{
              position: "absolute",
              width: "320px",
              left: "-160px",
              top: `${i * 68 - 68}px`,
              transform: `translateZ(${slab.z}px) rotateX(8deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Connector line */}
            {i < slabs.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "-20px",
                  width: "1px",
                  height: "20px",
                  background: `linear-gradient(to bottom, ${slab.color}, transparent)`,
                }}
              />
            )}

            {/* Slab card */}
            <div
              className="rounded-xl px-5 py-4 flex items-center gap-4"
              style={{
                background: `linear-gradient(135deg, ${slab.color}22 0%, ${slab.color}11 100%)`,
                border: `1px solid ${slab.color}55`,
                backdropFilter: "blur(12px)",
                boxShadow: `0 8px 40px ${slab.color}22, 0 0 0 1px ${slab.color}22 inset`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${slab.color}33`, border: `1px solid ${slab.color}55` }}
              >
                {i === 0 ? (
                  <Target size={18} color={slab.color} />
                ) : i === 1 ? (
                  <Cpu size={18} color={slab.color} />
                ) : (
                  <TrendingUp size={18} color={slab.color} />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{slab.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8888AA" }}>
                  {slab.sub}
                </p>
              </div>
              <div className="ml-auto">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: `${slab.color}33` }}
                >
                  <ChevronDown size={12} color={slab.color} style={{ transform: "rotate(-90deg)" }} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating nodes */}
      {[
        { x: "10%", y: "20%", delay: 0 },
        { x: "85%", y: "15%", delay: 0.5 },
        { x: "90%", y: "75%", delay: 1 },
        { x: "5%", y: "80%", delay: 1.5 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ left: node.x, top: node.y, background: "#7B2FFF" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Counter ─────────────────────────────────────────────────────────────────
function Counter({ value, suffix, prefix }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ─── Trusted By ──────────────────────────────────────────────────────────────
function TrustedBy() {
  const companies = ["BayCraft", "Digity Africa", "Creditworx", "Thrive Commerce", "NovaTech", "FinEdge"];
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
      <p
        className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 text-center"
        style={{ color: "#555577" }}
      >
        Trusted by ambitious businesses
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {companies.map((c) => (
          <span key={c} className="text-sm font-bold" style={{ color: "#3A3A5A" }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────
export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      style={{ background: "var(--cw-black)" }}
    >
      {/* Background mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7B2FFF 0%, transparent 70%)",
            transform: "translate(20%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #5B1FDF 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7B2FFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-6"
                style={{
                  background: "rgba(123,47,255,0.15)",
                  color: "#C4A0FF",
                  border: "1px solid rgba(123,47,255,0.25)",
                }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] animate-pulse" />
                Strategy. Technology. Growth.
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] text-white mb-6"
            >
              Digital work that{" "}
              <span
                className="relative"
                style={{
                  background: "linear-gradient(135deg, #9B5FFF 0%, #7B2FFF 50%, #C4A0FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                compounds.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: "#8888AA" }}
            >
              We embed strategy, technology, and growth into a single operating system for ambitious
              businesses. One team. One system. Measurable outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="/#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#7B2FFF" }}
              >
                Book a Consultation
                <ArrowRight size={16} />
              </a>
              <a
                href="/#proof"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white/5"
                style={{ color: "#CCCCCC", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                See Our Work
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-10"
              style={{ borderTop: "1px solid rgba(123,47,255,0.18)" }}
            >
              {[
                { value: 41, prefix: "+", suffix: "%", label: "Avg. conversion lift" },
                { value: 48, prefix: "-", suffix: "%", label: "Cost per acquisition" },
                { value: 3, prefix: "", suffix: ".2x", label: "Lead growth" },
                { value: 24, prefix: "", suffix: "h", label: "Response time" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl lg:text-3xl font-bold text-white">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#8888AA" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Slab Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:block"
          >
            <LayeredSlabs />
          </motion.div>
        </div>
      </div>

      {/* Trusted by */}
      <TrustedBy />
    </section>
  );
}
