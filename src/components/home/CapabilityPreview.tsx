"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { Chevron } from "@/components/ui/Chevron";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const CAPABILITIES = [
  {
    id: "strategy",
    number: "01",
    verb: "Transform",
    label: "Strategy",
    description:
      "Decide what to change, and why, before money is spent building. We map where you are, find what's holding growth back, and give you a plan you can act on.",
    tags: ["Digital Strategy", "AI Readiness", "Customer Experience"],
  },
  {
    id: "technology",
    number: "02",
    verb: "Build",
    label: "Technology",
    description:
      "Websites, web applications and AI-powered systems that carry the strategy, designed like products, measured from day one, maintained like they matter.",
    tags: ["Web Applications", "Automation", "SEO & CRO"],
  },
  {
    id: "growth",
    number: "03",
    verb: "Grow",
    label: "Growth",
    description:
      "Turn what you built into measurable revenue. Paid media, lead generation and automation, run against sales, not vanity metrics.",
    tags: ["Performance Marketing", "Lead Generation", "Analytics"],
  },
];

export function CapabilityPreview() {
  return (
    <section id="services" className="scroll-mt-20 border-t border-cliq-light-grey bg-[#FAFAFB] py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12 max-w-2xl"
        >
          <Overline>What we do</Overline>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Three practices. One accountable team.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cliq-slate">
            Each practice stands on its own. Together they compound, because
            the strategy shapes the build, and the build is designed to be
            grown.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {CAPABILITIES.map((cap) => (
            <motion.div key={cap.label} id={cap.id} variants={fadeUp} className="scroll-mt-24">
              <Link
                href="/consultation"
                className="group relative flex h-full flex-col gap-5 overflow-hidden rounded-lg border border-cliq-light-grey bg-cliq-white p-8 transition-all duration-300 ease-brand hover:-translate-y-1 hover:shadow-cliq-md"
              >
                {/* 45° cut accent corner */}
                <span
                  className="absolute right-0 top-0 h-11 w-11 bg-cliq-light-grey transition-colors duration-300 ease-brand group-hover:bg-cliq-purple"
                  style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
                  aria-hidden="true"
                />
                <span className="font-display text-xs font-bold tracking-[0.1em] text-cliq-purple">
                  {cap.number}
                </span>
                <div>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">
                    {cap.verb}
                  </h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.08em] text-cliq-slate">
                    {cap.label}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-cliq-slate">{cap.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-pill border border-cliq-light-grey px-3 py-1 text-xs font-medium text-cliq-slate"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="flex items-center gap-2 text-sm font-semibold text-cliq-purple-aa">
                  Talk to us about {cap.label}
                  <Chevron className="size-3 transition-transform duration-300 ease-brand group-hover:translate-x-1" strokeWidth={2.5} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
