import { Star } from "lucide-react";
import { Logo } from "./Logo";

/* Footer colour hierarchy (bg #0A0A0F):
   headings near-white #E4E4F0 · links light grey #B0B0C8 ·
   supporting copy #8F8FAD · metadata #6A6A85 · hover purple (via .flink) */

const columns = [
  {
    heading: "Strategy",
    href: "/contact",
    links: ["Digital Strategy", "Transformation", "AI Readiness", "Process Optimisation"],
  },
  {
    heading: "Build",
    href: "/contact",
    links: ["Web Applications", "Website Design", "AI Solutions", "CRM Integrations"],
  },
  {
    heading: "Growth",
    href: "/performance-marketing",
    links: ["Performance Marketing", "Lead Generation", "Marketing Automation", "Analytics"],
  },
];

const bottomLinks = [
  { label: "Performance Marketing", href: "/performance-marketing" },
  { label: "Case Studies", href: "/#proof" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "LinkedIn", href: "#" },
];

export function Footer() {
  return (
    <footer style={{ background: "#0A0A0F" }}>
      {/* Main footer */}
      <div
        className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-14"
        style={{ borderTop: "1px solid rgba(123,47,255,0.1)" }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14 mb-16">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-16" />
            <p className="mt-6 text-sm font-bold leading-relaxed" style={{ color: "#E4E4F0" }}>
              Strategy.
              <br />
              Technology.
              <br />
              Growth.
            </p>
            <p className="mt-4 text-sm leading-relaxed max-w-[30ch]" style={{ color: "#8F8FAD" }}>
              Helping ambitious businesses build scalable digital systems that drive measurable
              growth.
            </p>
            <a
              href="/contact"
              className="cta-elevate inline-block mt-6 px-5 py-2.5 rounded-lg text-sm font-bold text-white"
            >
              Book a Free Strategy Session
            </a>
            <p className="mt-3 text-xs leading-relaxed" style={{ color: "#6A6A85" }}>
              No obligation.
              <br />
              Just practical advice.
            </p>
          </div>

          {/* Nav columns */}
          {columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-xs font-extrabold uppercase tracking-[0.22em] mb-6"
                style={{ color: "#E4E4F0" }}
              >
                {col.heading}
              </p>
              <ul className="space-y-4">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href={col.href} className="flink text-sm" style={{ color: "#B0B0C8" }}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust block */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex items-center gap-0.5" aria-label="Five star rating">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} size={12} fill="#9B5FFF" stroke="none" aria-hidden="true" />
              ))}
            </span>
            <span className="text-sm font-semibold" style={{ color: "#E4E4F0" }}>
              Trusted by ambitious businesses
            </span>
          </div>
          <p className="text-sm" style={{ color: "#8F8FAD" }}>
            Helping businesses across South Africa and Zimbabwe build scalable digital systems.
          </p>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between pt-10 gap-6"
          style={{ borderTop: "1px solid rgba(123,47,255,0.08)" }}
        >
          <p className="text-xs" style={{ color: "#6A6A85" }}>
            {new Date().getFullYear()} Cliqworx. All rights reserved.
          </p>
          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {bottomLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="flink text-xs" style={{ color: "#B0B0C8" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
