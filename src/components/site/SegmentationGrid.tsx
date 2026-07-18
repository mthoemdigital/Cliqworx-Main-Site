"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, BarChart3, Cpu, Settings, Target, TrendingUp, Zap } from "lucide-react";

const intentCards: { icon: ReactNode; title: string; desc: string; tag: string; anchor: string }[] = [
  {
    icon: <Target size={22} />,
    title: "I need clarity on direction",
    desc: "Strategy & roadmapping before committing to build",
    tag: "Strategy",
    anchor: "/#strategy",
  },
  {
    icon: <Cpu size={22} />,
    title: "Build faster and smarter",
    desc: "Modern web apps, AI tools, and integrations that actually ship",
    tag: "Build",
    anchor: "/#build",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Turn traffic into pipeline",
    desc: "Performance marketing and conversion systems that compound",
    tag: "Growth",
    anchor: "/#growth",
  },
  {
    icon: <Settings size={22} />,
    title: "Automate and integrate",
    desc: "Connect your systems, eliminate manual work, scale ops",
    tag: "Build",
    anchor: "/#build",
  },
  {
    icon: <Zap size={22} />,
    title: "Make my business AI-ready",
    desc: "Identify where AI applies, implement it safely, measure it",
    tag: "Strategy",
    anchor: "/#strategy",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Scale what is working",
    desc: "Analytics, optimisation, and growth loops on proven channels",
    tag: "Growth",
    anchor: "/#growth",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Strategy: { bg: "rgba(123,47,255,0.12)", text: "#9B5FFF" },
  Build: { bg: "rgba(59,15,175,0.1)", text: "#7B5FFF" },
  Growth: { bg: "rgba(75,0,130,0.1)", text: "#C4A0FF" },
};

export function SegmentationGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "#F5F5FA" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Find your path
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: "#1A1A2E" }}>
            What does your business need next?
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#555577" }}>
            Select the outcome closest to your goal and we will show you how we get there.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {intentCards.map((card, i) => (
            <motion.a
              key={card.title}
              href={card.anchor}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(123,47,255,0.12)" }}
              className="group rounded-xl p-6 cursor-pointer transition-all duration-300 block"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(123,47,255,0.1)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(123,47,255,0.08)", color: "#7B2FFF" }}
              >
                {card.icon}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "#1A1A2E" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#777799" }}>
                {card.desc}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: tagColors[card.tag].bg, color: tagColors[card.tag].text }}
                >
                  {card.tag}
                </span>
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#7B2FFF" }}
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
