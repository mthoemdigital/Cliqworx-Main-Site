"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { Chevron } from "@/components/ui/Chevron";
import { Button } from "@/components/ui/Button";
import { fadeUp, viewportOnce, easeBrand } from "@/lib/motion";

type Stage = {
  name: string;
  question: string;
  body: string;
  outcomes: string[];
};

const STAGES: Stage[] = [
  {
    name: "Diagnose",
    question: "What is actually holding growth back?",
    body: "We start with the business, not the technology. A short, focused look at your numbers, your customer journey and your operations, to separate the symptoms from the real constraint.",
    outcomes: [
      "An honest read on where you are today",
      "The one constraint worth solving first",
      "A business case you can take to your board or bank",
    ],
  },
  {
    name: "Design",
    question: "What are the few moves that matter?",
    body: "Strategy is choosing what not to do. We design the plan, the platform and the growth engine as one system, sequenced so each phase pays for the next.",
    outcomes: [
      "A roadmap with owners and dates",
      "Website and platform architecture",
      "A growth model with honest assumptions",
    ],
  },
  {
    name: "Build",
    question: "How do we prove value early?",
    body: "We ship in increments that create business value from the first release, not a big reveal after twelve months. Everything is measured, so the next decision is made on evidence.",
    outcomes: [
      "Working platforms live, early",
      "Analytics and automation wired in from day one",
      "Progress you can see every week",
    ],
  },
  {
    name: "Scale",
    question: "What deserves more fuel?",
    body: "With the system live, we grow what works and retire what doesn't. Paid media, conversion optimisation and automation run against one scoreboard: leads, sales and payback.",
    outcomes: [
      "A growth engine accountable to revenue",
      "A monthly optimisation rhythm",
      "Compounding results, documented",
    ],
  },
];

export function WorxSystem() {
  const [active, setActive] = useState(0);
  const stage = STAGES[active];
  const fillWidth = `${(active / (STAGES.length - 1)) * 100}%`;

  return (
    <section className="bg-cliq-black py-20 text-cliq-white md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12 max-w-2xl"
        >
          <Overline tone="dark">How we work</Overline>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            The Worx System
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cliq-silver">
            Every engagement runs on the same four-stage rhythm, so value
            shows up early and compounds, instead of arriving all at once at
            the end.
          </p>
        </motion.div>

        {/* Stage selector track */}
        <div className="relative mb-4 grid grid-cols-4 gap-1 sm:gap-4" role="tablist" aria-label="The Worx System stages">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-[22px] hidden h-px bg-white/15 sm:block"
            aria-hidden="true"
          />
          <div
            className="absolute left-[12.5%] top-[22px] hidden h-px bg-gradient-to-r from-cliq-purple to-cliq-violet transition-[width] duration-500 ease-brand sm:block"
            style={{ width: active === 0 ? "0%" : `calc(${fillWidth} * 0.75)` }}
            aria-hidden="true"
          />
          {STAGES.map((s, i) => (
            <button
              key={s.name}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="relative z-10 flex flex-col items-center gap-3 pb-2"
            >
              <span
                className={`flex size-11 items-center justify-center rounded-full border-2 font-display text-sm font-bold transition-all duration-300 ease-brand ${
                  active === i
                    ? "border-cliq-purple bg-cliq-purple text-white"
                    : active > i
                      ? "border-cliq-violet/60 bg-cliq-charcoal text-cliq-violet"
                      : "border-white/20 bg-cliq-charcoal text-cliq-silver"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span
                className={`font-display text-sm font-semibold transition-colors duration-300 ease-brand ${
                  active === i ? "text-white" : "text-cliq-silver"
                }`}
              >
                {s.name}
              </span>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        <div className="relative min-h-[280px] overflow-hidden rounded-lg border border-white/10 bg-cliq-charcoal p-8 sm:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: easeBrand }}
              className="grid gap-10 md:grid-cols-[1.2fr_1fr]"
            >
              <div>
                <p className="mb-4 font-body text-sm font-semibold text-cliq-violet">
                  &ldquo;{stage.question}&rdquo;
                </p>
                <h3 className="font-display text-2xl font-bold sm:text-3xl">{stage.name}</h3>
                <p className="mt-4 max-w-[52ch] text-[0.95rem] leading-relaxed text-cliq-silver">
                  {stage.body}
                </p>
              </div>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cliq-slate">
                  You leave with
                </p>
                <ul className="flex flex-col gap-3">
                  {stage.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-baseline gap-3 text-sm text-white/90">
                      <Chevron className="size-3 shrink-0 translate-y-0.5 text-cliq-purple" strokeWidth={3} />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <p className="text-sm text-cliq-silver">
            Every engagement starts at stage one, no commitment beyond it.
          </p>
          <Button href="/consultation" variant="ghost-dark" showChevron>
            Start with a Diagnose session
          </Button>
        </div>
      </Container>
    </section>
  );
}
