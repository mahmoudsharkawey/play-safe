/**
 * Utility functions for match-related operations
 */

/**
 * Check if match is finished based on status
 * @param {string} statusShort - Short status from fixture
 * @returns {boolean}
 */
export function isMatchFinished(statusShort) {
  return ["FT", "AET", "PEN"].includes(statusShort);
}

/**
 * Get match score data
 * @param {Object} fixture - Fixture object
 * @returns {Object} Score data
 */
export function getMatchScore(fixture) {
  const fullHome = fixture?.score?.fulltime?.home ?? fixture?.goals?.home;
  const fullAway = fixture?.score?.fulltime?.away ?? fixture?.goals?.away;
  const penHome = fixture?.score?.penalty?.home;
  const penAway = fixture?.score?.penalty?.away;
  
  return {
    fullHome,
    fullAway,
    penHome,
    penAway,
    hasFullScore: (typeof fullHome === "number") && (typeof fullAway === "number"),
    hasPenalties: (typeof penHome === "number") && (typeof penAway === "number")
  };
}

/**
 * Get venue information
 * @param {Object} fixture - Fixture object
 * @returns {Object} Venue data
 */
export function getVenueInfo(fixture) {
  return {
    name: fixture?.fixture?.venue?.name,
    city: fixture?.fixture?.venue?.city,
  };
}

/**
 * Generate Google Maps URL for venue
 * @param {Object} coords - Coordinates object with latitude/longitude
 * @param {string} venueName - Venue name
 * @param {string} city - City name
 * @returns {string} Google Maps URL
 */
export function generateMapsUrl(coords, venueName, city) {
  if (coords) {
    return `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`;
  }
  
  const query = [venueName, city].filter(Boolean).join(', ');
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
