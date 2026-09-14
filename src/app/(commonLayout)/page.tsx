import { FeaturesSection } from "@/components/modules/landing/features";
import { HeroSection } from "@/components/modules/landing/hero";
import { HowItWorks } from "@/components/modules/landing/how-it-works";
import { PricingSection } from "@/components/modules/landing/pricing";
import { TestimonialsSection } from "@/components/modules/landing/testimonial";


export default function Home() {
  return (
      <main >
        <HeroSection />
        <HowItWorks />
        <FeaturesSection/>
        <PricingSection />
        <TestimonialsSection />
      </main>
  );
}
