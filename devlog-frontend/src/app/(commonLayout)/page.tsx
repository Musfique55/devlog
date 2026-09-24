import  FeaturesSection  from "@/components/modules/landing/features-section";
import { HeroSection } from "@/components/modules/landing/hero";
import { HowItWorks } from "@/components/modules/landing/how-it-works";
import  PricingSection  from "@/components/modules/landing/pricing-section";
import { TestimonialsSection } from "@/components/modules/landing/testimonial";
import CTAsection from "@/components/modules/landing/cta-section"

export default function Home() {
  return (
      <main >
        <HeroSection />
        <HowItWorks />
        <FeaturesSection/>
        <PricingSection />
        <TestimonialsSection />
        <CTAsection />
      </main>
  );
}
