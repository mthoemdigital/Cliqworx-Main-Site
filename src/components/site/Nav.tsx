"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const navItems = [
  {
    label: "Strategy",
    anchor: "/digital-strategy",
    // Every Strategy service links through to the Digital Strategy page for now.
    linkTo: "/digital-strategy",
    items: [
      "Digital Strategy",
      "Digital Transformation",
      "Fractional Product Management",
      "AI Readiness & Strategy",
      "Customer Experience",
      "Process Optimisation",
    ],
    industries: [
      "Education",
      "Financial Services",
      "Transport & Logistics",
      "Healthtech",
      "E-commerce",
      "SMEs",
    ],
  },
  {
    label: "Build",
    anchor: "/#build",
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
    anchor: "/performance-marketing",
    // Every Growth service links through to the Performance & Growth Marketing page.
    linkTo: "/performance-marketing",
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

export function Nav() {
  const [open, setOpen] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isPerf = pathname === "/performance-marketing";

  // Nav appearance mode:
  //  - "light": performance page at the top — light bar to match the white hero
  //  - "dark":  scrolled, or any interior page (solid dark bar)
  //  - "transparent": homepage at the top (dark hero shows through)
  const mode: "light" | "dark" | "transparent" =
    isPerf && !scrolled ? "light" : scrolled || pathname !== "/" ? "dark" : "transparent";

  const onLight = mode === "light";
  const linkColor = onLight ? "#33334D" : "#CCCCCC";
  const linkActive = onLight ? "#7B2FFF" : "#C4A0FF";
  const iconColor = onLight ? "#1A1A2E" : "#FFFFFF";

  const navStyle =
    mode === "light"
      ? {
          background: "rgba(255,255,255,0.72)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(17,17,17,0.07)",
        }
      : mode === "dark"
        ? {
            background: "rgba(8,8,14,0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(123,47,255,0.15)",
          }
        : { background: "transparent", backdropFilter: "none", borderBottom: "none" };

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={navStyle}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <a href="/" aria-label="Cliqworx home">
            <Logo className="h-14" invert={!onLight} />
          </a>

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
                  style={{ color: open === item.label ? linkActive : linkColor }}
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
                          {item.items.map((sub) =>
                            item.linkTo ? (
                              <a
                                key={sub}
                                href={item.linkTo}
                                onClick={() => setOpen(null)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[rgba(123,47,255,0.12)]"
                                style={{ color: "#AAAACC" }}
                              >
                                <div
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: "#7B2FFF" }}
                                />
                                {sub}
                              </a>
                            ) : (
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
                            )
                          )}
                        </div>
                        {item.industries && (
                          <div
                            className="mt-4 pt-4"
                            style={{ borderTop: "1px solid rgba(123,47,255,0.12)" }}
                          >
                            <p
                              className="text-xs font-bold uppercase tracking-[0.15em] mb-3"
                              style={{ color: "#555577" }}
                            >
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

            <a
              href="/performance-marketing#insights"
              className="px-4 py-2 text-sm font-semibold rounded-lg transition-colors"
              style={{ color: linkColor }}
            >
              Insights
            </a>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="/contact"
              className="px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: "#7B2FFF", color: "#FFFFFF" }}
            >
              Book a Consultation
            </a>
          </div>

          {/* Mobile */}
          <button
            className="lg:hidden p-2"
            style={{ color: iconColor }}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
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
                    {item.items.map((sub) =>
                      item.linkTo ? (
                        <a
                          key={sub}
                          href={item.linkTo}
                          onClick={() => setMobileOpen(false)}
                          className="block text-sm py-1"
                          style={{ color: "#8888AA" }}
                        >
                          {sub}
                        </a>
                      ) : (
                        <p key={sub} className="text-sm py-1" style={{ color: "#8888AA" }}>
                          {sub}
                        </p>
                      )
                    )}
                  </div>
                </div>
              ))}
              <a
                href="/performance-marketing#insights"
                className="block text-base font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Insights
              </a>
              <a
                href="/contact"
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
