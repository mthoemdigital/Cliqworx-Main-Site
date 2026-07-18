import { Hero } from "@/components/site/Hero";
import { SegmentationGrid } from "@/components/site/SegmentationGrid";
import { CapabilityTabs } from "@/components/site/CapabilityTabs";
import { OperatingModel } from "@/components/site/OperatingModel";
import { Proof } from "@/components/site/Proof";
import { TechStack } from "@/components/site/TechStack";
import { FAQ } from "@/components/site/FAQ";
import { CTASection } from "@/components/site/CTASection";

export default function Home() {
  return (
    <main>
      <Hero />
      <SegmentationGrid />
      <CapabilityTabs />
      <OperatingModel />
      <Proof />
      <TechStack />
      <FAQ />
      <CTASection />
    </main>
  );
}
