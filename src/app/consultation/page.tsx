import type { Metadata } from "next";
import { ShieldCheck, Clock, UserCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Overline } from "@/components/ui/Overline";
import { Chevron } from "@/components/ui/Chevron";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";

export const metadata: Metadata = {
  title: "Book a Consultation",
  description:
    "Thirty minutes with a senior CliqWorx consultant. No obligation, practical advice, and a clear starting roadmap you keep either way.",
  alternates: { canonical: "/consultation" },
};

const REASONS = [
  {
    icon: UserCheck,
    title: "A senior consultant, not a rep",
    description: "You speak with the person who would actually run the work, from day one.",
  },
  {
    icon: ShieldCheck,
    title: "No obligation",
    description: "If we're not the right partner, we'll tell you plainly and point you elsewhere.",
  },
  {
    icon: Clock,
    title: "Response within 24 hours",
    description: "We treat your time like it matters, because it does.",
  },
];

const TAKEAWAYS = [
  "An honest read on your website, systems and marketing",
  "The one thing we'd fix first, and why",
  "A practical 90-day starting roadmap, yours to keep",
];

export default function ConsultationPage() {
  return (
    <main className="bg-cliq-white pb-24 pt-36 sm:pt-40 md:pb-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <Overline>Book a consultation</Overline>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              A strategy session, not a sales pitch.
            </h1>
            <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-cliq-slate">
              Thirty minutes with a senior consultant. We&apos;ll tell you
              what we see, what we&apos;d do first, and whether we&apos;re the
              right partner to do it.
            </p>

            <ul className="mt-9 flex flex-col gap-6">
              {REASONS.map(({ icon: Icon, title, description }) => (
                <li key={title} className="flex gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-[#F6F3FF] text-cliq-purple">
                    <Icon size={18} strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold">{title}</h3>
                    <p className="mt-0.5 text-sm text-cliq-slate">{description}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-9 rounded-lg border border-cliq-light-grey bg-[#FAFAFB] p-6">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-cliq-slate">
                You leave with
              </p>
              <ul className="flex flex-col gap-3">
                {TAKEAWAYS.map((item) => (
                  <li key={item} className="flex items-baseline gap-3 text-sm text-cliq-black">
                    <Chevron className="size-2.5 shrink-0 translate-y-0.5 text-cliq-purple" strokeWidth={3} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="rounded-lg border border-cliq-light-grey bg-cliq-white p-6 shadow-cliq-md sm:p-8">
            <ConsultationForm />
          </div>
        </div>
      </Container>
    </main>
  );
}
