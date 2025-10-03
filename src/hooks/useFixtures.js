"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "./apiClient";

function buildFixturesKey(date) {
  return ["fixtures", { date }];
}

async function fetchFixtures(date) {
  const params = { date };
  const { data } = await apiClient.get("/fixtures", { params });
  return data;
}

export function useFixtures({ date, enabled = true, staleTime = 1000 * 60 } = {}) {
  return useQuery({
    queryKey: buildFixturesKey(date || undefined),
    queryFn: () => fetchFixtures(date),
    enabled,
    staleTime,
  });
}

function buildFixtureByIdKey(id) {
  return ["fixture", { id }];
}

async function fetchFixtureById(id) {
  const { data } = await apiClient.get(`/fixtures/${id}`);
  return data;
}

export function useFixtureById({ id, enabled = true, staleTime = 1000 * 30 } = {}) {
  return useQuery({
    queryKey: buildFixtureByIdKey(id),
    queryFn: () => fetchFixtureById(id),
    enabled: enabled && Boolean(id),
    staleTime,
  });
}


