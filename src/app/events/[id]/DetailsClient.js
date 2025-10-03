"use client";

import { useContext } from "react";
import { FixturesContext } from "@/contexts/FixturesContext";
import { useWeather } from "@/hooks/useWeather";
import { useWeatherTips } from "@/hooks/useWeatherTips";
import { useEonetAlerts } from "@/hooks/useEonetAlerts";
import { getVenueInfo } from "@/utils/matchUtils";

// Import the new separated components
import {
  MatchHero,
  MatchDetailsCard,
  VenueMapSection,
  WeatherCard,
  AITipsCard,
  NASAAlertsCard
} from "@/components/events";

export default function DetailsClient({ id }) {
  const { fixturesById, selectedFixture } = useContext(FixturesContext);
  const fixture = selectedFixture || fixturesById?.[id];
  
  // Extract venue information using utility function
  const { name: venueName, city } = getVenueInfo(fixture);
  
  // Custom hooks for data fetching
  const { isLoading: weatherLoading, error: weatherError, data: weather, coords } = useWeather({ venueName, city });
  const tipsState = useWeatherTips({
    temperatureC: weather?.current_weather?.temperature,
    windKmh: weather?.current_weather?.windspeed,
    city,
    venueName,
  });
  const { isLoading: alertsLoading, error: alertsError, events: alerts } = useEonetAlerts({ 
    latitude: coords?.latitude, 
    longitude: coords?.longitude, 
    radiusKm: 200 
  });

  // Early return if no fixture data
  if (!fixture) {
    return (
      <div className="text-sm text-muted-foreground">
        No details available for this match.
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <MatchHero fixture={fixture} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <MatchDetailsCard fixture={fixture} />
          <VenueMapSection coords={coords} venueName={venueName} city={city} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <WeatherCard 
            weatherLoading={weatherLoading}
            weatherError={weatherError}
            weather={weather}
            coords={coords}
            venueName={venueName}
            city={city}
          />
          <AITipsCard tipsState={tipsState} />
          <NASAAlertsCard 
            coords={coords}
            alertsLoading={alertsLoading}
            alertsError={alertsError}
            alerts={alerts}
          />
        </div>
      </div>
    </>
  );
}

