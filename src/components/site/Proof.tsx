"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const caseStudies = [
  {
    client: "BayCraft",
    tag: "E-commerce / Strategy + Build",
    challenge:
      "Stagnant conversion rate on a high-traffic DTC store. The team had tried three ad agencies in 18 months with no sustained improvement.",
    approach:
      "Full CRO audit, rebuilt checkout flow, implemented AI-assisted personalisation layer and redesigned product pages with evidence-backed copy.",
    outcome: "+41% conversion rate within 60 days of launch. Cart abandonment down 28%.",
    stats: [
      { value: "+41%", label: "Conversion rate" },
      { value: "-28%", label: "Cart abandonment" },
      { value: "60", suffix: " days", label: "Time to result" },
    ],
  },
  {
    client: "Digity Africa",
    tag: "Growth / Performance Marketing",
    challenge:
      "CAC was spiralling on paid social. Leads were coming in but the quality-to-cost ratio made scaling impossible.",
    approach:
      "Rebuilt campaign structure from scratch, implemented lead scoring, built dedicated landing pages with qualifying flows, and introduced automated nurture sequences.",
    outcome: "-48% cost per acquisition. Lead quality score improved 2.1x. Sales cycle shortened by 19 days.",
    stats: [
      { value: "-48%", label: "Cost per acquisition" },
      { value: "2.1x", label: "Lead quality score" },
      { value: "-19", suffix: " days", label: "Sales cycle" },
    ],
  },
  {
    client: "Creditworx",
    tag: "Strategy + Growth / Financial Services",
    challenge:
      "Commoditised market, low digital trust, and a lead pipeline that relied almost entirely on referrals.",
    approach:
      "Digital trust audit, content authority strategy, SEO rebuild, and a self-qualifying lead funnel with AI chatbot pre-screening.",
    outcome: "3.2x lead growth in 90 days. Organic traffic up 180%. Referral dependency reduced from 80% to 45%.",
    stats: [
      { value: "3.2x", label: "Lead growth" },
      { value: "+180%", label: "Organic traffic" },
      { value: "90", suffix: " days", label: "Time to result" },
    ],
  },
];

export function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="proof" className="py-24" style={{ background: "#F5F5FA" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Proof. Not adjectives.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: "#1A1A2E" }}>
            Real businesses. Real growth.
          </h2>
        </motion.div>

        <div className="space-y-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.client}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(123,47,255,0.12)" }}
            >
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Left: narrative */}
                <div className="lg:col-span-2 p-8 lg:p-10" style={{ background: "#FFFFFF" }}>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: "#1A1A2E" }}>
                        {cs.client}
                      </h3>
                      <span
                        className="text-xs font-semibold px-3 py-1 rounded-full mt-2 inline-block"
                        style={{ background: "rgba(123,47,255,0.08)", color: "#7B2FFF" }}
                      >
                        {cs.tag}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Challenge", text: cs.challenge },
                      { label: "Approach", text: cs.approach },
                      { label: "Outcome", text: cs.outcome },
                    ].map((block) => (
                      <div key={block.label}>
                        <p
                          className="text-xs font-bold uppercase tracking-[0.12em] mb-1"
                          style={{ color: "#AAAACC" }}
                        >
                          {block.label}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#555577" }}>
                          {block.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: stats */}
                <div
                  className="p-8 lg:p-10 flex flex-col justify-center gap-6"
                  style={{ background: "var(--cw-dark)" }}
                >
                  {cs.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-white">
                        {stat.value}
                        {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#8888AA" }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
