"use client";

import { useFixtures } from "@/hooks/useFixtures";
import MatchCard from "./MatchCard";
import { motion } from "framer-motion";
import { POPULAR_LEAGUE_IDS } from "@/shared/constants";

export default function MatchList({ date, leagueId, searchTerm }) {
  const { data, isLoading, error } = useFixtures({ date });

  if (isLoading) return <div>Loading fixtures...</div>;
  if (error) return <div className="text-red-500">Failed to load fixtures</div>;

  let fixtures = data?.response ?? [];
  const q = (searchTerm || "").trim().toLowerCase();
  if (leagueId) {
    fixtures = fixtures.filter((f) => String(f.league?.id ?? "") === String(leagueId));
  }
  if (q) {
    fixtures = fixtures.filter((f) => {
      const leagueName = (f.league?.name || "").toLowerCase();
      const homeName = (f.teams?.home?.name || "").toLowerCase();
      const awayName = (f.teams?.away?.name || "").toLowerCase();
      return leagueName.includes(q) || homeName.includes(q) || awayName.includes(q);
    });
  }

  // Group fixtures by league (id) while keeping league meta
  const leagueIdToGroup = new Map();
  for (const item of fixtures) {
    const key = item?.league?.id ?? "unknown";
    if (!leagueIdToGroup.has(key)) {
      leagueIdToGroup.set(key, { league: item.league, fixtures: [] });
    }
    leagueIdToGroup.get(key).fixtures.push(item);
  }
  const groups = Array.from(leagueIdToGroup.values());
  // Sort: popular leagues first (by defined order), then others alphabetically
  groups.sort((a, b) => {
    const aId = a.league?.id;
    const bId = b.league?.id;
    const aRank = POPULAR_LEAGUE_IDS.indexOf(aId);
    const bRank = POPULAR_LEAGUE_IDS.indexOf(bId);
    const aIsPopular = aRank !== -1;
    const bIsPopular = bRank !== -1;
    if (aIsPopular && bIsPopular) return aRank - bRank;
    if (aIsPopular) return -1;
    if (bIsPopular) return 1;
    return (a.league?.name || "").localeCompare(b.league?.name || "");
  });

  if (!fixtures.length) {
    return <div>No fixtures found.</div>;
  }

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <section key={group.league?.id || group.league?.name} className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">{group.league?.name}</h2>
            {group.league?.country ? (
              <span className="text-xs text-muted-foreground">{group.league.country}</span>
            ) : null}
          </div>
          <motion.div
            className="grid grid-cols-1 gap-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          >
            {group.fixtures.map((f) => (
              <motion.div
                key={f.fixture.id}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
              >
                <MatchCard fixture={f} hideLeague />
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
}


