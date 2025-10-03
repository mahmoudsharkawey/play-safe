# Insights Section - Historical Weather Data

## Overview
Added a new Insights section to the Alerts page to display historical weather data using NASA POWER API.

## Components Added

### 1. HistoricalInsights.js
- **Function**: Fetch and display historical weather data
- **Source**: NASA POWER API (free)
- **Data Displayed**:
  - Average maximum and minimum temperatures
  - Average annual rainfall
  - Average wind speed
  - Seasonal data (summer/winter)

### 2. LocationSelector.js
- **Function**: Select city to display its historical data
- **Available Cities**: 20 major cities in the region and worldwide
- **Features**:
  - Dropdown list of common cities
  - Custom search capability (in development)

## How to Use

1. Navigate to `/alerts` page
2. Select city from the dropdown list
3. Historical data will automatically appear for the selected city

## API Used

```javascript
// Example NASA POWER API call
const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=T2M_MAX,T2M_MIN,PRECTOTCORR,WS2M&community=RE&longitude=${lon}&latitude=${lat}&start=2014&end=2023&format=JSON`;
```

## Available Data

- **T2M_MAX**: Maximum temperature
- **T2M_MIN**: Minimum temperature  
- **PRECTOTCORR**: Corrected precipitation
- **WS2M**: Wind speed at 2m height

## Time Period
Data covers the period from 2014 to 2023 (last 10 years)

## Design System
- Uses the site's existing design system with CSS variables
- Dark theme compatible
- Responsive design
- Consistent with other components

## Future Development
- Add more cities
- Geocoding service for custom search
- Charts for historical data visualization
- City comparison feature
