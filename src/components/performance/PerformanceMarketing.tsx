"use client";

/* ============================================================
   Performance Marketing — service landing template
   Visual target: the approved "Ideal Page" (light hero, warm,
   premium, alternating light/dark rhythm). Structure adapted
   from the Figma export. Built on brand tokens (--cw-*).

   Reusable as the base for future service pages: duplicate this
   file, swap copy + data constants, keep the section shells.
   ============================================================ */

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MessageCircle,
  ArrowRight,
  Check,
  TrendingUp,
  Target,
  BarChart3,
  Gauge,
  Megaphone,
  MousePointerClick,
  Search,
  Wrench,
  Rocket,
} from "lucide-react";
import { AreaChart, Donut, FunnelBars, BeforeAfterBars, Heatmap, useCountUp } from "./pm-charts";
import { platforms } from "./pm-logos";
import { FAQ_ITEMS } from "./pm-faq";

// WhatsApp number (digits only, country code first). Powers every
// "Chat on WhatsApp" button and the mobile floating button.
const WHATSAPP_NUMBER = "27626234266";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi CliqWorx, I'd like to talk about performance marketing for my business."
)}`;
const CONSULT_HREF = "/contact";

// Brand tokens (kept local for readability; mirror globals.css --cw-*)
const PURPLE = "#7B2FFF";
const PURPLE_MID = "#9B5FFF";
const INK = "#1A1A2E";
const BODY = "#555577";
const MUTED = "#8888AA";
const LIGHT_BG = "#F5F5FA";
const DARK = "#0D0D1A";
const DARKER = "#08080E";
const POS = "#12B76A";

// ─── Reveal wrapper ────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

// ─── Hero dashboard ─────────────────────────────────────────────────────────────

function Dashboard() {
  const kpis = [
    { label: "Revenue", value: "R1,284,532", delta: "18.2%", up: true },
    { label: "ROAS", value: "3.2x", delta: "12.4%", up: true },
    { label: "Conversions", value: "8,492", delta: "25.1%", up: true },
    { label: "CPA", value: "R24.60", delta: "16.7%", up: false },
  ];
  const channels = [
    { label: "Google Ads", value: 42, color: "#4285F4" },
    { label: "Meta Ads", value: 32, color: "#0866FF" },
    { label: "TikTok Ads", value: 18, color: "#FE2C55" },
    { label: "LinkedIn Ads", value: 5, color: "#0A66C2" },
    { label: "Others", value: 3, color: "#C4A0FF" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-2xl bg-white"
      style={{
        border: "1px solid rgba(123,47,255,0.1)",
        boxShadow: "0 40px 90px rgba(123,47,255,0.16), 0 8px 24px rgba(17,17,17,0.06)",
      }}
      role="img"
      aria-label="Performance overview dashboard showing revenue, ROAS, conversions and channel breakdown"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: "1px solid #EEEEF4" }}>
        <div className="flex items-center gap-2">
          <BarChart3 size={15} style={{ color: PURPLE }} />
          <span className="text-sm font-bold" style={{ color: INK }}>
            Performance Overview
          </span>
        </div>
        <span className="text-[11px] font-medium px-2.5 py-1 rounded-md" style={{ background: LIGHT_BG, color: BODY }}>
          May 1 – May 31, 2025
        </span>
      </div>

      {/* KPI grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {kpis.map((k, i) => (
          <div
            key={k.label}
            className="px-4 py-3.5"
            style={{
              borderRight: i < 3 ? "1px solid #F0F0F6" : "none",
              borderBottom: "1px solid #F0F0F6",
            }}
          >
            <div className="text-[10px] font-semibold uppercase tracking-wide mb-1" style={{ color: MUTED }}>
              {k.label}
            </div>
            <div className="text-lg font-extrabold leading-none" style={{ color: INK }}>
              {k.value}
            </div>
            <div className="flex items-center gap-1 mt-1.5 text-[11px] font-bold" style={{ color: POS }}>
              <TrendingUp size={11} style={{ transform: k.up ? "none" : "scaleY(-1)" }} />
              {k.delta}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue + channels */}
      <div className="grid sm:grid-cols-2">
        <div className="p-4" style={{ borderRight: "1px solid #F0F0F6", borderBottom: "1px solid #F0F0F6" }}>
          <div className="text-[11px] font-bold mb-2" style={{ color: INK }}>
            Revenue Over Time
          </div>
          <AreaChart
            gradientId="pm-hero-rev"
            data={[52, 61, 58, 72, 68, 84, 79, 96, 108, 120]}
            color={PURPLE}
            height={104}
            showAxis
            labels={["May 1", "", "May 8", "", "May 15", "", "May 22", "", "", "May 31"]}
          />
        </div>
        <div className="p-4" style={{ borderBottom: "1px solid #F0F0F6" }}>
          <div className="text-[11px] font-bold mb-2" style={{ color: INK }}>
            Top Channels
          </div>
          <div className="flex items-center gap-4">
            <Donut segments={channels} size={92} thickness={14} />
            <div className="flex-1 space-y-1.5">
              {channels.map((c) => (
                <div key={c.label} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: c.color }} />
                  <span className="text-[10px] flex-1" style={{ color: BODY }}>
                    {c.label}
                  </span>
                  <span className="text-[10px] font-bold" style={{ color: INK }}>
                    {c.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Funnel + insights */}
      <div className="grid sm:grid-cols-2">
        <div className="p-4" style={{ borderRight: "1px solid #F0F0F6" }}>
          <div className="text-[11px] font-bold mb-3" style={{ color: INK }}>
            Funnel Overview
          </div>
          <FunnelBars
            rows={[
              { label: "Users", value: "120,430", pct: 100 },
              { label: "Sessions", value: "58,342", pct: 48 },
              { label: "Leads", value: "9,842", pct: 17 },
              { label: "Customers", value: "1,237", pct: 12 },
            ]}
          />
        </div>
        <div className="p-4">
          <div className="text-[11px] font-bold mb-3" style={{ color: INK }}>
            User Insights
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="text-[9px] mb-1.5" style={{ color: MUTED }}>
                Clarity Heatmap
              </div>
              <Heatmap cols={10} rows={4} />
            </div>
            <div className="w-24 space-y-2.5">
              <div>
                <div className="text-[9px]" style={{ color: MUTED }}>
                  Rage Clicks
                </div>
                <div className="text-base font-extrabold" style={{ color: INK }}>
                  13
                </div>
                <div className="text-[10px] font-bold" style={{ color: POS }}>
                  ↓ 26%
                </div>
              </div>
              <div>
                <div className="text-[9px]" style={{ color: MUTED }}>
                  Scroll Depth
                </div>
                <div className="text-base font-extrabold" style={{ color: INK }}>
                  74%
                </div>
                <div className="text-[10px] font-bold" style={{ color: POS }}>
                  ↑ 16%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const s1 = useCountUp(25);
  const s2 = useCountUp(300);
  const s3 = useCountUp(27);
  const stats = [
    { ref: s1.ref, display: s1.display, suffix: "%+", label: "Conversion Improvement" },
    { ref: s2.ref, display: s2.display, suffix: "K+", label: "Users Acquired" },
    { ref: s3.ref, display: s3.display, suffix: "%", label: "Qualified Lead Growth" },
  ];

  return (
    <section className="relative overflow-hidden bg-white pt-28 lg:pt-36 pb-20">
      {/* Soft ambient purple lighting */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 0%, rgba(123,47,255,0.08), transparent 60%), radial-gradient(ellipse 50% 60% at 100% 30%, rgba(155,95,255,0.07), transparent 60%)",
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-14 items-center">
          {/* Left */}
          <div>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="text-xs font-bold uppercase tracking-[0.18em] mb-5"
              style={{ color: PURPLE }}
            >
              Performance &amp; Growth Marketing Agency
            </motion.p>
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold leading-[1.08] mb-6"
              style={{ color: INK }}
            >
              A performance marketing agency built for{" "}
              <span
                style={{
                  background: "linear-gradient(120deg, #9B5FFF, #7B2FFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                predictable, measurable growth.
              </span>
            </motion.h1>
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-base leading-relaxed mb-8 max-w-lg"
              style={{ color: BODY }}
            >
              CliqWorx is a data-driven performance and growth marketing agency helping startups and
              SMEs across South Africa acquire more customers, improve conversion rates and maximise
              marketing ROI. More qualified leads. Lower acquisition costs. Sustainable revenue growth.
            </motion.p>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="flex flex-col sm:flex-row gap-3 mb-12"
            >
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-elevate inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white text-sm font-bold min-h-[48px]"
              >
                <MessageCircle size={17} />
                Chat on WhatsApp
              </a>
              <a
                href="#case-studies"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold min-h-[48px] transition-all duration-200 hover:bg-[rgba(123,47,255,0.05)]"
                style={{ border: "1px solid rgba(123,47,255,0.25)", color: INK }}
              >
                View Results
                <ArrowRight size={15} />
              </a>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.28 }} className="flex flex-wrap gap-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="text-2xl lg:text-[1.75rem] font-extrabold leading-none" style={{ color: INK }}>
                    <span ref={s.ref}>{s.display}</span>
                    {s.suffix}
                  </div>
                  <div className="text-xs mt-1.5" style={{ color: MUTED }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — dashboard */}
          <div className="relative">
            <Dashboard />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Platform marquee ───────────────────────────────────────────────────────────

function Platforms() {
  const doubled = [...platforms, ...platforms];
  return (
    <section className="bg-white py-14" style={{ borderTop: "1px solid #EEEEF4", borderBottom: "1px solid #EEEEF4" }}>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] mb-9" style={{ color: MUTED }}>
        Platforms we optimise every day
      </p>
      <div className="pm-marquee relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, white, transparent)" }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, white, transparent)" }}
          aria-hidden="true"
        />
        <div className="pm-marquee-track flex gap-3">
          {doubled.map((p, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-5 py-3 rounded-xl bg-white whitespace-nowrap select-none"
              style={{ border: "1px solid #ECECF2", boxShadow: "0 1px 2px rgba(17,17,17,0.04)" }}
            >
              {p.mark}
              <span className="text-sm font-semibold" style={{ color: "#33334D" }}>
                {p.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Outcomes ───────────────────────────────────────────────────────────────────

function Outcomes() {
  const cards = [
    { Icon: Megaphone, title: "Qualified lead generation", body: "Lead generation that attracts buyers, not browsers, and turns high-intent traffic into qualified leads and sales." },
    { Icon: MousePointerClick, title: "Conversion rate optimisation", body: "CRO and landing page optimisation that convert more of the traffic you already have into customers." },
    { Icon: Target, title: "Lower customer acquisition costs", body: "Reduce cost per lead and customer acquisition cost with data-driven targeting and creative testing." },
    { Icon: TrendingUp, title: "Scale profitable campaigns", body: "Scale paid media across Google Ads, Meta and more while protecting and growing return on ad spend." },
    { Icon: BarChart3, title: "Increase marketing ROI", body: "ROI marketing decisions backed by GA4 and full-funnel attribution, so every rand is spent where it performs." },
    { Icon: Gauge, title: "Make better decisions", body: "Marketing analytics, dashboards and KPI reporting that turn data into confident, measurable growth decisions." },
  ];
  return (
    <section id="outcomes" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
            Performance Marketing Services
          </p>
          <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight" style={{ color: INK }}>
            Performance marketing services that drive real, measurable growth
          </h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              {...fadeUp}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group p-7 rounded-2xl bg-white transition-all duration-300 hover:-translate-y-1"
              style={{ border: "1px solid #ECECF2", boxShadow: "0 1px 2px rgba(17,17,17,0.04)" }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 transition-colors"
                style={{ background: "rgba(123,47,255,0.08)" }}
              >
                <c.Icon size={20} style={{ color: PURPLE }} />
              </div>
              <h3 className="text-base font-bold mb-2.5" style={{ color: INK }}>
                {c.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                {c.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Case studies (dark) ─────────────────────────────────────────────────────────

function CaseStudies() {
  const c1 = useCountUp(25);
  const c3 = useCountUp(27);
  const c2 = useCountUp(300);

  return (
    <section id="case-studies" className="py-24 relative overflow-hidden" style={{ background: DARKER }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 80% 0%, rgba(123,47,255,0.14), transparent 60%)" }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-start mb-14">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE_MID }}>
              Performance Marketing Case Studies
            </p>
            <h2 className="text-3xl lg:text-[2.3rem] font-extrabold leading-tight text-white">
              Businesses don&apos;t hire us to run ads. They hire us to grow their business.
            </h2>
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base leading-relaxed lg:pt-2"
            style={{ color: "#B8B8CC" }}
          >
            Real performance marketing results across e-commerce, edtech and B2B SaaS: more qualified
            leads, lower customer acquisition costs and sustainable revenue growth. Every campaign is
            measured on conversion improvement, user acquisition and marketing ROI, not vanity metrics.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Card 1 — before/after */}
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.55 }}
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: DARK, border: "1px solid rgba(123,47,255,0.16)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: MUTED }}>
              Consumer Electronics
            </p>
            <div className="text-4xl font-extrabold text-white leading-none mb-1">
              +<span ref={c1.ref}>{c1.display}</span>%
            </div>
            <p className="text-sm mb-5" style={{ color: MUTED }}>
              Conversion Improvement
            </p>
            <div className="mb-5">
              <div className="flex gap-3 mb-2 text-[10px]" style={{ color: MUTED }}>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.18)" }} /> Before
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm" style={{ background: PURPLE }} /> After
                </span>
              </div>
              <BeforeAfterBars groups={[{ before: 30, after: 40 }, { before: 34, after: 52 }, { before: 38, after: 66 }, { before: 42, after: 80 }, { before: 40, after: 92 }]} />
            </div>
            <p className="text-sm leading-relaxed mt-auto" style={{ color: "#B8B8CC" }}>
              Restructured full-funnel strategy and optimised landing pages, increasing conversions without increasing ad spend.
            </p>
          </motion.article>

          {/* Card 2 — growth line */}
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: DARK, border: "1px solid rgba(123,47,255,0.16)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: MUTED }}>
              EdTech Platform
            </p>
            <div className="text-4xl font-extrabold text-white leading-none mb-1">
              <span ref={c2.ref}>{c2.display}</span>K+
            </div>
            <p className="text-sm mb-5" style={{ color: MUTED }}>
              Users Acquired
            </p>
            <div className="mb-5 flex-1 flex flex-col justify-end">
              <div className="flex justify-between text-[9px] mb-1" style={{ color: MUTED }}>
                <span>300K</span>
              </div>
              <AreaChart gradientId="pm-case-edtech" data={[8, 14, 22, 40, 68, 120, 190, 260, 300]} color={PURPLE_MID} height={96} showAxis labels={["Jan", "", "", "Feb", "", "", "Mar", "", ""]} />
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#B8B8CC" }}>
              Scaled paid acquisition and onboarding experience, driving over 300,000 active users in 3 months.
            </p>
          </motion.article>

          {/* Card 3 — before/after */}
          <motion.article
            {...fadeUp}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="rounded-2xl p-6 flex flex-col"
            style={{ background: DARK, border: "1px solid rgba(123,47,255,0.16)" }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-4" style={{ color: MUTED }}>
              B2B SaaS Company
            </p>
            <div className="text-4xl font-extrabold text-white leading-none mb-1">
              +<span ref={c3.ref}>{c3.display}</span>%
            </div>
            <p className="text-sm mb-5" style={{ color: MUTED }}>
              Qualified Lead Growth
            </p>
            <div className="mb-5">
              <div className="flex gap-3 mb-2 text-[10px]" style={{ color: MUTED }}>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm" style={{ background: "rgba(255,255,255,0.18)" }} /> Before
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-sm" style={{ background: PURPLE }} /> After
                </span>
              </div>
              <BeforeAfterBars groups={[{ before: 20, after: 44 }, { before: 24, after: 30 }, { before: 22, after: 74 }, { before: 26, after: 58 }]} />
            </div>
            <p className="text-sm leading-relaxed mt-auto" style={{ color: "#B8B8CC" }}>
              Improved targeting and lead nurturing flows resulting in 27% more qualified leads at a lower cost.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

// ─── Process ────────────────────────────────────────────────────────────────────

function Process() {
  const steps = [
    { num: "01", Icon: Search, title: "Diagnose", body: "We audit your funnels, conversion tracking, GA4 and Microsoft Clarity data to find where growth and budget are leaking." },
    { num: "02", Icon: Wrench, title: "Optimise", body: "We fix bottlenecks with conversion rate optimisation, sharper audience targeting and clean attribution." },
    { num: "03", Icon: Rocket, title: "Launch", body: "We launch high-intent campaigns across Google Ads, Meta and paid social, engineered to convert." },
    { num: "04", Icon: TrendingUp, title: "Scale", body: "We scale what works, expand cross-channel and compound your return on ad spend over time." },
  ];
  return (
    <section id="our-process" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[0.7fr_1.3fr] gap-10 lg:gap-14 items-start">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
              Our Growth Marketing Process
            </p>
            <h2 className="text-3xl lg:text-[2.3rem] font-extrabold leading-tight mb-4" style={{ color: INK }}>
              How growth actually happens.
            </h2>
            <p className="text-base leading-relaxed max-w-xs" style={{ color: BODY }}>
              A proven, data-driven growth marketing process that turns analytics into scalable,
              measurable growth.
            </p>
          </motion.div>

          <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* connector */}
            <motion.div
              className="hidden lg:block absolute top-6 left-6 right-6 h-px origin-left"
              style={{ background: "rgba(123,47,255,0.2)" }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeInOut" }}
              aria-hidden="true"
            />
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 relative z-10"
                  style={{
                    background: i === 0 ? PURPLE : "#F4F2FE",
                    boxShadow: i === 0 ? "0 8px 20px rgba(123,47,255,0.32)" : "none",
                  }}
                >
                  <s.Icon size={19} style={{ color: i === 0 ? "#fff" : PURPLE }} />
                </div>
                <div className="text-xs font-bold mb-1.5" style={{ color: PURPLE }}>
                  {s.num}
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: INK }}>
                  {s.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: BODY }}>
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ────────────────────────────────────────────────────────────────────

function Pricing() {
  const plans = [
    {
      name: "Launch",
      price: "R4,999",
      period: "/month",
      desc: "Perfect for startups getting started with performance marketing and Google Ads or Meta Ads management.",
      features: ["1 Advertising Platform (Google Ads OR Meta Ads)", "Conversion Tracking", "Monthly Reporting", "Monthly Optimisation", "WhatsApp Support"],
      popular: false,
    },
    {
      name: "Growth",
      price: "R9,999",
      period: "/month",
      desc: "For growing businesses ready to scale lead generation and revenue with multi-channel paid media.",
      features: ["Google Ads", "Meta Ads", "Landing Page Optimisation", "Funnel & Analytics Insights", "Weekly Optimisation", "Monthly Strategy Call", "WhatsApp Support"],
      popular: true,
    },
    {
      name: "Performance+",
      price: "R14,999",
      period: "/month",
      desc: "For businesses scaling profitably across Google Ads, Meta, LinkedIn and TikTok with advanced CRO.",
      features: ["Google Ads", "Meta Ads", "LinkedIn / TikTok Ads", "Advanced CRO & Testing", "Looker Studio Dashboards", "Weekly Performance Reviews", "Priority WhatsApp Support", "Growth Strategy Roadmap"],
      popular: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      desc: "For organisations needing a dedicated growth marketing team and custom, data-driven strategy.",
      features: ["Multi-Channel Strategy", "Custom Solutions", "Advanced Reporting", "Dedicated Growth Team", "Ongoing Optimisation", "Strategic Consulting"],
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24" style={{ background: LIGHT_BG }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
            Pricing
          </p>
          <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight mb-4" style={{ color: INK }}>
            Performance marketing plans for every stage of growth
          </h2>
          <p className="text-base leading-relaxed" style={{ color: BODY }}>
            Flexible performance marketing and Google Ads management plans for startups, SMEs and
            scaling businesses. No setup fees, no long-term contracts.
          </p>
        </motion.div>

        {/* snap-scroll on mobile, grid on desktop */}
        <div className="-mx-6 px-6 overflow-x-auto snap-x snap-mandatory md:overflow-visible md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: "none" }}>
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 min-w-max md:min-w-0">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative rounded-2xl p-7 flex flex-col snap-start w-[280px] md:w-auto transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: p.popular ? "#FFFFFF" : "#FFFFFF",
                  border: p.popular ? `2px solid ${PURPLE}` : "1px solid #E6E6EE",
                  boxShadow: p.popular ? "0 24px 60px rgba(123,47,255,0.16)" : "0 1px 2px rgba(17,17,17,0.04)",
                }}
              >
                {p.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide text-white whitespace-nowrap"
                    style={{ background: PURPLE }}
                  >
                    Most Popular
                  </span>
                )}
                <h3 className="text-lg font-extrabold mb-3" style={{ color: INK }}>
                  {p.name}
                </h3>
                <div className="mb-3">
                  {p.price === "Custom" ? (
                    <span className="text-3xl font-extrabold" style={{ color: INK }}>
                      Custom
                    </span>
                  ) : (
                    <>
                      <div className="text-xs font-medium mb-0.5" style={{ color: MUTED }}>
                        From
                      </div>
                      <span className="text-3xl font-extrabold" style={{ color: INK }}>
                        {p.price}
                      </span>
                      <span className="text-sm font-medium" style={{ color: MUTED }}>
                        {p.period}
                      </span>
                    </>
                  )}
                </div>
                <p className="text-sm leading-relaxed mb-6" style={{ color: BODY }}>
                  {p.desc}
                </p>
                <ul className="space-y-3 flex-1 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: "rgba(123,47,255,0.1)" }}
                      >
                        <Check size={10} style={{ color: PURPLE }} />
                      </span>
                      <span className="text-[13px] leading-snug" style={{ color: BODY }}>
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold min-h-[46px] transition-all duration-200"
                  style={
                    p.popular
                      ? { background: PURPLE, color: "#fff" }
                      : { border: `1px solid ${PURPLE}`, color: PURPLE }
                  }
                >
                  <MessageCircle size={16} />
                  Book Consultation
                </a>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="text-center text-sm mt-10" style={{ color: MUTED }}>
          All plans are monthly. No long-term contracts.
        </p>
      </div>
    </section>
  );
}

// ─── Final CTA (dark) ─────────────────────────────────────────────────────────

function FinalCTA() {
  return (
    <section className="py-20 px-6 bg-white">
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.7 }}
        className="relative max-w-5xl mx-auto rounded-3xl px-8 py-12 lg:px-14 overflow-hidden"
        style={{ background: DARKER, boxShadow: "0 40px 90px rgba(8,8,14,0.35)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 50% 80% at 15% 30%, rgba(123,47,255,0.22), transparent 60%)" }}
          aria-hidden="true"
        />
        <div className="relative flex flex-col lg:flex-row lg:items-center gap-8">
          <motion.div
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: "linear-gradient(135deg, #9B5FFF, #7B2FFF)", boxShadow: "0 12px 32px rgba(123,47,255,0.4)" }}
            aria-hidden="true"
          >
            <MessageCircle size={28} className="text-white" />
          </motion.div>
          <div className="flex-1">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-white mb-2">Ready to grow your business?</h2>
            <p className="text-sm leading-relaxed max-w-md" style={{ color: "#B8B8CC" }}>
              Talk to a performance marketing expert about your customer acquisition, paid media and
              conversion goals, and map your biggest opportunities for revenue growth.
            </p>
          </div>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-elevate inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-bold min-h-[48px] shrink-0"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
        <div className="relative flex flex-wrap gap-x-8 gap-y-3 mt-8 pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {["Avg. response under 30 mins", "No obligation", "Speak directly with a strategist"].map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm" style={{ color: "#B8B8CC" }}>
              <Check size={14} style={{ color: PURPLE_MID }} />
              {t}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── FAQ (SEO topical authority) ─────────────────────────────────────────────────

function FAQ() {
  return (
    <section id="faq" className="bg-white py-24">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
            Performance Marketing FAQs
          </p>
          <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight" style={{ color: INK }}>
            Performance and growth marketing questions, answered
          </h2>
        </motion.div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <motion.details
              key={item.q}
              {...fadeUp}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="group rounded-xl bg-white"
              style={{ border: "1px solid #E6E6EE" }}
            >
              <summary
                className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-base font-bold"
                style={{ color: INK }}
              >
                {item.q}
                <span
                  className="shrink-0 transition-transform duration-200 group-open:rotate-45"
                  style={{ color: PURPLE }}
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: BODY }}>
                {item.a}
              </p>
            </motion.details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Insights (blog previews) ────────────────────────────────────────────────────

function Insights() {
  const posts = [
    {
      image: "/insights/performance-marketing-cost.png",
      category: "Pricing",
      title: "How much does performance marketing cost in South Africa? A 2025 pricing guide",
      excerpt:
        "What to actually budget for Google Ads, Meta Ads and management fees, and how to tell whether a performance marketing agency is worth the spend.",
      read: "8 min read",
    },
    {
      image: "/insights/performance-vs-digital.png",
      category: "Strategy",
      title: "Performance marketing vs digital marketing: what actually drives revenue",
      excerpt:
        "The real difference between broad digital marketing and outcome-focused performance marketing, and which one your business needs right now.",
      read: "6 min read",
    },
    {
      image: "/insights/lower-cac.png",
      category: "Growth",
      title: "9 ways to lower your customer acquisition cost with data-driven campaigns",
      excerpt:
        "Practical CRO, targeting and analytics tactics that reduce cost per lead and grow return on ad spend, without increasing your budget.",
      read: "7 min read",
    },
  ];
  return (
    <section id="insights" className="py-24" style={{ background: LIGHT_BG }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.18em] mb-4" style={{ color: PURPLE }}>
            Insights
          </p>
          <h2 className="text-3xl lg:text-[2.4rem] font-extrabold leading-tight" style={{ color: INK }}>
            Insights on performance and growth marketing
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <motion.a
              key={p.title}
              href={CONSULT_HREF}
              {...fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col rounded-2xl bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ border: "1px solid #E6E6EE", boxShadow: "0 1px 2px rgba(17,17,17,0.04)" }}
            >
              <div className="relative h-44 overflow-hidden" style={{ background: "#12121F" }}>
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                <span
                  className="absolute top-4 left-4 z-10 text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 rounded-full text-white"
                  style={{ background: "rgba(8,8,14,0.55)", backdropFilter: "blur(4px)" }}
                >
                  {p.category}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold leading-snug mb-3" style={{ color: INK }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed mb-6" style={{ color: BODY }}>
                  {p.excerpt}
                </p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xs" style={{ color: MUTED }}>
                    {p.read}
                  </span>
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

// ─── Mobile WhatsApp FAB ─────────────────────────────────────────────────────────

function WhatsAppFab() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-100"
      style={{ background: "linear-gradient(135deg, #9B5FFF, #7B2FFF)", boxShadow: "0 12px 32px rgba(123,47,255,0.45)" }}
    >
      <MessageCircle size={24} className="text-white" />
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function PerformanceMarketing() {
  return (
    <main className="bg-white">
      <Hero />
      <Platforms />
      <Outcomes />
      <CaseStudies />
      <Process />
      <Pricing />
      <FAQ />
      <Insights />
      <FinalCTA />
      <WhatsAppFab />
    </main>
  );
}
