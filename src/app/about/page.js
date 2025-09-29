import AboutSection from "@/components/AboutSection";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">About Play Safe</h1>
      <AboutSection variant="full" />
      <div className="text-sm text-muted-foreground">
        This is an early prototype with mock data. Live integrations will include NASA weather
        datasets and satellite‑derived indicators relevant to heat, storms, and air quality.
      </div>
    </div>
  );
}


