import Image from "next/image";
import { Chevron } from "@/components/ui/Chevron";
import { Container } from "@/components/ui/Container";

const COLUMNS = [
  {
    heading: "Services",
    links: [
      { label: "Strategy", href: "/#strategy" },
      { label: "Technology", href: "/#technology" },
      { label: "Growth", href: "/#growth" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Case Studies", href: "/#case-studies" },
      { label: "Insights", href: "/#insights" },
      { label: "Book a Consultation", href: "/consultation" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-cliq-black text-cliq-white">
      <Container className="grid gap-12 py-16 sm:py-20 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-24">
        <div className="flex flex-col gap-5">
          <Image
            src="/logo-cliqworx.png"
            alt="CliqWorx"
            width={758}
            height={190}
            className="h-10 w-auto"
          />
          <p className="max-w-[34ch] text-sm text-cliq-silver">
            An AI-first digital consultancy. We connect strategy, technology
            and growth into one accountable system, so ambitious businesses
            compound results instead of chasing them.
          </p>
          <p className="overline text-cliq-slate">Strategy. Technology. Growth.</p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.heading}>
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-cliq-slate">
              {col.heading}
            </h4>
            <ul className="flex flex-col gap-3">
              {col.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-2 text-sm text-cliq-silver transition-colors duration-200 ease-brand hover:text-cliq-white"
                  >
                    <Chevron className="size-2.5 text-cliq-purple" strokeWidth={3} />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.1em] text-cliq-slate">
            Contact
          </h4>
          <div className="flex flex-col gap-3 text-sm">
            <a
              href="mailto:hello@cliqworx.com"
              className="font-medium text-cliq-white transition-colors duration-200 ease-brand hover:text-cliq-violet"
            >
              hello@cliqworx.com
            </a>
            <p className="leading-relaxed text-cliq-silver">
              Johannesburg · Cape Town · Harare
              <br />
              Serving clients across Africa and internationally
            </p>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-wrap items-center justify-between gap-4 py-6">
          <p className="text-xs text-cliq-slate">
            © {new Date().getFullYear()} CliqWorx (Pty) Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-cliq-silver">
            <a href="#" className="transition-colors duration-200 hover:text-cliq-white">
              LinkedIn
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-cliq-white">
              X
            </a>
            <a href="#" className="transition-colors duration-200 hover:text-cliq-white">
              YouTube
            </a>
          </div>
        </Container>
      </div>
    </footer>
  );
}
