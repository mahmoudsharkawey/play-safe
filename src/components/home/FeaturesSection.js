import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FeaturesSection() {
  return (
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
  );
}


