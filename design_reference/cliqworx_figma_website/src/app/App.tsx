import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  Zap,
  Target,
  TrendingUp,
  BarChart3,
  Settings,
  Cpu,
  CheckCircle2,
} from "lucide-react";

// ─── Brand Logo ───────────────────────────────────────────────────────────────
function CliqworxLogo({ dark = false }: { dark?: boolean }) {
  const textColor = dark ? "#1A1A2E" : "#FFFFFF";
  return (
    <div className="flex items-center gap-3">
      {/* Ck mark */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M30 8A16 16 0 1 0 30 28"
          stroke={dark ? "#1A1A2E" : "#FFFFFF"}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M20 12L13 18L20 24"
          stroke="#7B2FFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      <span className="text-xl font-bold tracking-tight leading-none" style={{ color: textColor }}>
        Cliq<span style={{ color: "#7B2FFF" }}>Worx</span>
      </span>
    </div>
  );
}

// ─── Nav ──────────────────────────────────────────────────────────────────────
const navItems = [
  {
    label: "Strategy",
    anchor: "#strategy",
    items: [
      "Digital Strategy",
      "Digital Transformation",
      "Fractional Product Management",
      "AI Readiness & Strategy",
      "Customer Experience",
      "Process Optimisation",
    ],
    industries: ["Education", "Financial Services", "Transport & Logistics", "Healthtech", "E-commerce", "SMEs"],
  },
  {
    label: "Build",
    anchor: "#build",
    items: [
      "Web Applications",
      "Website Design & Build",
      "AI-Powered Solutions",
      "Automation",
      "CRM & Systems Integrations",
      "SEO & CRO",
    ],
  },
  {
    label: "Growth",
    anchor: "#growth",
    items: [
      "Performance Marketing",
      "Lead Generation",
      "Marketing Automation",
      "Landing Pages",
      "Analytics & Reporting",
      "AI-Assisted Optimisation",
    ],
  },
];

function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(8,8,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(123,47,255,0.15)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <CliqworxLogo />

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpen(item.label)}
                onMouseLeave={() => setOpen(null)}
              >
                <a
                  href={item.anchor}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
                  style={{ color: open === item.label ? "#C4A0FF" : "#CCCCCC" }}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: open === item.label ? "rotate(180deg)" : "none" }}
                  />
                </a>

                <AnimatePresence>
                  {open === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-0 mt-2 rounded-xl overflow-hidden shadow-2xl"
                      style={{
                        background: "#0D0D1A",
                        border: "1px solid rgba(123,47,255,0.2)",
                        minWidth: "560px",
                      }}
                    >
                      <div className="p-6">
                        <p
                          className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                          style={{ color: "#7B2FFF" }}
                        >
                          {item.label}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {item.items.map((sub) => (
                            <div
                              key={sub}
                              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-default"
                              style={{ color: "#AAAACC" }}
                            >
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: "#7B2FFF" }}
                              />
                              {sub}
                            </div>
                          ))}
                        </div>
                        {item.industries && (
                          <div className="mt-4 pt-4" style={{ borderTop: "1px solid rgba(123,47,255,0.12)" }}>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] mb-3" style={{ color: "#555577" }}>
                              Industries
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.industries.map((ind) => (
                                <span
                                  key={ind}
                                  className="text-xs px-3 py-1 rounded-full"
                                  style={{ background: "rgba(123,47,255,0.12)", color: "#C4A0FF" }}
                                >
                                  {ind}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "#7B2FFF", color: "#FFFFFF" }}
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile */}
          <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden"
            style={{ background: "#0D0D1A", borderTop: "1px solid rgba(123,47,255,0.15)" }}
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <a
                    href={item.anchor}
                    className="block text-base font-semibold text-white mb-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                  <div className="pl-3 space-y-1">
                    {item.items.map((sub) => (
                      <p key={sub} className="text-sm py-1" style={{ color: "#8888AA" }}>
                        {sub}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
              <a
                href="#contact"
                className="block w-full text-center px-5 py-3 rounded-lg text-sm font-bold mt-4"
                style={{ background: "#7B2FFF", color: "#FFFFFF" }}
                onClick={() => setMobileOpen(false)}
              >
                Book a Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ─── Layered 3D Slab Visual ───────────────────────────────────────────────────
function LayeredSlabs() {
  const slabs = [
    { label: "Strategy", color: "#7B2FFF", sub: "Direction. Diagnosis. Roadmap.", z: 80 },
    { label: "Technology", color: "#5B1FDF", sub: "Build. Integrate. Automate.", z: 40 },
    { label: "Growth", color: "#3B0FAF", sub: "Acquire. Convert. Scale.", z: 0 },
  ];

  return (
    <div className="relative flex items-center justify-center" style={{ height: "420px", perspective: "1200px" }}>
      {/* Glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(ellipse at center, rgba(123,47,255,0.3) 0%, transparent 70%)",
          transform: "translateY(20px)",
        }}
      />

      <motion.div
        animate={{ rotateY: [-8, 8, -8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d", position: "relative" }}
      >
        {slabs.map((slab, i) => (
          <motion.div
            key={slab.label}
            initial={{ opacity: 0, z: -40 }}
            animate={{ opacity: 1, z: 0 }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
            style={{
              position: "absolute",
              width: "320px",
              left: "-160px",
              top: `${i * 68 - 68}px`,
              transform: `translateZ(${slab.z}px) rotateX(8deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Connector line */}
            {i < slabs.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "-20px",
                  width: "1px",
                  height: "20px",
                  background: `linear-gradient(to bottom, ${slab.color}, transparent)`,
                }}
              />
            )}

            {/* Slab card */}
            <div
              className="rounded-xl px-5 py-4 flex items-center gap-4"
              style={{
                background: `linear-gradient(135deg, ${slab.color}22 0%, ${slab.color}11 100%)`,
                border: `1px solid ${slab.color}55`,
                backdropFilter: "blur(12px)",
                boxShadow: `0 8px 40px ${slab.color}22, 0 0 0 1px ${slab.color}22 inset`,
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${slab.color}33`, border: `1px solid ${slab.color}55` }}
              >
                {i === 0 ? (
                  <Target size={18} color={slab.color} />
                ) : i === 1 ? (
                  <Cpu size={18} color={slab.color} />
                ) : (
                  <TrendingUp size={18} color={slab.color} />
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{slab.label}</p>
                <p className="text-xs mt-0.5" style={{ color: "#8888AA" }}>
                  {slab.sub}
                </p>
              </div>
              <div className="ml-auto">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: `${slab.color}33` }}
                >
                  <ChevronDown size={12} color={slab.color} style={{ transform: "rotate(-90deg)" }} />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Floating nodes */}
      {[
        { x: "10%", y: "20%", delay: 0 },
        { x: "85%", y: "15%", delay: 0.5 },
        { x: "90%", y: "75%", delay: 1 },
        { x: "5%", y: "80%", delay: 1.5 },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{ left: node.x, top: node.y, background: "#7B2FFF" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: node.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

// ─── Counter ──────────────────────────────────────────────────────────────────
function Counter({ value, suffix, prefix }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1600;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
      style={{ background: "var(--cw-black)" }}
    >
      {/* Background mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #7B2FFF 0%, transparent 70%)",
            transform: "translate(20%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #5B1FDF 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#7B2FFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.15em] mb-6"
                style={{ background: "rgba(123,47,255,0.15)", color: "#C4A0FF", border: "1px solid rgba(123,47,255,0.25)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-[#7B2FFF] animate-pulse" />
                Strategy. Technology. Growth.
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.06] text-white mb-6"
            >
              Digital work that{" "}
              <span
                className="relative"
                style={{
                  background: "linear-gradient(135deg, #9B5FFF 0%, #7B2FFF 50%, #C4A0FF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                compounds.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg leading-relaxed mb-8 max-w-xl"
              style={{ color: "#8888AA" }}
            >
              We embed strategy, technology, and growth into a single operating system for ambitious businesses.
              One team. One system. Measurable outcomes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#contact"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                style={{ background: "#7B2FFF" }}
              >
                Book a Consultation
                <ArrowRight size={16} />
              </a>
              <a
                href="#proof"
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:bg-white/5"
                style={{ color: "#CCCCCC", border: "1px solid rgba(255,255,255,0.12)" }}
              >
                See Our Work
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-10"
              style={{ borderTop: "1px solid rgba(123,47,255,0.18)" }}
            >
              {[
                { value: 41, prefix: "+", suffix: "%", label: "Avg. conversion lift" },
                { value: 48, prefix: "-", suffix: "%", label: "Cost per acquisition" },
                { value: 3, prefix: "", suffix: ".2x", label: "Lead growth" },
                { value: 24, prefix: "", suffix: "h", label: "Response time" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl lg:text-3xl font-bold text-white">
                    <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                  </p>
                  <p className="text-xs mt-1" style={{ color: "#8888AA" }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — 3D Slab Visual */}
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

      {/* Trusted by */}
      <TrustedBy />
    </section>
  );
}

// ─── Trusted By ───────────────────────────────────────────────────────────────
function TrustedBy() {
  const companies = ["BayCraft", "Digity Africa", "Creditworx", "Thrive Commerce", "NovaTech", "FinEdge"];
  return (
    <div
      className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] mb-6 text-center" style={{ color: "#555577" }}>
        Trusted by ambitious businesses
      </p>
      <div className="flex flex-wrap items-center justify-center gap-8">
        {companies.map((c) => (
          <span key={c} className="text-sm font-bold" style={{ color: "#3A3A5A" }}>
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Self-Segmentation Grid (light section) ───────────────────────────────────
const intentCards = [
  {
    icon: <Target size={22} />,
    title: "I need clarity on direction",
    desc: "Strategy & roadmapping before committing to build",
    tag: "Strategy",
  },
  {
    icon: <Cpu size={22} />,
    title: "Build faster and smarter",
    desc: "Modern web apps, AI tools, and integrations that actually ship",
    tag: "Build",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Turn traffic into pipeline",
    desc: "Performance marketing and conversion systems that compound",
    tag: "Growth",
  },
  {
    icon: <Settings size={22} />,
    title: "Automate and integrate",
    desc: "Connect your systems, eliminate manual work, scale ops",
    tag: "Build",
  },
  {
    icon: <Zap size={22} />,
    title: "Make my business AI-ready",
    desc: "Identify where AI applies, implement it safely, measure it",
    tag: "Strategy",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Scale what is working",
    desc: "Analytics, optimisation, and growth loops on proven channels",
    tag: "Growth",
  },
];

const tagColors: Record<string, { bg: string; text: string }> = {
  Strategy: { bg: "rgba(123,47,255,0.12)", text: "#9B5FFF" },
  Build: { bg: "rgba(59,15,175,0.1)", text: "#7B5FFF" },
  Growth: { bg: "rgba(75,0,130,0.1)", text: "#C4A0FF" },
};

function SegmentationGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "#F5F5FA" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Find your path
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: "#1A1A2E" }}>
            What does your business need next?
          </h2>
          <p className="mt-4 text-lg max-w-xl mx-auto" style={{ color: "#555577" }}>
            Select the outcome closest to your goal and we will show you how we get there.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {intentCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(123,47,255,0.12)" }}
              className="group rounded-xl p-6 cursor-pointer transition-all duration-300"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(123,47,255,0.1)",
              }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(123,47,255,0.08)", color: "#7B2FFF" }}
              >
                {card.icon}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "#1A1A2E" }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "#777799" }}>
                {card.desc}
              </p>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: tagColors[card.tag].bg, color: tagColors[card.tag].text }}
                >
                  {card.tag}
                </span>
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: "#7B2FFF" }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Capability Tabs ──────────────────────────────────────────────────────────
const capabilities = {
  Strategy: {
    id: "strategy",
    headline: "Sharpen the direction before you invest in execution.",
    desc: "We diagnose what is actually holding your business back, design the right interventions, and give you a clear playbook before a single sprint starts.",
    items: [
      "Digital Strategy & Roadmapping",
      "Digital Transformation",
      "Fractional Product Management",
      "AI Readiness & Strategy",
      "Customer Experience Design",
      "Process Optimisation",
    ],
    stat: { value: "+2.4x", label: "avg. ROI on strategy engagements" },
  },
  Build: {
    id: "build",
    headline: "Build software that is fast, reliable, and quietly intelligent.",
    desc: "From customer-facing web apps to AI-powered back-end automation, we build systems that are maintainable, scalable, and wired for growth from day one.",
    items: [
      "Web Application Development",
      "Website Design & Build",
      "AI-Powered Solutions",
      "Automation & Workflows",
      "CRM & Systems Integrations",
      "SEO & CRO Engineering",
    ],
    stat: { value: "3 wks", label: "average time to first working prototype" },
  },
  Growth: {
    id: "growth",
    headline: "Turn traffic into pipeline, and pipeline into revenue.",
    desc: "We build growth systems, not campaigns. Performance marketing, lead generation, and AI-assisted optimisation that compounds over time.",
    items: [
      "Performance Marketing",
      "Lead Generation Systems",
      "Marketing Automation",
      "High-Converting Landing Pages",
      "Analytics & Reporting",
      "AI-Assisted Optimisation",
    ],
    stat: { value: "3.2x", label: "avg. lead growth within 90 days" },
  },
};

function CapabilityTabs() {
  const [active, setActive] = useState<keyof typeof capabilities>("Strategy");
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const cap = capabilities[active];

  return (
    <section ref={ref} id={cap.id} className="py-24" style={{ background: "var(--cw-dark)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Three practices. One accountable team.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            The full stack of capability, under one roof.
          </h2>
        </motion.div>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-10 p-1 rounded-xl w-fit" style={{ background: "rgba(255,255,255,0.04)" }}>
          {(Object.keys(capabilities) as Array<keyof typeof capabilities>).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className="px-6 py-2.5 rounded-lg text-sm font-bold transition-all duration-200"
              style={{
                background: active === tab ? "#7B2FFF" : "transparent",
                color: active === tab ? "#FFFFFF" : "#8888AA",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="grid lg:grid-cols-2 gap-12 items-start"
          >
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 leading-snug">{cap.headline}</h3>
              <p className="text-base leading-relaxed mb-8" style={{ color: "#8888AA" }}>
                {cap.desc}
              </p>
              <div
                className="inline-block px-5 py-3 rounded-xl mb-8"
                style={{ background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.2)" }}
              >
                <p className="text-2xl font-bold" style={{ color: "#C4A0FF" }}>
                  {cap.stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#8888AA" }}>
                  {cap.stat.label}
                </p>
              </div>
              <a
                href="#contact"
                className="flex items-center gap-2 text-sm font-bold transition-colors"
                style={{ color: "#7B2FFF" }}
              >
                Discuss your {active.toLowerCase()} needs
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {cap.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(123,47,255,0.1)" }}
                >
                  <CheckCircle2 size={16} style={{ color: "#7B2FFF", flexShrink: 0 }} />
                  <span className="text-sm font-medium text-white">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Operating Model ──────────────────────────────────────────────────────────
const phases = [
  {
    step: "01",
    title: "Diagnose",
    desc: "We audit your current state, map blockers, and identify the highest-leverage interventions before touching a line of code.",
    detail: "Stakeholder interviews, analytics audit, competitive benchmarking, gap analysis.",
  },
  {
    step: "02",
    title: "Design",
    desc: "We define the solution architecture, user flows, and technical specification with a shared source of truth before build begins.",
    detail: "System design, information architecture, wireframes, sprint plan.",
  },
  {
    step: "03",
    title: "Build",
    desc: "Fortnightly sprints with working software at every checkpoint. No black boxes. No surprises at launch.",
    detail: "Agile delivery, continuous integration, weekly demos, QA at every gate.",
  },
  {
    step: "04",
    title: "Scale",
    desc: "Post-launch optimisation, performance marketing, and growth loops that compound the initial build investment.",
    detail: "Analytics review, A/B testing, marketing activation, monthly optimisation cycles.",
  },
];

function OperatingModel() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "var(--cw-black)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Four phases. One operating rhythm.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">The Work System</h2>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: "#8888AA" }}>
            The same structured process applied to every engagement, regardless of size or capability.
          </p>
        </motion.div>

        {/* Phase connectors */}
        <div className="flex items-start gap-0 mb-12 overflow-x-auto pb-2">
          {phases.map((phase, i) => (
            <div key={phase.step} className="flex items-center flex-1 min-w-[140px]">
              <button
                onClick={() => setActive(i)}
                className="flex-1 flex flex-col items-center gap-2 px-2 text-center group"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300"
                  style={{
                    background: active === i ? "#7B2FFF" : "rgba(123,47,255,0.12)",
                    color: active === i ? "#FFFFFF" : "#7B2FFF",
                    border: active === i ? "none" : "1px solid rgba(123,47,255,0.25)",
                  }}
                >
                  {phase.step}
                </div>
                <span
                  className="text-sm font-bold transition-colors"
                  style={{ color: active === i ? "#FFFFFF" : "#555577" }}
                >
                  {phase.title}
                </span>
              </button>
              {i < phases.length - 1 && (
                <div
                  className="h-px flex-shrink-0 w-8 mx-1"
                  style={{ background: "rgba(123,47,255,0.2)" }}
                />
              )}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-8 lg:p-12"
            style={{ background: "#0D0D1A", border: "1px solid rgba(123,47,255,0.18)" }}
          >
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2" style={{ color: "#7B2FFF" }}>
                  Phase {phases[active].step}
                </p>
                <h3 className="text-3xl font-bold text-white mb-4">{phases[active].title}</h3>
                <p className="text-lg leading-relaxed mb-6" style={{ color: "#8888AA" }}>
                  {phases[active].desc}
                </p>
                <p className="text-sm" style={{ color: "#555577" }}>
                  {phases[active].detail}
                </p>
              </div>
              <div className="flex items-center justify-center">
                <div
                  className="w-40 h-40 rounded-full flex items-center justify-center"
                  style={{
                    background: "radial-gradient(circle, rgba(123,47,255,0.2) 0%, rgba(123,47,255,0.04) 70%)",
                    border: "1px solid rgba(123,47,255,0.2)",
                  }}
                >
                  <span className="text-5xl font-bold" style={{ color: "rgba(123,47,255,0.5)" }}>
                    {phases[active].step}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Proof / Case Studies ─────────────────────────────────────────────────────
const caseStudies = [
  {
    client: "BayCraft",
    tag: "E-commerce / Strategy + Build",
    challenge:
      "Stagnant conversion rate on a high-traffic DTC store. The team had tried three ad agencies in 18 months with no sustained improvement.",
    approach:
      "Full CRO audit, rebuilt checkout flow, implemented AI-assisted personalisation layer and redesigned product pages with evidence-backed copy.",
    outcome: "+41% conversion rate within 60 days of launch. Cart abandonment down 28%.",
    stats: [
      { value: "+41%", label: "Conversion rate" },
      { value: "-28%", label: "Cart abandonment" },
      { value: "60", suffix: " days", label: "Time to result" },
    ],
  },
  {
    client: "Digity Africa",
    tag: "Growth / Performance Marketing",
    challenge:
      "CAC was spiralling on paid social. Leads were coming in but the quality-to-cost ratio made scaling impossible.",
    approach:
      "Rebuilt campaign structure from scratch, implemented lead scoring, built dedicated landing pages with qualifying flows, and introduced automated nurture sequences.",
    outcome: "-48% cost per acquisition. Lead quality score improved 2.1x. Sales cycle shortened by 19 days.",
    stats: [
      { value: "-48%", label: "Cost per acquisition" },
      { value: "2.1x", label: "Lead quality score" },
      { value: "-19", suffix: " days", label: "Sales cycle" },
    ],
  },
  {
    client: "Creditworx",
    tag: "Strategy + Growth / Financial Services",
    challenge:
      "Commoditised market, low digital trust, and a lead pipeline that relied almost entirely on referrals.",
    approach:
      "Digital trust audit, content authority strategy, SEO rebuild, and a self-qualifying lead funnel with AI chatbot pre-screening.",
    outcome: "3.2x lead growth in 90 days. Organic traffic up 180%. Referral dependency reduced from 80% to 45%.",
    stats: [
      { value: "3.2x", label: "Lead growth" },
      { value: "+180%", label: "Organic traffic" },
      { value: "90", suffix: " days", label: "Time to result" },
    ],
  },
];

function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="proof" className="py-24" style={{ background: "#F5F5FA" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Proof. Not adjectives.
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: "#1A1A2E" }}>
            Real businesses. Real growth.
          </h2>
        </motion.div>

        <div className="space-y-6">
          {caseStudies.map((cs, i) => (
            <motion.div
              key={cs.client}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid rgba(123,47,255,0.12)" }}
            >
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Left: narrative */}
                <div
                  className="lg:col-span-2 p-8 lg:p-10"
                  style={{ background: "#FFFFFF" }}
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
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
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "Challenge", text: cs.challenge },
                      { label: "Approach", text: cs.approach },
                      { label: "Outcome", text: cs.outcome },
                    ].map((block) => (
                      <div key={block.label}>
                        <p className="text-xs font-bold uppercase tracking-[0.12em] mb-1" style={{ color: "#AAAACC" }}>
                          {block.label}
                        </p>
                        <p className="text-sm leading-relaxed" style={{ color: "#555577" }}>
                          {block.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: stats */}
                <div
                  className="p-8 lg:p-10 flex flex-col justify-center gap-6"
                  style={{ background: "var(--cw-dark)" }}
                >
                  {cs.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-3xl font-bold text-white">
                        {stat.value}
                        {stat.suffix && <span className="text-xl">{stat.suffix}</span>}
                      </p>
                      <p className="text-xs mt-1" style={{ color: "#8888AA" }}>
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
const techStack = [
  { name: "React", cat: "Frontend" },
  { name: "Next.js", cat: "Frontend" },
  { name: "TypeScript", cat: "Frontend" },
  { name: "Node.js", cat: "Backend" },
  { name: "Supabase", cat: "Backend" },
  { name: "PostgreSQL", cat: "Backend" },
  { name: "OpenAI", cat: "AI" },
  { name: "Anthropic", cat: "AI" },
  { name: "Zapier", cat: "Automation" },
  { name: "HubSpot", cat: "CRM" },
  { name: "Vercel", cat: "Infra" },
  { name: "Stripe", cat: "Payments" },
];

function TechStack() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "var(--cw-dark)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            The stack behind the work
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Proven platforms, applied with first principles.
          </h2>
          <p className="mt-4 text-base max-w-lg mx-auto" style={{ color: "#8888AA" }}>
            We use best-in-class tools but never let the stack drive the decision. The right tool for the right problem, always.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(123,47,255,0.12)" }}
            >
              <span className="text-sm font-bold text-white">{tech.name}</span>
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(123,47,255,0.15)", color: "#C4A0FF" }}
              >
                {tech.cat}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "What makes Cliqworx different from a regular digital agency?",
    a: "Most agencies are channel-specialists: one shop does SEO, another does ads, a third builds your site. We operate as a single accountable team across strategy, technology, and growth. One brief, one team, one set of commercial outcomes. No coordination overhead, no handoff gaps.",
  },
  {
    q: "How long before we see measurable results?",
    a: "For growth and performance work, our clients typically see directional movement within 30 days and statistically significant results within 60 to 90 days. For technology builds, we deliver working software within the first two-week sprint. We set specific outcome milestones at the start of every engagement so expectations are calibrated, not vague.",
  },
  {
    q: "Do you work with startups or established businesses?",
    a: "Both, but we are most effective with businesses that have already found product-market fit and are ready to scale what is working, or with founders who want to build right the first time. We are not the right partner for pure ideation-stage startups with no customers yet.",
  },
  {
    q: "Can we engage just one practice area?",
    a: "Yes. Many clients start with a focused Strategy or Growth engagement before expanding. Each practice area is a standalone offering. That said, our integrated model delivers compound results that siloed engagements cannot.",
  },
  {
    q: "What industries do you specialize in?",
    a: "We have deep experience in financial services, fintech, e-commerce, healthtech, education, and transport and logistics. Our frameworks are transferable across sectors, but we bring market-specific context to each of these verticals.",
  },
  {
    q: "How does the initial consultation work?",
    a: "Thirty minutes with a senior practitioner, not a sales rep. We will ask about your current state, your biggest constraint, and what success looks like in 90 days. You will leave with at least one actionable insight regardless of whether we work together.",
  },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-24" style={{ background: "#F5F5FA" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "#7B2FFF" }}>
            Common questions
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold" style={{ color: "#1A1A2E" }}>
            Thinking you can use before you hire us.
          </h2>
        </motion.div>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid rgba(123,47,255,0.12)", background: "#FFFFFF" }}
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
              >
                <span className="text-base font-semibold pr-4" style={{ color: "#1A1A2E" }}>
                  {faq.q}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: openIdx === i ? "#7B2FFF" : "rgba(123,47,255,0.1)" }}
                >
                  {openIdx === i ? (
                    <Minus size={14} color="#FFFFFF" />
                  ) : (
                    <Plus size={14} color="#7B2FFF" />
                  )}
                </div>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "#555577" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA / Lead Form ──────────────────────────────────────────────────────────
function CTASection() {
  const [interest, setInterest] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="contact" className="py-24 relative overflow-hidden" style={{ background: "var(--cw-dark)" }}>
      {/* Purple glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(123,47,255,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] mb-4" style={{ color: "#C4A0FF" }}>
              A strategy session, not a sales pitch.
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Thirty minutes. One honest read on where to go next.
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "#8888AA" }}>
              You speak with a senior practitioner who will give you a straight assessment of your biggest constraint and a clear recommendation, whether or not we end up working together.
            </p>
            <div className="flex flex-col gap-3">
              {[
                "No junior account managers in the room",
                "No pitch decks or slide shows",
                "One honest recommendation you can act on",
              ].map((point) => (
                <div key={point} className="flex items-center gap-3">
                  <CheckCircle2 size={16} style={{ color: "#7B2FFF", flexShrink: 0 }} />
                  <span className="text-sm" style={{ color: "#AAAACC" }}>
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {submitted ? (
              <div
                className="rounded-2xl p-10 text-center"
                style={{ background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.25)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "#7B2FFF" }}
                >
                  <CheckCircle2 size={28} color="#FFFFFF" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Request received.</h3>
                <p className="text-sm" style={{ color: "#8888AA" }}>
                  A senior practitioner will reach out within 24 hours to confirm your session.
                </p>
              </div>
            ) : (
              <div
                className="rounded-2xl p-8"
                style={{ background: "#12121F", border: "1px solid rgba(123,47,255,0.2)" }}
              >
                <p className="text-sm font-semibold text-white mb-5">What are you focused on?</p>

                {/* Qualifying radio */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {["Strategy", "Build", "Growth", "Not sure yet"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 px-4 py-3 rounded-lg cursor-pointer transition-all"
                      style={{
                        background: interest === opt ? "rgba(123,47,255,0.2)" : "rgba(255,255,255,0.03)",
                        border: `1px solid ${interest === opt ? "#7B2FFF" : "rgba(123,47,255,0.12)"}`,
                      }}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={opt}
                        className="sr-only"
                        onChange={() => setInterest(opt)}
                      />
                      <div
                        className="w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                        style={{ borderColor: interest === opt ? "#7B2FFF" : "#555577" }}
                      >
                        {interest === opt && (
                          <div className="w-2 h-2 rounded-full" style={{ background: "#7B2FFF" }} />
                        )}
                      </div>
                      <span className="text-sm font-medium" style={{ color: interest === opt ? "#FFFFFF" : "#8888AA" }}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#555577] outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(123,47,255,0.15)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(123,47,255,0.15)")}
                  />
                  <input
                    type="email"
                    placeholder="Work email"
                    className="w-full px-4 py-3 rounded-lg text-sm text-white placeholder-[#555577] outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(123,47,255,0.15)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#7B2FFF")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(123,47,255,0.15)")}
                  />
                  <button
                    onClick={() => setSubmitted(true)}
                    className="w-full py-3.5 rounded-lg font-bold text-sm text-white transition-all hover:opacity-90"
                    style={{ background: "#7B2FFF" }}
                  >
                    Book a Consultation
                  </button>
                </div>

                <p className="text-xs text-center mt-4" style={{ color: "#444466" }}>
                  No spam. No CRM chase sequences. Just a calendar invite.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-16" style={{ background: "var(--cw-black)", borderTop: "1px solid rgba(123,47,255,0.12)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <CliqworxLogo />
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "#555577" }}>
              Strategy. Technology. Growth.
              <br />
              One operating system for ambitious businesses.
            </p>
          </div>

          {[
            {
              heading: "Strategy",
              links: ["Digital Strategy", "Transformation", "AI Readiness", "Process Optimisation"],
            },
            {
              heading: "Build",
              links: ["Web Applications", "Website Design", "AI Solutions", "CRM Integrations"],
            },
            {
              heading: "Growth",
              links: ["Performance Marketing", "Lead Generation", "Marketing Automation", "Analytics"],
            },
          ].map((col) => (
            <div key={col.heading}>
              <p className="text-xs font-bold uppercase tracking-[0.15em] mb-4" style={{ color: "#555577" }}>
                {col.heading}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "#444466" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4"
          style={{ borderTop: "1px solid rgba(123,47,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#333355" }}>
            {new Date().getFullYear()} Cliqworx. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a key={link} href="#" className="text-xs transition-colors hover:text-white" style={{ color: "#333355" }}>
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div style={{ fontFamily: "'Manrope', sans-serif", background: "var(--cw-black)" }}>
      <Nav />
      <main>
        <Hero />
        <SegmentationGrid />
        <CapabilityTabs />
        <OperatingModel />
        <Proof />
        <TechStack />
        <FAQ />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
