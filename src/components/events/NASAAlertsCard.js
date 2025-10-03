"use client";

import EonetAlerts from "@/components/alerts/EonetAlerts";
import Skeleton from "@/components/ui/Skeleton";

export default function NASAAlertsCard({ 
  coords, 
  alertsLoading, 
  alertsError, 
  alerts 
}) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">NASA Alerts (EONET)</h2>
      
      {coords && alertsLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      ) : (
        <EonetAlerts 
          isLoading={alertsLoading} 
          error={alertsError} 
          events={alerts} 
        />
      )}
    </div>
  );
}
