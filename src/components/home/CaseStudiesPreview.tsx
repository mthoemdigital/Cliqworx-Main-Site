"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const CASE_STUDIES = [
  {
    tag: "SaaS · Field Services",
    title: "ServCraft: from manual quoting to a platform that sells while the team sleeps",
    challenge:
      "Every quote needed a site visit and a spreadsheet. Sales capacity, not demand, was the ceiling.",
    approach:
      "Redesigned quoting as a self-serve journey, rebuilt the website around it, then pointed paid search at it.",
    outcome:
      "Quotes in minutes instead of days, and sales now starts every conversation with a priced, qualified lead.",
    metrics: [
      { value: "+41%", label: "Conversion rate" },
      { value: "6 days → 4 min", label: "Quote turnaround" },
    ],
  },
  {
    tag: "Education · Digital Skills",
    title: "Digify Africa: more learners reached on half the acquisition cost",
    challenge:
      "Ad spend was rising faster than enrolments, and nobody could say which channel or course actually paid back.",
    approach:
      "Rebuilt measurement end to end, cut the channels that couldn't prove themselves, redesigned the enrolment funnel around drop-off data.",
    outcome:
      "The marketing budget now behaves like an investment: every rand traceable to an enrolment.",
    metrics: [
      { value: "250,000+", label: "Learners reached" },
      { value: "−48%", label: "Cost per enrolment" },
    ],
  },
  {
    tag: "Healthtech · Genomics",
    title: "Cradleomics: a regulated healthtech made legible to investors and clinicians",
    challenge:
      "Breakthrough science, but a story only scientists could follow. Fundraising stalled at the first meeting.",
    approach:
      "Positioning first, then a credibility-grade digital presence with the evidence structured for two audiences: investors and practitioners.",
    outcome:
      "The company now opens conversations with its value, not its vocabulary, and the pipeline shows it.",
    metrics: [
      { value: "3.2×", label: "Lead growth" },
      { value: "−38%", label: "Time to first clinical enquiry" },
    ],
  },
];

export function CaseStudiesPreview() {
  return (
    <section id="case-studies" className="scroll-mt-20 bg-cliq-white py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12 max-w-2xl"
        >
          <Overline>Selected work</Overline>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            Real businesses. Real growth.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cliq-slate">
            Three engagements that show the system working: strategy,
            platform and growth pulling in the same direction.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="flex flex-col gap-6"
        >
          {CASE_STUDIES.map((cs) => (
            <motion.article
              key={cs.title}
              variants={fadeUp}
              className="rounded-lg border border-cliq-light-grey p-8 transition-shadow duration-300 ease-brand hover:shadow-cliq-md sm:p-10"
            >
              <span className="inline-flex rounded-pill border border-cliq-light-grey px-3 py-1 text-xs font-semibold uppercase tracking-[0.06em] text-cliq-slate">
                {cs.tag}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold leading-snug sm:text-2xl">
                {cs.title}
              </h3>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-cliq-slate">
                    Challenge
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">{cs.challenge}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-cliq-slate">
                    Approach
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">{cs.approach}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-cliq-slate">
                    Outcome
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed">{cs.outcome}</dd>
                </div>
              </dl>
              <div className="mt-6 flex flex-wrap gap-10 border-t border-cliq-light-grey pt-6">
                {cs.metrics.map((m) => (
                  <div key={m.label}>
                    <div className="font-display text-2xl font-extrabold tracking-tight text-cliq-purple">
                      {m.value}
                    </div>
                    <div className="mt-0.5 text-xs text-cliq-slate">{m.label}</div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
