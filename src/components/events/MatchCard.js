"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import { FixturesContext } from "@/contexts/FixturesContext";

export default function MatchCard({ fixture, hideLeague = false }) {
  const home = fixture?.teams?.home;
  const away = fixture?.teams?.away;
  const league = fixture?.league;
  const kickoff = fixture?.fixture?.date
    ? new Date(fixture.fixture.date).toLocaleString(undefined, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : "TBD";

  const { setSelectedFixture } = useContext(FixturesContext);
  const href = fixture?.fixture?.id ? `/events/${fixture.fixture.id}` : undefined;

  return (
    <motion.div
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-3"
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
    >
      {href ? <Link href={href} className="block no-underline text-inherit" onClick={() => setSelectedFixture(fixture)}> 
        
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div className="min-w-0">
          {!hideLeague && (
            <div className="text-sm text-muted-foreground truncate max-w-[16rem]">
              {league?.name} {league?.round ? `• ${league.round}` : ""}
            </div>
          )}
          <div className="text-xs text-muted-foreground truncate max-w-[16rem]">{kickoff}</div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center justify-end gap-2 min-w-0">
            <span className="font-medium truncate max-w-[12rem] text-right">{home?.name}</span>
            <img src={home?.logo} alt={home?.name} className="h-6 w-6 object-contain" />
          </div>
          <span className="text-sm font-semibold">vs</span>
          <div className="flex items-center gap-2 min-w-0">
            <img src={away?.logo} alt={away?.name} className="h-6 w-6 object-contain" />
            <span className="font-medium truncate max-w-[12rem]">{away?.name}</span>
          </div>
        </div>

        {fixture?.goals ? (
          <div className="justify-self-end inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-base font-semibold">
            <span>{fixture.goals.home}</span>
            <span className="text-muted-foreground">-</span>
            <span>{fixture.goals.away}</span>
          </div>
        ) : null}
      </div>
      </Link> : 
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <div className="min-w-0">
          {!hideLeague && (
            <div className="text-sm text-muted-foreground truncate max-w-[16rem]">
              {league?.name} {league?.round ? `• ${league.round}` : ""}
            </div>
          )}
          <div className="text-xs text-muted-foreground truncate max-w-[16rem]">{kickoff}</div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="flex items-center justify-end gap-2 min-w-0">
            <span className="font-medium truncate max-w-[12rem] text-right">{home?.name}</span>
            <img src={home?.logo} alt={home?.name} className="h-6 w-6 object-contain" />
          </div>
          <span className="text-sm font-semibold">vs</span>
          <div className="flex items-center gap-2 min-w-0">
            <img src={away?.logo} alt={away?.name} className="h-6 w-6 object-contain" />
            <span className="font-medium truncate max-w-[12rem]">{away?.name}</span>
          </div>
        </div>

        {fixture?.goals ? (
          <div className="justify-self-end inline-flex items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-base font-semibold">
            <span>{fixture.goals.home}</span>
            <span className="text-muted-foreground">-</span>
            <span>{fixture.goals.away}</span>
          </div>
        ) : null}
      </div>}
    </motion.div>
  );
}


