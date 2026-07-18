"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const techStack = [
  { name: "React", cat: "Frontend" },
  { name: "Next.js", cat: "Frontend" },
  { name: "TypeScript", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "Supabase", cat: "Backend" },
  { name: "PostgreSQL", cat: "Backend" },
  { name: "OpenAI", cat: "AI" },
  { name: "Anthropic", cat: "AI" },
  { name: "Zapier", cat: "Automation" },
  { name: "HubSpot", cat: "CRM" },
  { name: "Vercel", cat: "Infra" },
  { name: "Stripe", cat: "Payments" },
];

export function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "var(--cw-dark)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            The stack behind the work
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Proven platforms, applied with first principles.
          </h2>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: "#8888AA" }}>
            We use best-in-class tools but never let the stack drive the decision. The right tool for the
            right problem, always.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.12)" }}
            >
              <span className="text-sm font-bold text-white">{tech.name}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(123,47,255,0.15)", color: "#C4A0FF" }}
              >
                {tech.cat}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
