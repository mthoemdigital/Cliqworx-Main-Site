import { Hero } from "@/components/home/Hero";
import { CredibilityBar } from "@/components/home/CredibilityBar";
import { NeedRouter } from "@/components/home/NeedRouter";
import { CapabilityPreview } from "@/components/home/CapabilityPreview";
import { WorxSystem } from "@/components/home/WorxSystem";
import { CaseStudiesPreview } from "@/components/home/CaseStudiesPreview";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { TechStack } from "@/components/home/TechStack";
import { CTASection } from "@/components/home/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <CredibilityBar />
      <NeedRouter />
      <CapabilityPreview />
      <WorxSystem />
      <CaseStudiesPreview />
      <InsightsPreview />
      <TechStack />
      <CTASection />
    </main>
  );
}
