"use client";

import { MapPin, Building2, User, CheckCircle2 } from "lucide-react";

export default function MatchDetailsCard({ fixture }) {
  if (!fixture) return null;

  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Match Details</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-lg">
        <div className="flex items-center gap-3">
          <Building2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground text-sm">Venue</div>
            <div className="font-semibold">{fixture?.fixture?.venue?.name || "TBD"}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground text-sm">City</div>
            <div className="font-semibold">{fixture?.fixture?.venue?.city || "TBD"}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground text-sm">Referee</div>
            <div className="font-semibold">{fixture?.fixture?.referee || "TBD"}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
          <div>
            <div className="text-muted-foreground text-sm">Status</div>
            <div className="font-semibold">{fixture?.fixture?.status?.long || "TBD"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
