"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

type CaseStudy = {
  client: string;
  tag: string;
  challenge: string;
  solution: string;
  outcome: string;
  kpi: { value: string; label: string; timeframe: string };
  extras: { value: string; label: string }[];
};

const caseStudies: CaseStudy[] = [
  {
    client: "BayCraft",
    tag: "E-commerce / Strategy + Build",
    challenge:
      "Stagnant conversion on a high-traffic DTC store. Three agencies in 18 months had not moved the number.",
    solution:
      "Full CRO audit and a rebuilt checkout flow. AI-assisted personalisation and evidence-backed product pages.",
    outcome: "Conversion up 41% within 60 days of launch.",
    kpi: { value: "+41%", label: "Conversion Rate", timeframe: "60 Days" },
    extras: [{ value: "-28%", label: "Cart abandonment" }],
  },
  {
    client: "Digity Africa",
    tag: "Growth / Performance Marketing",
    challenge:
      "Cost per acquisition was spiralling on paid social. Lead quality made scaling impossible.",
    solution:
      "Campaign structure rebuilt from scratch with lead scoring. Dedicated landing pages and automated nurture sequences.",
    outcome: "Acquisition costs down 48% with far stronger leads.",
    kpi: { value: "-48%", label: "Cost Per Acquisition", timeframe: "2.1x Lead Quality" },
    extras: [{ value: "-19 days", label: "Sales cycle" }],
  },
  {
    client: "Creditworx",
    tag: "Strategy + Growth / Financial Services",
    challenge:
      "A commoditised market with low digital trust. The pipeline relied almost entirely on referrals.",
    solution:
      "Content authority strategy and a full SEO rebuild. Self-qualifying lead funnel with AI pre-screening.",
    outcome: "3.2x lead growth in 90 days with organic traffic up 180%.",
    kpi: { value: "3.2x", label: "Lead Growth", timeframe: "90 Days" },
    extras: [{ value: "+180%", label: "Organic traffic" }],
  },
];

export function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const cardStep = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.querySelector<HTMLElement>("[data-card]");
    if (!card) return 0;
    const gap = 24;
    return card.offsetWidth + gap;
  }, []);

  const syncState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = cardStep();
    if (step > 0) {
      setActive(Math.min(caseStudies.length - 1, Math.round(track.scrollLeft / step)));
    }
    setAtStart(track.scrollLeft <= 4);
    setAtEnd(track.scrollLeft >= track.scrollWidth - track.clientWidth - 4);
  }, [cardStep]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    syncState();
    track.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);
    return () => {
      track.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [syncState]);

  // Native smooth scrolling is cancelled by mandatory scroll-snap in Chromium
  // (the snap controller re-snaps to the origin card mid-animation). Tween
  // scrollLeft manually each frame and land exactly on the snap point instead.
  const tweenRef = useRef<number>(0);
  function scrollToIndex(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(caseStudies.length - 1, i));
    const target = clamped * cardStep();
    cancelAnimationFrame(tweenRef.current);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.scrollLeft = target;
      return;
    }
    const from = track.scrollLeft;
    const distance = target - from;
    const duration = 450;
    const start = performance.now();
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      track.scrollLeft = from + distance * easeInOutCubic(t);
      if (t < 1) tweenRef.current = requestAnimationFrame(frame);
    };
    tweenRef.current = requestAnimationFrame(frame);
  }

  function nudge(dir: 1 | -1) {
    scrollToIndex(active + dir);
  }

  return (
    <section ref={ref} id="proof" className="py-24" style={{ background: "#F5F5FA" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Proven results
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold leading-snug" style={{ color: "#1A1A2E" }}>
            Businesses don&apos;t hire us
            <br />
            to do the work.
            <span className="block" style={{ color: "#555577" }}>
              They hire us to grow the business.
            </span>
          </h2>
          <p className="mt-5 text-base max-w-xl" style={{ color: "#555577" }}>
            Every engagement is measured by what matters most: qualified leads, stronger conversion
            rates, sustainable growth and measurable revenue.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none" }}
            role="region"
            aria-label="Case studies carousel"
          >
            {caseStudies.map((cs, i) => (
              <motion.article
                key={cs.client}
                data-card
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="flex-none w-[92%] sm:w-[85%] lg:w-[72%] snap-start rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(123,47,255,0.12)]"
                style={{ border: "1px solid rgba(123,47,255,0.12)" }}
              >
                <div className="grid lg:grid-cols-[65%_35%] h-full">
                  {/* Left: narrative */}
                  <div className="p-8 lg:p-10" style={{ background: "#FFFFFF" }}>
                    <div className="mb-6">
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
                    <div className="space-y-4">
                      {[
                        { label: "Challenge", text: cs.challenge },
                        { label: "Solution", text: cs.solution },
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
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-bold mt-6 transition-colors hover:opacity-80"
                      style={{ color: "#7B2FFF" }}
                    >
                      View Case Study
                      <ArrowRight size={15} aria-hidden="true" />
                    </a>
                  </div>

                  {/* Right: featured KPI */}
                  <div
                    className="p-8 lg:p-10 flex flex-col justify-center gap-6"
                    style={{ background: "var(--cw-dark)" }}
                  >
                    <div>
                      <p className="text-5xl font-bold text-white">{cs.kpi.value}</p>
                      <p className="text-sm font-semibold mt-2" style={{ color: "#C4A0FF" }}>
                        {cs.kpi.label}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#8888AA" }}>
                        {cs.kpi.timeframe}
                      </p>
                    </div>
                    {cs.extras.map((stat) => (
                      <div key={stat.label} className="pt-4" style={{ borderTop: "1px solid rgba(123,47,255,0.18)" }}>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                        <p className="text-xs mt-1" style={{ color: "#8888AA" }}>
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2" role="tablist" aria-label="Case study pages">
              {caseStudies.map((cs, i) => (
                <button
                  key={cs.client}
                  role="tab"
                  aria-selected={active === i}
                  aria-label={`Go to case study ${i + 1}: ${cs.client}`}
                  onClick={() => scrollToIndex(i)}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "28px" : "10px",
                    background: active === i ? "#7B2FFF" : "rgba(123,47,255,0.25)",
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label="Previous case study"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-35 disabled:hover:translate-y-0"
                style={{ background: "#FFFFFF", border: "1px solid rgba(123,47,255,0.25)", color: "#7B2FFF" }}
              >
                <ArrowLeft size={17} aria-hidden="true" />
              </button>
              <button
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label="Next case study"
                className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-35 disabled:hover:translate-y-0"
                style={{ background: "#7B2FFF", border: "1px solid #7B2FFF", color: "#FFFFFF" }}
              >
                <ArrowRight size={17} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
