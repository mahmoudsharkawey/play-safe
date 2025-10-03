import alerts from "@/data/alerts.json";
import AlertsGrid from "@/components/alerts/AlertsGrid";

export const metadata = { title: "Alerts" };

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Alerts</h1>
      <AlertsGrid alerts={alerts} />
    </div>
  );
}


