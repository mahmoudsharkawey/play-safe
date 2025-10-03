"use client";
import { useState, useContext, useEffect, useMemo } from "react";
import { useFixtures } from "@/hooks/useFixtures";
import { FixturesContext } from "@/contexts/FixturesContext";
import LeagueFilter from "./LeagueFilter";
import MatchList from "./MatchList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function MatchesExplorer({ date }) {
  const { data, isLoading, error } = useFixtures({ date });
  const [leagueId, setLeagueId] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const { upsertFixtures } = useContext(FixturesContext);

  const fixtures = useMemo(() => data?.response ?? [], [data]);

  useEffect(() => {
    if (fixtures.length) {
      upsertFixtures(fixtures);
    }
  }, [fixtures, upsertFixtures]);

  if (isLoading) return <LoadingSpinner size="lg" />
  if (error) return <div className="text-red-500">Failed to load fixtures</div>;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3">
        <LeagueFilter fixtures={fixtures} value={leagueId} onChange={setLeagueId} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by league or team..."
          className="min-w-[220px] flex-1 rounded-md border bg-background px-3 py-2 text-sm"
        />
      </div>
      <MatchList date={date} leagueId={leagueId} searchTerm={searchTerm} />
    </div>
  );
}


