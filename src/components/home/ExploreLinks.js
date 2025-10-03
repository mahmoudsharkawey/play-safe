import Link from "next/link";
import { CalendarDays, Bell } from "lucide-react";

export default function ExploreLinks() {
  return (
    <section className="text-sm text-muted-foreground">
      Explore upcoming
      {' '}
      <Link href="/events" className="inline-flex items-center gap-1 group underline underline-offset-4">
        <CalendarDays className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        events
      </Link>
      {' '}or current{' '}
      <Link href="/alerts" className="inline-flex items-center gap-1 group underline underline-offset-4">
        <Bell className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        alerts
      </Link>
      .
    </section>
  );
}


