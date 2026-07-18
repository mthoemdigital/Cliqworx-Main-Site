import { Logo } from "./Logo";

const columns = [
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
];

export function Footer() {
  return (
    <footer
      className="py-16"
      style={{ background: "var(--cw-black)", borderTop: "1px solid rgba(123,47,255,0.12)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="h-16" />
            <p className="text-sm mt-4 leading-relaxed" style={{ color: "#555577" }}>
              Strategy. Technology. Growth.
              <br />
              One operating system for ambitious businesses.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.heading}>
              <p
                className="text-xs font-bold uppercase tracking-[0.15em] mb-4"
                style={{ color: "#555577" }}
              >
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
            <a
              href="/#proof"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "#333355" }}
            >
              Case Studies
            </a>
            <a
              href="/consultation"
              className="text-xs transition-colors hover:text-white"
              style={{ color: "#333355" }}
            >
              Contact
            </a>
            {["Privacy Policy", "Terms of Service"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs transition-colors hover:text-white"
                style={{ color: "#333355" }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
