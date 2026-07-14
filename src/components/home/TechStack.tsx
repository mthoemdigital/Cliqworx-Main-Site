"use client";

import { motion } from "framer-motion";
import { ShoppingBag, FileCode2, Triangle, GitFork, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

const STACK = [
  { name: "Shopify", icon: ShoppingBag },
  { name: "WordPress", icon: FileCode2 },
  { name: "Vercel", icon: Triangle },
  { name: "GitHub", icon: GitFork },
  { name: "Claude", icon: Sparkles },
];

export function TechStack() {
  return (
    <section className="border-t border-cliq-light-grey bg-cliq-white py-20 md:py-24">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-10 max-w-2xl"
        >
          <Overline>What we build on</Overline>
          <h2 className="mt-5 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">
            Proven platforms, applied with AI-first judgement.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5"
        >
          {STACK.map(({ name, icon: Icon }) => (
            <motion.div
              key={name}
              variants={fadeUp}
              className="flex flex-col items-center justify-center gap-3 rounded-md border border-cliq-light-grey bg-cliq-white px-4 py-8 text-center transition-colors duration-300 ease-brand hover:border-cliq-purple/40"
            >
              <Icon size={28} strokeWidth={1.75} className="text-cliq-black" />
              <span className="font-display text-sm font-semibold text-cliq-black">
                {name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
