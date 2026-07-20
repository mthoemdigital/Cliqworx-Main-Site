import type { Metadata } from "next";
import { CTASection } from "@/components/site/CTASection";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free strategy session with CliqWorx. Tell us about your business and a senior practitioner will recommend the best next step, whether or not we end up working together.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <CTASection />
    </main>
  );
}
