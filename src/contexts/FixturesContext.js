"use client";

import { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";

export const FixturesContext = createContext({
  fixturesById: {},
  upsertFixtures: () => {},
  selectedFixture: null,
  setSelectedFixture: () => {},
});

export function FixturesProvider({ children }) {
  const [selectedFixture, setSelectedFixture] = useState(null);
  const fixturesRef = useRef({});
  const [, force] = useState(0);

  const upsertFixtures = useCallback((fixturesArray) => {
    if (!Array.isArray(fixturesArray) || fixturesArray.length === 0) return;
    let didChange = false;
    for (const f of fixturesArray) {
      const id = f?.fixture?.id;
      if (!id) continue;
      if (fixturesRef.current[id] !== f) {
        fixturesRef.current[id] = f;
        didChange = true;
      }
    }
    if (didChange) {
      try {
        const all = Object.values(fixturesRef.current);
        localStorage.setItem("ps.fixtures", JSON.stringify(all));
      } catch (_) {}
      force((x) => x + 1);
    }
  }, []);

  const value = useMemo(
    () => ({
      fixturesById: fixturesRef.current,
      upsertFixtures,
      selectedFixture,
      setSelectedFixture,
    }),
    [selectedFixture, upsertFixtures]
  );

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ps.fixtures");
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) {
          const map = {};
          for (const f of arr) {
            const id = f?.fixture?.id;
            if (id) map[id] = f;
          }
          fixturesRef.current = map;
          force((x) => x + 1);
        }
      }
      const selId = localStorage.getItem("ps.selectedId");
      if (selId && fixturesRef.current[selId]) {
        setSelectedFixture(fixturesRef.current[selId]);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      const id = selectedFixture?.fixture?.id;
      if (id) localStorage.setItem("ps.selectedId", String(id));
    } catch (_) {}
  }, [selectedFixture]);

  return <FixturesContext.Provider value={value}>{children}</FixturesContext.Provider>;
}


