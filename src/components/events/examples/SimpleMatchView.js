"use client";

import { MatchHero, MatchDetailsCard } from "@/components/events";

/**
 * مثال على استخدام الكومبوننتات الجديدة
 * عرض مبسط للمباراة بدون الخرائط والطقس
 */
export default function SimpleMatchView({ fixture }) {
  if (!fixture) return null;

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <MatchHero fixture={fixture} />
      
      {/* Match Details Only */}
      <div className="max-w-2xl mx-auto">
        <MatchDetailsCard fixture={fixture} />
      </div>
    </div>
  );
}
