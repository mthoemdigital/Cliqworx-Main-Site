"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phases = [
  {
    step: "01",
    title: "Diagnose",
    desc: "We audit your current state, map blockers, and identify the highest-leverage interventions before touching a line of code.",
    detail: "Stakeholder interviews, analytics audit, competitive benchmarking, gap analysis.",
  },
  {
    step: "02",
    title: "Design",
    desc: "We define the solution architecture, user flows, and technical specification with a shared source of truth before build begins.",
    detail: "System design, information architecture, wireframes, sprint plan.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Fortnightly sprints with working software at every checkpoint. No black boxes. No surprises at launch.",
    detail: "Agile delivery, continuous integration, weekly demos, QA at every gate.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "Post-launch optimisation, performance marketing, and growth loops that compound the initial build investment.",
    detail: "Analytics review, A/B testing, marketing activation, monthly optimisation cycles.",
  },
];

export function OperatingModel() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // GSAP ScrollTrigger enhancement: phase buttons stagger in as the section
  // scrolls into view. Respects prefers-reduced-motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!railRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.from(".cw-phase", {
        y: 24,
        opacity: 0,
        stagger: 0.12,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: railRef.current, start: "top 80%" },
      });
    }, railRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24" style={{ background: "var(--cw-black)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Four phases. One operating rhythm.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">The Work System</h2>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: "#8888AA" }}>
            The same structured process applied to every engagement, regardless of size or capability.
          </p>
        </motion.div>

        {/* Phase connectors */}
        <div ref={railRef} className="flex items-start gap-0 mb-12 overflow-x-auto pb-2">
          {phases.map((phase, i) => (
            <div key={phase.step} className="cw-phase flex items-center flex-1 min-w-[140px]">
              <button
                onClick={() => setActive(i)}
                className="flex-1 flex flex-col items-center gap-2 px-2 text-center group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: active === i ? "#7B2FFF" : "rgba(123,47,255,0.12)",
                    color: active === i ? "#FFFFFF" : "#7B2FFF",
                    border: active === i ? "none" : "1px solid rgba(123,47,255,0.25)",
                  }}
                >
                  {phase.step}
                </div>
                <span
                  className="text-sm font-bold transition-colors"
                  style={{ color: active === i ? "#FFFFFF" : "#555577" }}
                >
                  {phase.title}
                </span>
              </button>
              {i < phases.length - 1 && (
                <div className="h-px flex-shrink-0 w-8 mx-1" style={{ background: "rgba(123,47,255,0.2)" }} />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-8 lg:p-12"
            style={{ background: "#0D0D1A", border: "1px solid rgba(123,47,255,0.18)" }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#7B2FFF" }}>
                  Phase {phases[active].step}
                </p>
                <h3 className="text-3xl font-bold text-white mb-4">{phases[active].title}</h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "#8888AA" }}>
                  {phases[active].desc}
                </p>
                <p className="text-sm" style={{ color: "#555577" }}>
                  {phases[active].detail}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="w-40 h-40 rounded-full flex items-center justify-center"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(123,47,255,0.2) 0%, rgba(123,47,255,0.04) 70%)",
                    border: "1px solid rgba(123,47,255,0.2)",
                  }}
                >
                  <span className="text-5xl font-bold" style={{ color: "rgba(123,47,255,0.5)" }}>
                    {phases[active].step}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
