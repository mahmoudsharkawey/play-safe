import Link from "next/link";

export default function ExploreLinks() {
  return (
    <section className="text-sm text-muted-foreground">
      Explore upcoming <Link href="/events" className="underline underline-offset-4">events</Link> or current <Link href="/alerts" className="underline underline-offset-4">alerts</Link>.
    </section>
  );
}


