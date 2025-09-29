import Link from "next/link";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Weather Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            Real-time warnings about storms, heat, and wind to help you plan.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Live Stadium View</CardTitle>
          </CardHeader>
          <CardContent>
            Check conditions near the stadium and get route safety suggestions.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Safety Tips</CardTitle>
          </CardHeader>
          <CardContent>
            Practical advice for heat, rain, and dust to keep you protected.
          </CardContent>
        </Card>
      </section>

      <section className="text-sm text-muted-foreground">
        Explore upcoming <Link href="/events" className="underline underline-offset-4">events</Link> or current <Link href="/alerts" className="underline underline-offset-4">alerts</Link>.
      </section>

      <AboutSection />
    </div>
  );
}
