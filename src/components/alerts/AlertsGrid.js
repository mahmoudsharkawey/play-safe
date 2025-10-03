import AlertCard from "./AlertCard";

export default function AlertsGrid({ alerts }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {alerts.map((a) => (
        <AlertCard key={a.id} alert={a} />)
      )}
    </div>
  );
}


