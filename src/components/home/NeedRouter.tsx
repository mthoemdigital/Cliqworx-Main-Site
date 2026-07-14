"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Globe,
  TrendingUp,
  Zap,
  Search,
  Compass,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { Chevron } from "@/components/ui/Chevron";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

type Need = {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
};

const NEEDS: Need[] = [
  {
    icon: Globe,
    title: "I need a website",
    description: "Design and build that converts, not a brochure.",
    href: "/#technology",
  },
  {
    icon: TrendingUp,
    title: "I need more leads",
    description: "Campaigns measured on sales, not clicks.",
    href: "/#growth",
  },
  {
    icon: Zap,
    title: "I need automation",
    description: "Cut the busywork with connected systems.",
    href: "/#technology",
  },
  {
    icon: Search,
    title: "I need to rank on Google",
    description: "SEO that compounds month after month.",
    href: "/#technology",
  },
  {
    icon: Compass,
    title: "I need a clear strategy",
    description: "Know what to fix first, and why.",
    href: "/#strategy",
  },
  {
    icon: Briefcase,
    title: "Show me your work",
    description: "Real businesses, real results.",
    href: "/#case-studies",
  },
];

export function NeedRouter() {
  return (
    <section className="bg-cliq-white py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="mb-12 max-w-2xl"
        >
          <Overline>Start here</Overline>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            What does your business need next?
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {NEEDS.map((need) => {
            const Icon = need.icon;
            return (
              <motion.div key={need.title} variants={fadeUp}>
                <Link
                  href={need.href}
                  className="group flex h-full flex-col gap-4 rounded-md border border-cliq-light-grey bg-cliq-white p-6 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-cliq-purple hover:shadow-cliq-md"
                >
                  <span className="flex size-11 items-center justify-center rounded-sm bg-[#F6F3FF] text-cliq-purple transition-transform duration-300 ease-brand group-hover:scale-110">
                    <Icon size={20} strokeWidth={2} />
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-base font-semibold">{need.title}</h3>
                    <p className="mt-1 text-sm text-cliq-slate">{need.description}</p>
                  </div>
                  <span className="flex items-center gap-2 text-sm font-semibold text-cliq-purple-aa opacity-0 transition-opacity duration-300 ease-brand group-hover:opacity-100">
                    Explore
                    <Chevron className="size-3" strokeWidth={2.5} />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
