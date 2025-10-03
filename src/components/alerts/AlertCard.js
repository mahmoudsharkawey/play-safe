import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const severityToColor = {
  high: "text-red-400",
  medium: "text-yellow-400",
  low: "text-green-400",
};

export default function AlertCard({ alert }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{alert.title}</span>
          <span className={`${severityToColor[alert.severity]}`}>{alert.severity}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <p>{alert.description}</p>
          <p className="text-xs text-muted-foreground">{alert.location} • {new Date(alert.time).toLocaleString()}</p>
        </div>
      </CardContent>
    </Card>
  );
}


