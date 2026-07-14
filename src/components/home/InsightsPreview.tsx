"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { Chevron } from "@/components/ui/Chevron";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const RESOURCES = [
  {
    badge: "Guide",
    title: "The business owner's guide to holding marketing accountable",
    meta: "Growth · 7 min read",
  },
  {
    badge: "Playbook",
    title: "AI readiness: where AI pays back first in a small business",
    meta: "AI & Strategy · 9 min read",
  },
  {
    badge: "Checklist",
    title: "Digital maturity: an honest self-assessment in twelve questions",
    meta: "Advisory · Free download",
  },
];

export function InsightsPreview() {
  return (
    <section id="insights" className="scroll-mt-20 border-t border-cliq-light-grey bg-[#FAFAFB] py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12 max-w-2xl"
        >
          <Overline>The Worx Journal</Overline>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Thinking you can use before you hire us.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="grid gap-8 lg:grid-cols-[1.1fr_1fr]"
        >
          <motion.a
            href="#"
            variants={fadeUp}
            className="group relative overflow-hidden rounded-lg border border-cliq-light-grey bg-cliq-white p-8 transition-all duration-300 ease-brand hover:-translate-y-1 hover:shadow-cliq-md sm:p-10"
          >
            <span className="inline-flex w-fit rounded-pill border border-cliq-purple/35 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-cliq-purple">
              Featured essay
            </span>
            <h3 className="mt-5 font-display text-2xl font-bold leading-snug sm:text-3xl">
              Why digital transformations fail without an operating model
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-cliq-slate">
              Most transformations don&apos;t fail at the technology. They
              fail in the gap between the strategy deck and the sprint
              board, where nobody owns the translation. Here&apos;s the
              operating model that closes it, and how to tell if yours is
              missing.
            </p>
            <span className="mt-5 flex items-center gap-2 text-sm font-semibold text-cliq-purple-aa">
              Read the essay
              <Chevron className="size-3 transition-transform duration-300 ease-brand group-hover:translate-x-1" strokeWidth={2.5} />
            </span>
            <span
              className="absolute inset-x-0 bottom-0 h-[3px] scale-x-0 bg-cliq-gradient transition-transform duration-300 ease-brand group-hover:scale-x-100"
              aria-hidden="true"
            />
          </motion.a>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            {RESOURCES.map((r) => (
              <a
                key={r.title}
                href="#"
                className="group flex items-center justify-between gap-4 rounded-md border border-cliq-light-grey bg-cliq-white px-5 py-4 transition-all duration-200 ease-brand hover:border-cliq-purple hover:shadow-cliq-sm"
              >
                <div>
                  <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-cliq-purple">
                    {r.badge}
                  </span>
                  <h4 className="mt-1 font-display text-[0.95rem] font-semibold leading-snug">
                    {r.title}
                  </h4>
                  <p className="mt-1 text-xs text-cliq-slate">{r.meta}</p>
                </div>
                <Chevron
                  className="size-3 shrink-0 text-cliq-purple transition-transform duration-200 ease-brand group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </a>
            ))}
            <a href="#" className="mt-1 flex items-center gap-2 text-sm font-semibold text-cliq-purple-aa">
              Browse all insights
              <Chevron className="size-3" strokeWidth={2.5} />
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
