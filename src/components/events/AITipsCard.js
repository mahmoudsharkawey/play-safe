"use client";

import Skeleton from "@/components/ui/Skeleton";

export default function AITipsCard({ tipsState }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">AI Tips</h2>
      
      {tipsState.isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-4 w-3/6" />
        </div>
      ) : tipsState.error ? (
        <div className="text-sm text-red-500">{tipsState.error}</div>
      ) : tipsState.tips.length ? (
        <div className="space-y-2 text-sm">
          {tipsState.tips.map((tip, index) => (
            <p key={index}>{tip}</p>
          ))}
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">No tips available.</div>
      )}
    </div>
  );
}
