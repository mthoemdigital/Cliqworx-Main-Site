"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Chevron } from "@/components/ui/Chevron";
import { fadeUp, viewportOnce } from "@/lib/motion";

const TAKEAWAYS = [
  "An honest read on your website, systems and marketing",
  "The one thing we'd fix first, and why",
  "A practical 90-day starting roadmap, yours to keep",
];

export function CTASection() {
  return (
    <section className="bg-cliq-white py-20 md:py-28">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeUp}
          className="relative overflow-hidden rounded-lg bg-cliq-gradient px-8 py-14 text-cliq-white sm:px-14 sm:py-16"
          style={{
            clipPath: "polygon(0 0, calc(100% - 56px) 0, 100% 56px, 100% 100%, 0 100%)",
          }}
        >
          <div className="grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                A strategy session, not a sales pitch.
              </h2>
              <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-white/90">
                Thirty minutes with a senior consultant, not an account
                manager. We&apos;ll tell you what we see, what we&apos;d do
                first, and whether we&apos;re the right partner to do it. If
                we&apos;re not, we&apos;ll say so.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <Button href="/consultation" variant="on-gradient" size="lg">
                  Book a Consultation
                </Button>
                <span className="text-sm text-white/75">
                  No obligation · Response within 24 hours
                </span>
              </div>
            </div>
            <ul className="flex flex-col gap-4 border-t border-white/20 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              {TAKEAWAYS.map((item) => (
                <li key={item} className="flex items-baseline gap-3 text-[0.95rem]">
                  <Chevron className="size-3 shrink-0 translate-y-0.5 text-white" strokeWidth={3} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
