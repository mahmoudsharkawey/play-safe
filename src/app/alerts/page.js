import alerts from "@/data/alerts.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Alerts" };

const severityToColor = {
  high: "text-red-400",
  medium: "text-yellow-400",
  low: "text-green-400",
};

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Alerts</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {alerts.map((a) => (
          <Card key={a.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{a.title}</span>
                <span className={`${severityToColor[a.severity]}`}>{a.severity}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                <p>{a.description}</p>
                <p className="text-xs text-muted-foreground">{a.location} • {new Date(a.time).toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}


