"use client";

import { useMemo } from "react";
import { POPULAR_LEAGUE_IDS } from "@/shared/constants";

export default function LeagueFilter({ fixtures, value, onChange }) {
  const options = useMemo(() => {
    const map = new Map();
    for (const item of fixtures || []) {
      if (!item?.league) continue;
      const id = item.league.id;
      if (!map.has(id)) map.set(id, { id, name: item.league.name, country: item.league.country });
    }
    const arr = Array.from(map.values());
    arr.sort((a, b) => {
      const aRank = POPULAR_LEAGUE_IDS.indexOf(a.id);
      const bRank = POPULAR_LEAGUE_IDS.indexOf(b.id);
      const aIsPopular = aRank !== -1;
      const bIsPopular = bRank !== -1;
      if (aIsPopular && bIsPopular) return aRank - bRank;
      if (aIsPopular) return -1;
      if (bIsPopular) return 1;
      return a.name.localeCompare(b.name);
    });
    return arr;
  }, [fixtures]);

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-muted-foreground">League</label>
      <select
        className="rounded-md border bg-background px-2 py-1 text-sm"
        value={value || ""}
        onChange={(e) => onChange?.(e.target.value ? Number(e.target.value) : undefined)}
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name} {opt.country ? `(${opt.country})` : ""}
          </option>
        ))}
      </select>
    </div>
  );
}


