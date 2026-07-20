import type { Metadata } from "next";
import { PerformanceMarketing } from "@/components/performance/PerformanceMarketing";
import { FAQ_ITEMS } from "@/components/performance/pm-faq";

const siteUrl = "https://cliqworx.co.za";
const pageUrl = `${siteUrl}/performance-marketing`;

export const metadata: Metadata = {
  title: "Performance & Growth Marketing Agency",
  description:
    "CliqWorx is a data-driven performance and growth marketing agency in South Africa. Google Ads, Meta Ads, conversion rate optimisation and GA4 analytics that generate qualified leads, lower customer acquisition costs and drive measurable revenue growth.",
  keywords: [
    "Performance Marketing Agency",
    "Performance Marketing Services",
    "Growth Marketing Agency",
    "Growth Marketing",
    "Google Ads Agency",
    "Google Ads Management",
    "Meta Ads Management",
    "PPC Management",
    "Conversion Rate Optimisation",
    "Landing Page Optimisation",
    "Google Analytics 4",
    "Microsoft Clarity",
    "Marketing Analytics",
    "Customer Acquisition",
    "Lead Generation",
    "Revenue Growth",
    "Data-Driven Marketing",
    "Performance Marketing South Africa",
    "Growth Marketing for Startups",
    "Marketing for Small Business",
  ],
  alternates: { canonical: "/performance-marketing" },
  openGraph: {
    title: "Performance & Growth Marketing Agency | CliqWorx",
    description:
      "Data-driven performance and growth marketing that delivers qualified leads, lower acquisition costs and measurable revenue growth, not just traffic and clicks.",
    url: "/performance-marketing",
    type: "website",
  },
};

// Structured data: helps Google understand the service + surfaces FAQ rich results.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Performance & Growth Marketing",
      serviceType: "Performance Marketing Agency",
      provider: {
        "@type": "Organization",
        name: "CliqWorx",
        url: siteUrl,
      },
      areaServed: { "@type": "Country", name: "South Africa" },
      description:
        "Data-driven performance and growth marketing services including Google Ads and Meta Ads management, conversion rate optimisation, landing page optimisation and GA4 analytics.",
      url: pageUrl,
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function PerformanceMarketingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PerformanceMarketing />
    </>
  );
}
