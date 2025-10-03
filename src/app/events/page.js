import MatchesExplorer from "@/components/events/MatchesExplorer";

export const metadata = { title: "Events" };

export default function EventsPage() {
  // Use local time for today's date (not UTC)
  const today = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString()
    .split("T")[0];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Upcoming Events</h1>
      <MatchesExplorer date={today} />
    </div>
  );
}
