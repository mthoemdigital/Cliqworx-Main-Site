"use client";

/* ============================================================
   Digital Strategy — service landing page
   Inherits the Cliqworx / Performance-Marketing design language
   (tokens, cards, buttons, rhythm). Information architecture and
   conversion flow adapted from a consulting-page structure and
   expressed entirely through the existing system. Dark hero reuses
   the homepage media; sections alternate light/dark like the PM page.
   ============================================================ */

import { useCallback, useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";
import Image from "next/image";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  Compass,
  RefreshCw,
  MessageCircle,
  Layers,
  Sparkles,
  Smile,
  Workflow,
  Calendar,
  Search,
  PenTool,
  Rocket,
  TrendingUp,
  Check,
} from "lucide-react";
import { LayeredSlabs } from "@/components/site/Hero";
import { useCountUp } from "@/components/performance/pm-charts";
import { DS_BLUR } from "./ds-blur";

/* ⚠️ Paste your Calendly scheduling URL here to switch every
   "Book a Strategy Session" button to the Calendly popup.
   While empty, the buttons route to the on-site /contact form. */
const CALENDLY_URL = "";

// Brand tokens (mirror globals.css --cw-*)
const PURPLE = "#7B2FFF";
const PURPLE_MID = "#9B5FFF";
const INK = "#1A1A2E";
const BODY = "#555577";
const MUTED = "#8888AA";
const LIGHT_BG = "#F5F5FA";
const DARKER = "#08080E";
const DARK = "#0D0D1A";

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

// ─── Calendly / booking ─────────────────────────────────────────────────────────

type CalendlyWindow = Window & { Calendly?: { initPopupWidget: (o: { url: string }) => void } };

function openCalendly() {
  if (!CALENDLY_URL) return;
  const w = window as CalendlyWindow;
  if (w.Calendly) {
    w.Calendly.initPopupWidget({ url: CALENDLY_URL });
    return;
  }
  if (!document.getElementById("calendly-css")) {
    const link = document.createElement("link");
    link.id = "calendly-css";
    link.rel = "stylesheet";
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    document.head.appendChild(link);
  }
  const s = document.createElement("script");
  s.src = "https://assets.calendly.com/assets/external/widget.js";
  s.async = true;
  s.onload = () => (window as CalendlyWindow).Calendly?.initPopupWidget({ url: CALENDLY_URL });
  document.body.appendChild(s);
}

// Magnetic wrapper: nudges its child toward the cursor. Disabled under reduced motion.
function Magnetic({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, display: "inline-block", transition: "transform 200ms cubic-bezier(0.4,0,0.2,1)" }}
      onMouseMove={(e) => {
        if (reduce || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) * 0.3;
        const y = (e.clientY - (r.top + r.height / 2)) * 0.4;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onMouseLeave={() => {
        if (ref.current) ref.current.style.transform = "translate(0,0)";
      }}
    >
      {children}
    </div>
  );
}

function BookButton({
  children,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  variant?: "primary" | "light";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold min-h-[48px] transition-all duration-200";
  const styles: CSSProperties =
    variant === "light"
      ? { background: "#FFFFFF", color: PURPLE }
      : { background: PURPLE, color: "#fff" };
  const content = (
    <>
      <Calendar size={17} />
      {children}
    </>
  );
  if (!CALENDLY_URL) {
    return (
      <a href="/contact" className={`cta-elevate ${base} ${className}`} style={variant === "light" ? styles : undefined}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={openCalendly}
      className={`${variant === "primary" ? "cta-elevate " : ""}${base} ${className}`}
      style={variant === "light" ? styles : undefined}
    >
      {content}
    </button>
  );
}

// ─── Scroll progress bar ──────────────────────────────────────────────────────

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #7B2FFF, #C4A0FF)" }}
      aria-hidden="true"
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden pt-24 pb-16" style={{ background: DARKER }}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #7B2FFF 0%, transparent 70%)", transform: "translate(20%, -30%)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #5B1FDF 0%, transparent 70%)", transform: "translate(-30%, 30%)" }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="ds-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7B2FFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ds-grid)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-6"
                style={{ background: "rgba(123,47,255,0.15)", color: "#C4A0FF", border: "1px solid rgba(123,47,255,0.25)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] animate-pulse" />
                Digital Strategy
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl xl:text-[3.4rem] font-bold leading-[1.1] text-white mb-6"
            >
              Turn ambition into a{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #9B5FFF 0%, #7B2FFF 50%, #C4A0FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                clear, executable strategy.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: MUTED }}
            >
              We help ambitious businesses cut through complexity, aligning strategy, technology and
              customer experience into a roadmap that actually ships. Fewer slides. More momentum.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <BookButton>Book a Strategy Session</BookButton>
              </Magnetic>
              <a
                href="#how-we-work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:bg-white/5"
                style={{ color: "#CCCCCC", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                See how we work
                <ArrowRight size={15} />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="hidden lg:block"
          >
            <LayeredSlabs />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience strip ─────────────────────────────────────────────────────────

function ExperienceStrip() {
  const orgs = ["Digify", "Sennheiser", "ServCraft", "Legacy Motor Group", "FleetLink", "Syked"];
  return (
    <section className="bg-white py-16" style={{ borderBottom: "1px solid #EEEEF4" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center text-xs font-bold uppercase tracking-[0.18em] mb-10"
          style={{ color: MUTED }}
        >
          Experience working with companies including
        </motion.p>
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {orgs.map((o) => (
            <span key={o} className="text-lg font-bold transition-colors" style={{ color: "#33334D" }}>
              {o}
            </span>
          ))}
        </motion.div>
        <motion.p
          {...fadeUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-xs mt-10 max-w-2xl mx-auto"
          style={{ color: MUTED }}
        >
          Organisations worked with in professional and product roles over the course of a career, not a
          list of consulting clients. Shared to give an honest sense of the environments and problems
          this experience is drawn from.
        </motion.p>
      </div>
    </section>
  );
}

// ─── How we work ──────────────────────────────────────────────────────────────

function HowWeWork() {
  const steps = [
    { Icon: Search, title: "Discover", body: "We get to the truth of your business, market and constraints, so the plan is built on evidence, not assumptions." },
    { Icon: PenTool, title: "Strategise", body: "We shape a prioritised roadmap that connects goals to the specific moves that create leverage." },
    { Icon: Rocket, title: "Build", body: "We turn the strategy into working systems and experiences, shipping in focused, measurable increments." },
    { Icon: TrendingUp, title: "Scale", body: "We compound what works, refine what doesn't, and build the capability to keep growing without us." },
  ];
  return (
    <section id="how-we-work" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
            How we work
          </p>
          <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight" style={{ color: INK }}>
            A clear path from ambition to outcome
          </h2>
        </motion.div>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px origin-left"
            style={{ background: "rgba(123,47,255,0.25)" }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            aria-hidden="true"
          />
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              {...fadeUp}
              transition={{ duration: 0.55, delay: i * 0.12 }}
              className="relative text-center lg:text-left rounded-2xl p-7 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(123,47,255,0.1)]"
              style={{ border: "1px solid #ECECF2" }}
            >
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 mx-auto lg:mx-0 relative z-10"
                style={{
                  background: i === 0 ? PURPLE : "#F4F2FE",
                  boxShadow: i === 0 ? "0 12px 28px rgba(123,47,255,0.35)" : "none",
                }}
              >
                <s.Icon size={22} style={{ color: i === 0 ? "#fff" : PURPLE }} />
              </div>
              <div className="text-xs font-bold mb-2" style={{ color: PURPLE }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ color: INK }}>
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                {s.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Services (interactive) ──────────────────────────────────────────────────

const SERVICES = [
  { Icon: Compass, name: "Digital Strategy", body: "A clear, prioritised roadmap that connects business goals to the digital moves that matter, so every investment compounds instead of scattering.", outcomes: ["Prioritised roadmap", "Aligned leadership", "Measurable milestones"] },
  { Icon: RefreshCw, name: "Digital Transformation", body: "Modernise how your business operates, from systems to culture, without stalling the work that pays the bills.", outcomes: ["Modern operating model", "Lower manual effort", "Change that sticks"] },
  { Icon: MessageCircle, name: "WhatsApp Powered Consumer Education", body: "Meet customers where they already are. Conversational journeys that educate, qualify and convert at scale.", outcomes: ["Higher understanding", "Qualified enquiries", "Scalable reach"] },
  { Icon: Layers, name: "Fractional Product Management", body: "Senior product leadership on demand: direction, discovery and delivery without a full-time hire.", outcomes: ["Clear product direction", "Faster delivery", "Confident decisions"] },
  { Icon: Sparkles, name: "AI Readiness & Strategy", body: "Separate signal from hype. A pragmatic plan to adopt AI where it creates real leverage for your business.", outcomes: ["Honest readiness view", "Prioritised use cases", "First practical wins"] },
  { Icon: Smile, name: "Customer Experience", body: "Design the end-to-end journey so every touchpoint builds trust and moves people forward.", outcomes: ["Mapped journeys", "Fewer drop-offs", "Stronger loyalty"] },
  { Icon: Workflow, name: "Process Optimisation", body: "Remove friction and manual work. Streamlined operations that scale without breaking.", outcomes: ["Streamlined operations", "Reclaimed hours", "Scalable systems"] },
];

function Services() {
  const [active, setActive] = useState(0);
  const svc = SERVICES[active];
  return (
    <section id="services" className="py-24" style={{ background: LIGHT_BG }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-14 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
            Focus areas
          </p>
          <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight" style={{ color: INK }}>
            Where strategy turns into an advantage
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 items-stretch mb-10">
          {/* Left: explanation */}
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="flex flex-col justify-center">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: "rgba(123,47,255,0.1)" }}>
                <svc.Icon size={22} style={{ color: PURPLE }} />
              </div>
              <h3 className="text-2xl font-bold mb-3" style={{ color: INK }}>
                {svc.name}
              </h3>
              <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: BODY }}>
                {svc.body}
              </p>
              <ul className="space-y-2.5">
                {svc.outcomes.map((o) => (
                  <li key={o} className="flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: "rgba(123,47,255,0.1)" }}>
                      <Check size={11} style={{ color: PURPLE }} />
                    </span>
                    <span className="text-sm" style={{ color: BODY }}>
                      {o}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right: floating focus card */}
          <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-3xl p-8 h-full flex flex-col justify-between overflow-hidden relative"
              style={{ background: DARK, border: "1px solid rgba(123,47,255,0.2)", boxShadow: "0 40px 90px rgba(8,8,14,0.2)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-70"
                style={{ background: "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(123,47,255,0.25), transparent 60%)" }}
                aria-hidden="true"
              />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-[0.16em] mb-6" style={{ color: PURPLE_MID }}>
                  Focus area {String(active + 1).padStart(2, "0")} / {String(SERVICES.length).padStart(2, "0")}
                </p>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: "rgba(123,47,255,0.2)", border: "1px solid rgba(123,47,255,0.3)" }}>
                  <svc.Icon size={28} style={{ color: "#C4A0FF" }} />
                </div>
                <h4 className="text-2xl font-bold text-white leading-snug">{svc.name}</h4>
              </div>
              <div className="relative flex flex-wrap gap-2 mt-8">
                {svc.outcomes.map((o) => (
                  <span key={o} className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(123,47,255,0.15)", color: "#C4A0FF" }}>
                    {o}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Interactive service nav */}
        <div className="flex flex-wrap gap-3" role="tablist" aria-label="Focus areas">
          {SERVICES.map((s, i) => (
            <button
              key={s.name}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: active === i ? PURPLE : "#FFFFFF",
                color: active === i ? "#fff" : "#33334D",
                border: `1px solid ${active === i ? PURPLE : "#E6E6EE"}`,
                boxShadow: active === i ? "0 10px 24px rgba(123,47,255,0.28)" : "0 1px 2px rgba(17,17,17,0.04)",
              }}
            >
              <s.Icon size={15} style={{ color: active === i ? "#fff" : PURPLE }} />
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured transformation (carousel) ──────────────────────────────────────

const SLIDES = [
  {
    num: "01",
    tag: "Strategy & Discovery Workshop",
    title: "Clarity before capital",
    challenge:
      "Ambition outpacing direction: competing priorities, no shared view of where to invest first, and decisions stalling in committee.",
    outcome:
      "A facilitated discovery that surfaced the real constraints and produced a sequenced roadmap the whole leadership team could commit to.",
    image: "/digital-strategy/ds-strategy-discovery.jpg",
  },
  {
    num: "02",
    tag: "WhatsApp Consumer Education",
    title: "Turning a complex product into everyday understanding",
    challenge:
      "A product most customers didn't fully understand, leaving enquiries unqualified and the path to a decision slow.",
    outcome:
      "A WhatsApp-led education journey that met people where they already were, lifting qualified enquiries and shortening the sales cycle.",
    image: "/digital-strategy/ds-whatsapp-education.jpg",
  },
  {
    num: "03",
    tag: "AI Readiness & Process Optimisation",
    title: "A pragmatic path through the AI noise",
    challenge:
      "Pressure to 'do something with AI' with no honest view of where it would actually help, and manual processes quietly capping delivery.",
    outcome:
      "A prioritised readiness roadmap that separated signal from hype, delivered the first practical wins, and reclaimed hours every week.",
    image: "/digital-strategy/ds-ai-readiness.jpg",
  },
];

// Sequential text reveal for the active slide (opacity + rise + blur clearing).
const copyGroup = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const copyItem = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

function FeaturedTransformation() {
  const n = SLIDES.length;
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Scroll becomes the storytelling mechanism on desktop: the section pins and
  // each case study hands over to the next as you scroll. Native sticky is used
  // instead of a ScrollTrigger pin so it never fights Lenis' smooth scrolling.
  const scrollDriven = isDesktop && !reduce;

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-20, 20]);

  // Index is derived from a plain scroll listener rather than the motion value:
  // it recomputes from geometry on every frame that matters, so it can never
  // miss a transition (including landing exactly at the start of the runway).
  useEffect(() => {
    if (!scrollDriven) return;
    let raf = 0;
    const measure = () => {
      const el = wrapRef.current;
      if (!el) return;
      const distance = el.offsetHeight - window.innerHeight;
      if (distance <= 0) return;
      const p = Math.min(1, Math.max(0, -el.getBoundingClientRect().top / distance));
      setActive(Math.round(p * (n - 1)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [scrollDriven, n]);

  const goTo = useCallback(
    (idx: number) => {
      const next = (idx + n) % n;
      setActive(next);
      if (scrollDriven && wrapRef.current) {
        const el = wrapRef.current;
        // Absolute document offset: offsetTop is relative to the positioned
        // ancestor, which would land us near the top of the page.
        const absTop = el.getBoundingClientRect().top + window.scrollY;
        const distance = el.offsetHeight - window.innerHeight;
        // Instant: the section is pinned, so only the slide changes on screen.
        window.scrollTo({ top: absTop + (next / (n - 1)) * distance, behavior: "auto" });
      }
    },
    [n, scrollDriven]
  );

  // Gentle autoplay only where scroll isn't already driving the story.
  useEffect(() => {
    if (scrollDriven || reduce || paused) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), 9000);
    return () => window.clearInterval(t);
  }, [scrollDriven, reduce, paused, n]);

  const slide = SLIDES[active];

  return (
    <section id="work" className="relative" style={{ background: DARKER }} aria-labelledby="ds-work-heading">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(123,47,255,0.14), transparent 60%)" }}
        aria-hidden="true"
      />

      <div ref={wrapRef} style={scrollDriven ? { height: `${n * 100}vh` } : undefined}>
        <div className={scrollDriven ? "sticky top-0 h-screen flex items-center overflow-hidden" : ""}>
          <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-10">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-8 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.18em] mb-3" style={{ color: PURPLE_MID }}>
                Featured transformation
              </p>
              <h2 id="ds-work-heading" className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight text-white">
                Strategy you can see the results of
              </h2>
            </motion.div>

            {/* Carousel: masked reveal on entry, then slide-to-slide cinema */}
            <motion.div
              initial={reduce ? false : { clipPath: "inset(10% 6% 10% 6% round 28px)", opacity: 0 }}
              whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)", opacity: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-[28px] overflow-hidden"
              style={{ border: "1px solid rgba(123,47,255,0.18)" }}
              role="region"
              aria-roledescription="carousel"
              aria-label="Featured transformations"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "ArrowRight") { e.preventDefault(); goTo(active + 1); }
                if (e.key === "ArrowLeft") { e.preventDefault(); goTo(active - 1); }
              }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
              onFocus={() => setPaused(true)}
              onBlur={() => setPaused(false)}
            >
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.16}
                onDragStart={() => setDragging(true)}
                onDragEnd={(_, info) => {
                  setDragging(false);
                  if (info.offset.x < -60 || info.velocity.x < -450) goTo(active + 1);
                  else if (info.offset.x > 60 || info.velocity.x > 450) goTo(active - 1);
                }}
                className={`relative h-[340px] sm:h-[420px] lg:h-[54vh] ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
              >
                {SLIDES.map((s, idx) => {
                  const isActive = idx === active;
                  return (
                    <motion.div
                      key={s.num}
                      className="absolute inset-0"
                      aria-hidden={!isActive}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        scale: isActive ? 1 : 0.96,
                        filter: isActive ? "blur(0px)" : "blur(6px)",
                        x: isActive ? 0 : idx < active ? -48 : 48,
                      }}
                      transition={{ duration: reduce ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}
                      style={{ pointerEvents: isActive ? "auto" : "none" }}
                    >
                      {/* Media: parallax + slow Ken Burns drift */}
                      <motion.div className="absolute inset-0" style={{ y: parallaxY }}>
                        <motion.div
                          className="absolute inset-[-3%]"
                          animate={reduce || !isActive ? { scale: 1 } : { scale: [1, 1.05, 1] }}
                          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <Image
                            src={s.image}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 1200px"
                            placeholder="blur"
                            blurDataURL={DS_BLUR[s.image.split("/").pop() as string]}
                            className="object-cover"
                            draggable={false}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Legibility scrim */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(90deg, rgba(8,8,14,0.92) 0%, rgba(8,8,14,0.72) 38%, rgba(8,8,14,0.15) 70%, rgba(8,8,14,0.35) 100%)",
                        }}
                        aria-hidden="true"
                      />
                    </motion.div>
                  );
                })}

                {/* Glass overlay panel — content sits on the image */}
                <div className="absolute inset-0 flex items-center pointer-events-none">
                  <motion.div
                    key={active}
                    variants={reduce ? undefined : copyGroup}
                    initial={reduce ? false : "hidden"}
                    animate={reduce ? undefined : "show"}
                    className="pointer-events-auto m-5 sm:m-8 lg:m-10 max-w-xl rounded-2xl p-6 sm:p-8"
                    style={{
                      background: "rgba(8,8,14,0.55)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      border: "1px solid rgba(123,47,255,0.22)",
                      boxShadow: "0 30px 70px rgba(0,0,0,0.45)",
                    }}
                  >
                    <motion.div variants={copyItem} className="flex items-center gap-3 mb-4">
                      <span className="text-sm font-extrabold tabular-nums" style={{ color: PURPLE_MID }}>
                        {slide.num}
                      </span>
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full text-white"
                        style={{ background: "rgba(123,47,255,0.28)" }}
                      >
                        {slide.tag}
                      </span>
                    </motion.div>
                    <motion.h3
                      variants={copyItem}
                      className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug mb-4"
                    >
                      {slide.title}
                    </motion.h3>
                    <motion.p variants={copyItem} className="text-sm leading-relaxed mb-3" style={{ color: "#C6C6DA" }}>
                      {slide.challenge}
                    </motion.p>
                    <motion.p variants={copyItem} className="text-sm leading-relaxed mb-6" style={{ color: "#E4E4F0" }}>
                      <span className="font-bold" style={{ color: PURPLE_MID }}>
                        Outcome:{" "}
                      </span>
                      {slide.outcome}
                    </motion.p>
                    <motion.div variants={copyItem}>
                      <BookButton>Book a Strategy Session</BookButton>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Controls: prev · numbered progress · next */}
            <div className="flex items-center justify-between gap-6 mt-8">
              <button
                onClick={() => goTo(active - 1)}
                aria-label="Previous transformation"
                className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(123,47,255,0.3)", color: "#C4A0FF" }}
              >
                <ArrowRight size={17} style={{ transform: "rotate(180deg)" }} />
              </button>

              <div className="flex-1 flex items-center gap-3" role="tablist" aria-label="Transformations">
                {SLIDES.map((s, idx) => (
                  <div key={s.num} className="flex items-center gap-3 flex-1 last:flex-none">
                    <button
                      role="tab"
                      aria-selected={active === idx}
                      aria-label={`${s.num}. ${s.tag}`}
                      onClick={() => goTo(idx)}
                      className="text-sm font-extrabold tabular-nums transition-colors duration-300"
                      style={{ color: active === idx ? "#FFFFFF" : "#55557A" }}
                    >
                      {s.num}
                    </button>
                    {idx < n - 1 && (
                      <span className="relative h-px flex-1" style={{ background: "rgba(155,95,255,0.22)" }} aria-hidden="true">
                        <motion.span
                          className="absolute inset-y-0 left-0 origin-left"
                          style={{ background: PURPLE_MID, width: "100%" }}
                          initial={false}
                          animate={{ scaleX: active > idx ? 1 : 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => goTo(active + 1)}
                aria-label="Next transformation"
                className="w-11 h-11 shrink-0 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: PURPLE, border: `1px solid ${PURPLE}`, color: "#fff" }}
              >
                <ArrowRight size={17} />
              </button>
            </div>

            <p className="sr-only" aria-live="polite">
              {`Slide ${active + 1} of ${n}: ${slide.tag}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Experience counters ──────────────────────────────────────────────────────

function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const c = useCountUp(value);
  return (
    <motion.div {...fadeUp} transition={{ duration: 0.5, delay }} className="rounded-2xl p-7" style={{ background: LIGHT_BG, border: "1px solid #ECECF2" }}>
      <p className="text-4xl lg:text-5xl font-extrabold leading-none mb-3" style={{ color: INK }}>
        <span ref={c.ref}>{c.display}</span>
        {suffix}
      </p>
      <p className="text-sm leading-relaxed" style={{ color: BODY }}>
        {label}
      </p>
    </motion.div>
  );
}

function ExperienceCounters() {
  const stats = [
    { value: 12, suffix: "+", label: "Years across strategy, product & delivery" },
    { value: 40, suffix: "+", label: "Projects shaped and shipped" },
    { value: 8, suffix: "", label: "Industries worked across" },
    { value: 6, suffix: "", label: "Organisations partnered with" },
  ];
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-14 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
            Experience
          </p>
          <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight" style={{ color: INK }}>
            Senior experience, applied to your hardest problems
          </h2>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} delay={idx * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Insights preview ─────────────────────────────────────────────────────────

function InsightsPreview() {
  const posts = [
    { category: "Strategy", title: "What digital strategy actually is (and what it isn't)", excerpt: "A practical definition of digital strategy, and how to tell a real roadmap from an expensive slide deck.", read: "6 min read", image: "/digital-strategy/ds-insight-roadmap.jpg" },
    { category: "AI", title: "A pragmatic framework for AI readiness", excerpt: "How to assess where AI genuinely helps your business, and where it is simply noise you can skip.", read: "7 min read", image: "/digital-strategy/ds-insight-ai.jpg" },
    { category: "Transformation", title: "Why transformation stalls, and how to keep it shipping", excerpt: "The quiet reasons change programmes lose momentum, and a simple operating rhythm that prevents it.", read: "8 min read", image: "/digital-strategy/ds-insight-cx.jpg" },
  ];
  return (
    <section id="insights" className="py-24" style={{ background: LIGHT_BG }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="flex items-end justify-between mb-14 gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
              Insights
            </p>
            <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight" style={{ color: INK }}>
              Thinking on digital strategy and transformation
            </h2>
          </div>
          <a href="/contact" className="hidden sm:inline-flex items-center gap-2 text-sm font-bold shrink-0" style={{ color: PURPLE }}>
            View all insights
            <ArrowRight size={15} />
          </a>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, idx) => (
            <motion.a
              key={p.title}
              href="/contact"
              {...fadeUp}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group flex flex-col rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(123,47,255,0.12)]"
              style={{ border: "1px solid #E6E6EE" }}
            >
              <div className="relative h-44 overflow-hidden" style={{ background: "#12121F" }}>
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  placeholder="blur"
                  blurDataURL={DS_BLUR[p.image.split("/").pop() as string]}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full text-white" style={{ background: "rgba(8,8,14,0.55)", backdropFilter: "blur(4px)" }}>
                  {p.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold leading-snug mb-3" style={{ color: INK }}>{p.title}</h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: BODY }}>{p.excerpt}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs" style={{ color: MUTED }}>{p.read}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold transition-transform group-hover:translate-x-0.5" style={{ color: PURPLE }}>
                    Read article
                    <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  return (
    <section className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.p {...fadeUp} transition={{ duration: 0.6 }} className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
          Newsletter
        </motion.p>
        <motion.h2 {...fadeUp} transition={{ duration: 0.6, delay: 0.05 }} className="text-3xl lg:text-[2.2rem] font-extrabold leading-tight mb-8" style={{ color: INK }}>
          Stay ahead with digital strategy insights
        </motion.h2>
        {done ? (
          <motion.p initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-base font-semibold" style={{ color: PURPLE }} role="status">
            You&apos;re on the list. Thank you.
          </motion.p>
        ) : (
          <motion.form
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (!/.+@.+\..+/.test(email)) {
                setError("Please enter a valid email address.");
                return;
              }
              setError("");
              setDone(true);
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            noValidate
          >
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              aria-label="Email address"
              aria-invalid={!!error}
              className="flex-1 px-5 py-3.5 rounded-xl text-sm outline-none transition-all duration-200"
              style={{ background: LIGHT_BG, border: `1px solid ${error ? "#FF7A9A" : "#E6E6EE"}`, color: INK }}
              onFocus={(e) => (e.target.style.borderColor = PURPLE)}
              onBlur={(e) => (e.target.style.borderColor = error ? "#FF7A9A" : "#E6E6EE")}
            />
            <button type="submit" className="cta-elevate px-6 py-3.5 rounded-xl text-sm font-bold text-white whitespace-nowrap">
              Subscribe
            </button>
          </motion.form>
        )}
        {error && (
          <p role="alert" className="text-xs mt-3" style={{ color: "#D6336C" }}>
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-24 px-6" style={{ background: DARKER }}>
      <div
        className="relative max-w-5xl mx-auto rounded-3xl px-8 py-16 lg:px-16 text-center overflow-hidden"
        style={{ background: DARK, border: "1px solid rgba(123,47,255,0.2)", boxShadow: "0 0 80px rgba(123,47,255,0.12) inset" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(123,47,255,0.28), transparent 65%)" }} aria-hidden="true" />
        <motion.div {...fadeUp} transition={{ duration: 0.7 }} className="relative">
          <h2 className="text-3xl lg:text-[2.6rem] font-extrabold text-white mb-4 leading-tight">Ready to transform your business?</h2>
          <p className="text-base max-w-md mx-auto mb-9" style={{ color: "#B8B8CC" }}>
            Book a focused strategy session. No pitch, no pressure, just a clear, honest read on your
            biggest opportunities and what to do first.
          </p>
          <Magnetic>
            <BookButton>Book a Strategy Session</BookButton>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Sticky mobile CTA ────────────────────────────────────────────────────────

function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden p-3" style={{ background: "rgba(8,8,14,0.9)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(123,47,255,0.2)" }}>
      <BookButton className="w-full">Book a Strategy Session</BookButton>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function DigitalStrategy() {
  return (
    <main className="bg-white">
      <ScrollProgress />
      <Hero />
      <ExperienceStrip />
      <HowWeWork />
      <Services />
      <FeaturedTransformation />
      <ExperienceCounters />
      <InsightsPreview />
      <Newsletter />
      <FinalCTA />
      <StickyMobileCTA />
    </main>
  );
}
