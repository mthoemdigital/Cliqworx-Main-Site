"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    q: "What makes Cliqworx different from a regular digital agency?",
    a: "Most agencies are channel-specialists: one shop does SEO, another does ads, a third builds your site. We operate as a single accountable team across strategy, technology, and growth. One brief, one team, one set of commercial outcomes. No coordination overhead, no handoff gaps.",
  },
  {
    q: "How long before we see measurable results?",
    a: "For growth and performance work, our clients typically see directional movement within 30 days and statistically significant results within 60 to 90 days. For technology builds, we deliver working software within the first two-week sprint. We set specific outcome milestones at the start of every engagement so expectations are calibrated, not vague.",
  },
  {
    q: "Do you work with startups or established businesses?",
    a: "Both, but we are most effective with businesses that have already found product-market fit and are ready to scale what is working, or with founders who want to build right the first time. We are not the right partner for pure ideation-stage startups with no customers yet.",
  },
  {
    q: "Can we engage just one practice area?",
    a: "Yes. Many clients start with a focused Strategy or Growth engagement before expanding. Each practice area is a standalone offering. That said, our integrated model delivers compound results that siloed engagements cannot.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We have deep experience in financial services, fintech, e-commerce, healthtech, education, and transport and logistics. Our frameworks are transferable across sectors, but we bring market-specific context to each of these verticals.",
  },
  {
    q: "How does the initial consultation work?",
    a: "Thirty minutes with a senior practitioner, not a sales rep. We will ask about your current state, your biggest constraint, and what success looks like in 90 days. You will leave with at least one actionable insight regardless of whether we work together.",
  },
];

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "#F5F5FA" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Common questions
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: "#1A1A2E" }}>
            Thinking you can use before you hire us.
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(123,47,255,0.12)", background: "#FFFFFF" }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                aria-expanded={openIdx === i}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-base font-semibold pr-4" style={{ color: "#1A1A2E" }}>
                  {faq.q}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: openIdx === i ? "#7B2FFF" : "rgba(123,47,255,0.1)" }}
                >
                  {openIdx === i ? <Minus size={14} color="#FFFFFF" /> : <Plus size={14} color="#7B2FFF" />}
                </div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#555577" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
