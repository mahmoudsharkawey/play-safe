import events from "@/data/events.json";

export const metadata = { title: "Events" };

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString();
}

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Upcoming Events</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left">
            <tr className="border-b">
              <th className="py-2 pr-4">Match</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2 pr-4">Stadium</th>
              <th className="py-2">Expected Weather</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id} className="border-b/50">
                <td className="py-3 pr-4 font-medium">{e.homeTeam} vs {e.awayTeam}</td>
                <td className="py-3 pr-4 whitespace-nowrap">{formatDate(e.date)}</td>
                <td className="py-3 pr-4">{e.stadium}</td>
                <td className="py-3">{e.expectedWeather}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


