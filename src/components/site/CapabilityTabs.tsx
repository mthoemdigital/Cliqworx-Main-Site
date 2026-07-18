"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const capabilities = {
  Strategy: {
    id: "strategy",
    headline: "Sharpen the direction before you invest in execution.",
    desc: "We diagnose what is actually holding your business back, design the right interventions, and give you a clear playbook before a single sprint starts.",
    items: [
      "Digital Strategy & Roadmapping",
      "Digital Transformation",
      "Fractional Product Management",
      "AI Readiness & Strategy",
      "Customer Experience Design",
      "Process Optimisation",
    ],
    stat: { value: "+2.4x", label: "avg. ROI on strategy engagements" },
  },
  Build: {
    id: "build",
    headline: "Build software that is fast, reliable, and quietly intelligent.",
    desc: "From customer-facing web apps to AI-powered back-end automation, we build systems that are maintainable, scalable, and wired for growth from day one.",
    items: [
      "Web Application Development",
      "Website Design & Build",
      "AI-Powered Solutions",
      "Automation & Workflows",
      "CRM & Systems Integrations",
      "SEO & CRO Engineering",
    ],
    stat: { value: "3 wks", label: "average time to first working prototype" },
  },
  Growth: {
    id: "growth",
    headline: "Turn traffic into pipeline, and pipeline into revenue.",
    desc: "We build growth systems, not campaigns. Performance marketing, lead generation, and AI-assisted optimisation that compounds over time.",
    items: [
      "Performance Marketing",
      "Lead Generation Systems",
      "Marketing Automation",
      "High-Converting Landing Pages",
      "Analytics & Reporting",
      "AI-Assisted Optimisation",
    ],
    stat: { value: "3.2x", label: "avg. lead growth within 90 days" },
  },
};

const hashToTab: Record<string, keyof typeof capabilities> = {
  strategy: "Strategy",
  build: "Build",
  growth: "Growth",
};

export function CapabilityTabs() {
  const [active, setActive] = useState<keyof typeof capabilities>("Strategy");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cap = capabilities[active];

  // Nav anchors (#strategy / #build / #growth) land here and select the tab.
  useEffect(() => {
    const applyHash = () => {
      const tab = hashToTab[window.location.hash.replace("#", "")];
      if (tab) setActive(tab);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <section ref={ref} className="py-24 relative" style={{ background: "var(--cw-dark)" }}>
      {/* Stable anchor targets for all three pillars */}
      <span id="strategy" className="absolute -top-16" aria-hidden="true" />
      <span id="build" className="absolute -top-16" aria-hidden="true" />
      <span id="growth" className="absolute -top-16" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Three practices. One accountable team.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            The full stack of capability, under one roof.
          </h2>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-10 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
          {(Object.keys(capabilities) as Array<keyof typeof capabilities>).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
              style={{
                background: active === tab ? "#7B2FFF" : "transparent",
                color: active === tab ? "#FFFFFF" : "#8888AA",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug">{cap.headline}</h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#8888AA" }}>
                {cap.desc}
              </p>
              <div
                className="inline-block px-5 py-3 rounded-xl mb-8"
                style={{ background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.2)" }}
              >
                <p className="text-2xl font-bold" style={{ color: "#C4A0FF" }}>
                  {cap.stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#8888AA" }}>
                  {cap.stat.label}
                </p>
              </div>
              <a
                href="/#contact"
                className="flex items-center gap-2 text-sm font-bold transition-colors"
                style={{ color: "#7B2FFF" }}
              >
                Discuss your {active.toLowerCase()} needs
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {cap.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.1)" }}
                >
                  <CheckCircle2 size={16} style={{ color: "#7B2FFF", flexShrink: 0 }} />
                  <span className="text-sm font-medium text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
