import type { Metadata } from "next";
import { DigitalStrategy } from "@/components/digital-strategy/DigitalStrategy";

const siteUrl = "https://cliqworx.co.za";
const pageUrl = `${siteUrl}/digital-strategy`;

export const metadata: Metadata = {
  title: "Digital Strategy Consulting",
  description:
    "CliqWorx digital strategy consulting: a clear, executable roadmap that aligns business strategy, technology and customer experience. Digital transformation, AI readiness, fractional product management and process optimisation.",
  keywords: [
    "Digital Strategy",
    "Digital Strategy Consulting",
    "Digital Transformation",
    "AI Readiness",
    "Fractional Product Management",
    "Customer Experience",
    "Process Optimisation",
    "Digital Consulting South Africa",
  ],
  alternates: { canonical: "/digital-strategy" },
  openGraph: {
    title: "Digital Strategy Consulting | CliqWorx",
    description:
      "Turn ambition into a clear, executable strategy. Aligning strategy, technology and customer experience into a roadmap that ships.",
    url: "/digital-strategy",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Digital Strategy Consulting",
  serviceType: "Digital Strategy & Transformation Consulting",
  provider: { "@type": "Organization", name: "CliqWorx", url: siteUrl },
  areaServed: { "@type": "Country", name: "South Africa" },
  description:
    "Digital strategy and transformation consulting: prioritised roadmaps, AI readiness, fractional product management, customer experience and process optimisation.",
  url: pageUrl,
};

export default function DigitalStrategyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <DigitalStrategy />
    </>
  );
}
