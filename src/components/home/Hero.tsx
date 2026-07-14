"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { Button } from "@/components/ui/Button";
import { fadeUp, staggerContainer } from "@/lib/motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cliq-black text-cliq-white">
      {/* Signature geometric anchor: a 45°-cut arc panel, derived from the
          logo's "C" + chevron. Purely decorative, aria-hidden. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-[560px] w-[560px] opacity-70 md:-right-20 md:-top-20"
      >
        <svg viewBox="0 0 560 560" className="h-full w-full">
          <defs>
            <linearGradient id="hero-arc-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--cliq-purple)" />
              <stop offset="1" stopColor="var(--cliq-violet)" />
            </linearGradient>
          </defs>
          <circle
            cx="280"
            cy="280"
            r="220"
            fill="none"
            stroke="url(#hero-arc-gradient)"
            strokeWidth="2"
            strokeDasharray="140 60"
            opacity="0.5"
          />
          <path
            d="M280 60 A220 220 0 0 1 500 280"
            fill="none"
            stroke="url(#hero-arc-gradient)"
            strokeWidth="3"
          />
        </svg>
      </div>

      <Container className="relative z-10 pt-40 pb-24 md:pt-48 md:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer(0.12)}
          className="max-w-3xl"
        >
          <motion.div variants={fadeUp}>
            <Overline tone="dark">Strategy. Technology. Growth.</Overline>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-[2.75rem] font-bold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            AI-first thinking, built into every{" "}
            <span className="text-cliq-violet">system</span> we ship.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cliq-silver md:text-xl"
          >
            CliqWorx connects strategy, technology and growth into one
            accountable system, so ambitious businesses stop juggling vendors
            and start compounding results.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
            <Button href="/consultation" size="lg" showChevron>
              Book a Consultation
            </Button>
            <Button href="/#case-studies" variant="ghost-dark" size="lg">
              See our work
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
