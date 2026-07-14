"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { fadeUp, viewportOnce } from "@/lib/motion";

const CLIENTS = [
  "Meta",
  "Nedbank",
  "Satrix",
  "Digify Africa",
  "Ogilvy",
  "Legacy Motor Group",
  "ServCraft",
  "Cradleomics",
];

export function CredibilityBar() {
  return (
    <section className="border-b border-white/10 bg-cliq-black py-10 sm:py-12">
      <Container>
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-6 text-xs font-medium uppercase tracking-[0.08em] text-cliq-slate"
        >
          Experience across organisations including
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="flex flex-wrap items-center gap-x-10 gap-y-4"
        >
          {CLIENTS.map((name) => (
            <span
              key={name}
              className="font-display text-base font-semibold text-white/30 transition-colors duration-300 ease-brand hover:text-white/70"
            >
              {name}
            </span>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
