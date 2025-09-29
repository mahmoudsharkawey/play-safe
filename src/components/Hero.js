import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-xl border">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="relative z-10 p-8 md:p-12 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
        <div className="text-center md:text-left space-y-4">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Stay Safe, Play Smart</h1>
          <p className="text-muted-foreground max-w-2xl">
            Live weather-informed guidance for sports events. Simple, clear, and timely.
          </p>
          <div>
            <Link href="/alerts">
              <Button size="lg">Check Today’s Conditions</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40 md:bg-black/20" aria-hidden />
    </section>
  );
}


