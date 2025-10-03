"use client";

import { isToday, formatTime, formatDate } from "@/lib/utils";

export default function MatchHero({ fixture }) {
  if (!fixture) return null;

  const statusShort = fixture?.fixture?.status?.short;
  const isFinished = ["FT", "AET", "PEN"].includes(statusShort);
  const fullHome = fixture?.score?.fulltime?.home ?? fixture?.goals?.home;
  const fullAway = fixture?.score?.fulltime?.away ?? fixture?.goals?.away;
  const penHome = fixture?.score?.penalty?.home;
  const penAway = fixture?.score?.penalty?.away;

  return (
    <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-[#0a0a0a] via-black to-[#121212] p-8 md:p-12">
      <div className="absolute -left-24 -top-24 h-96 w-96 rotate-45 bg-gradient-to-br from-zinc-800/40 to-transparent blur-3xl" />
      <div className="absolute -right-24 -bottom-24 h-96 w-96 -rotate-45 bg-gradient-to-br from-zinc-800/40 to-transparent blur-3xl" />

      <div className="flex flex-col items-center gap-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80">
          <span className="inline-block h-2 w-2 rounded-full bg-white/70" />
          <span className="truncate max-w-[18rem]">
            {fixture?.league?.name || "League"}
          </span>
        </div>

        <div className="text-center space-y-2">
          <div className="text-5xl md:text-7xl font-extrabold tracking-tight">
            {isToday(fixture?.fixture?.date) ? "TODAY" : formatDate(fixture?.fixture?.date)}
          </div>
          <div className="text-2xl md:text-3xl font-semibold text-white/80">
            {formatTime(fixture?.fixture?.date)}
          </div>
        </div>

        <div className="grid grid-cols-3 items-end w-full max-w-6xl gap-6 pt-6">
          <div className="flex flex-col items-center gap-4">
            <img 
              src={fixture?.teams?.home?.logo} 
              alt={fixture?.teams?.home?.name} 
              className="h-28 w-28 md:h-32 md:w-32 object-contain drop-shadow" 
            />
            <div className="text-3xl md:text-4xl font-extrabold text-center">
              {fixture?.teams?.home?.name}
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center pb-4">
            {isFinished ? (
              <>
                <div className="text-base uppercase tracking-widest text-white/60">Final score</div>
                <div className="text-3xl font-extrabold">
                  {(typeof fullHome === "number") && (typeof fullAway === "number") ? `${fullHome} - ${fullAway}` : "-"}
                </div>
                {(typeof penHome === "number") && (typeof penAway === "number") ? (
                  <div className="text-xs text-white/70 mt-1">pens {penHome}-{penAway}</div>
                ) : null}
              </>
            ) : (
              <>
                <div className="text-base uppercase tracking-widest text-white/60">Kickoff</div>
                <div className="text-3xl font-bold">{formatTime(fixture?.fixture?.date)}</div>
              </>
            )}
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <img 
              src={fixture?.teams?.away?.logo} 
              alt={fixture?.teams?.away?.name} 
              className="h-28 w-28 md:h-32 md:w-32 object-contain drop-shadow" 
            />
            <div className="text-3xl md:text-4xl font-extrabold text-center">
              {fixture?.teams?.away?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
