import HeroSection from "@/components/home/hero-section";
import OriginSection from "@/components/home/origin-section";
import StagePath from "@/components/home/stage-path";
import GongfaCards from "@/components/home/gongfa-cards";
import ScrollReveal from "@/components/effects/scroll-reveal";

export default function HomePage() {
  return (
    <div className="relative">
      <HeroSection />
      <ScrollReveal delay={0} duration={800}>
        <OriginSection />
      </ScrollReveal>
      <ScrollReveal delay={0} duration={800}>
        <StagePath />
      </ScrollReveal>
      <ScrollReveal delay={0} duration={800}>
        <GongfaCards />
      </ScrollReveal>
    </div>
  );
}
