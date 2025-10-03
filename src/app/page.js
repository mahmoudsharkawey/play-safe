import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ExploreLinks from "@/components/home/ExploreLinks";
import InsightsSection from "@/components/home/InsightsSection";

export default function Home() {
  return (
    <div className="space-y-14">
      <Hero />
      <FeaturesSection />
      <InsightsSection />
      
      <AboutSection />
    </div>
  );
}
