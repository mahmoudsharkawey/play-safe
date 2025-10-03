import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ExploreLinks from "@/components/home/ExploreLinks";

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />
      <FeaturesSection />
      <ExploreLinks />
      <AboutSection />
    </div>
  );
}
