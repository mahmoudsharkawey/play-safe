import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CloudLightning, MapPin, ShieldAlert } from "lucide-react";

export default function FeaturesSection() {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="rounded-md p-2 bg-rose-500/10 text-rose-600"><CloudLightning size={18} /></div>
          <CardTitle>Weather Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          Real-time warnings about storms, heat, and wind to help you plan.
        </CardContent>
      </Card>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="rounded-md p-2 bg-blue-500/10 text-blue-600"><MapPin size={18} /></div>
          <CardTitle>Live Stadium View</CardTitle>
        </CardHeader>
        <CardContent>
          Check conditions near the stadium and get route safety suggestions.
        </CardContent>
      </Card>
      <Card className="transition-all hover:shadow-md">
        <CardHeader className="flex flex-row items-center gap-3">
          <div className="rounded-md p-2 bg-amber-500/10 text-amber-600"><ShieldAlert size={18} /></div>
          <CardTitle>Safety Tips</CardTitle>
        </CardHeader>
        <CardContent>
          Practical advice for heat, rain, and dust to keep you protected.
        </CardContent>
      </Card>
    </section>
  );
}


