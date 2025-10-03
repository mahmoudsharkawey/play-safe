# Historical Weather Card for Match Details

## Overview
Added a new `HistoricalWeatherCard` component to the match details page sidebar to display historical weather data for the match venue using NASA POWER API.

## Component Details

### HistoricalWeatherCard.js
- **Location**: `src/components/events/HistoricalWeatherCard.js`
- **Purpose**: Display historical weather data for match venues
- **Data Source**: NASA POWER API (free)
- **Integration**: Added to match details sidebar

## Features

### Data Displayed
- **Temperature Data**:
  - Annual maximum temperature
  - Annual minimum temperature
  - Summer maximum temperature (June-August)
  - Winter minimum temperature (December-February)

- **Precipitation & Wind**:
  - Annual rainfall average
  - Wind speed average
  - Percentage of rainy days

### Design Features
- **Consistent Styling**: Matches the existing design system
- **Loading States**: Shows skeleton loading while fetching data
- **Error Handling**: Displays error messages if data fetch fails
- **Responsive**: Works on all screen sizes
- **Dark Theme**: Compatible with the site's dark theme

## Integration

### Added to Match Details Page
- **Location**: Right sidebar in match details page
- **Position**: Between current weather and AI tips cards
- **Props**: Receives venue coordinates, city, and venue name

### Usage Example
```jsx
<HistoricalWeatherCard 
  coords={coords}
  city={city}
  venueName={venueName}
/>
```

## API Integration

### NASA POWER API
- **Endpoint**: `https://power.larc.nasa.gov/api/temporal/climatology/point`
- **Parameters**: T2M_MAX, T2M_MIN, PRECTOTCORR, WS2M
- **Time Period**: 2014-2023 (last 10 years)
- **Community**: RE (Renewable Energy)

### Data Processing
- Calculates annual averages from monthly data
- Computes seasonal averages (summer/winter)
- Handles missing or invalid data gracefully

## User Experience

### When Data is Available
- Shows comprehensive historical weather information
- Displays venue location information
- Includes data source attribution

### When Data is Loading
- Shows skeleton loading animation
- Maintains consistent layout

### When Data is Unavailable
- Shows appropriate error message
- Graceful degradation

## Technical Details

### Dependencies
- React hooks (useState, useEffect)
- Lucide React icons
- Custom Skeleton component
- Site's design system (CSS variables)

### Performance
- Fetches data only when coordinates are available
- Caches data in component state
- Handles API errors gracefully

## Future Enhancements
- Add charts for data visualization
- Compare with current weather conditions
- Add more detailed seasonal breakdowns
- Include weather trend analysis
