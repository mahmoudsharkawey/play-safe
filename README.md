# Play Safe 🌤️⚽

**Live weather-informed guidance for sports events. Simple, clear, and timely.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-https://play--safe--one.vercel.app-blue?style=for-the-badge)](https://play-safe-one.vercel.app/)

## 🎯 Problem We Solve

Sports events are often disrupted by unpredictable weather conditions, leading to:
- **Safety risks** for athletes and spectators
- **Economic losses** from cancelled/postponed events
- **Poor planning** due to lack of weather insights
- **Limited awareness** of venue-specific conditions

## 🚀 Solution

Play Safe bridges **space-based data** with **practical, event-oriented applications**, combining:
- **Predictive alerts** for weather hazards
- **Live satellite imagery** for specific venues
- **Historical weather insights** for better planning
- **AI-powered safety recommendations**

## ✨ Key Features

### 🌤️ Weather Alerts
- Real-time warnings about storms, heat, and wind
- NASA EONET integration for natural disaster alerts
- Venue-specific weather conditions

### 🗺️ Live Stadium View
- Interactive maps showing venue locations
- Real-time weather conditions near stadiums
- Route safety suggestions

### 📊 Historical Insights
- 10-year weather data analysis using NASA POWER API
- Temperature, precipitation, and wind patterns
- Seasonal trends and averages

### 🤖 AI Safety Tips
- Personalized recommendations based on current conditions
- Heat, rain, and dust protection advice
- Event-specific safety guidance

## 🔧 APIs Used

### 1. **NASA POWER API** 🌍
- **URL**: https://power.larc.nasa.gov/api
- **Purpose**: Historical weather data (2014-2023)
- **Data**: Temperature, precipitation, wind speed
- **Cost**: Free
- **Documentation**: [NASA POWER Documentation](https://power.larc.nasa.gov/docs/)

### 2. **NASA EONET API** 🛰️
- **URL**: https://eonet.gsfc.nasa.gov/api/v3/events
- **Purpose**: Real-time natural disaster alerts
- **Data**: Wildfires, storms, volcanic activity
- **Cost**: Free
- **Documentation**: [EONET API Documentation](https://eonet.gsfc.nasa.gov/docs/v3.0)

### 3. **OpenWeatherMap API** 🌦️
- **URL**: https://openweathermap.org/api
- **Purpose**: Current weather conditions
- **Data**: Temperature, humidity, wind, precipitation
- **Cost**: Free tier available
- **Documentation**: [OpenWeatherMap API](https://openweathermap.org/api)

### 4. **OpenCage Geocoding API** 📍
- **URL**: https://opencagedata.com/api
- **Purpose**: Location geocoding and reverse geocoding
- **Data**: Coordinates, address information
- **Cost**: Free tier available
- **Documentation**: [OpenCage API Documentation](https://opencagedata.com/api)

### 5. **API-Sports (Football)** ⚽
- **URL**: https://api-sports.io/documentation/football
- **Purpose**: Football fixtures and match data
- **Data**: Teams, matches, leagues, venues
- **Cost**: Free tier available
- **Documentation**: [API-Sports Documentation](https://api-sports.io/documentation/football)

### 6. **Google Gemini AI** 🤖
- **URL**: https://ai.google.dev/gemini-api
- **Purpose**: AI-powered safety recommendations
- **Data**: Weather analysis and safety tips
- **Cost**: Free tier available
- **Documentation**: [Gemini API Documentation](https://ai.google.dev/gemini-api)

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with CSS Variables
- **Maps**: [Leaflet](https://leafletjs.com/) with React Leaflet
- **Charts**: [Chart.js](https://www.chartjs.org/) with React Chart.js 2
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context + TanStack Query

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/play-safe.git
cd play-safe
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_OPENCAGE_KEY=your-opencage-key
NEXT_PUBLIC_APISPORTS_KEY=your-api-football-key
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-key
NEXT_PUBLIC_OPENWEATHER_KEY=your-openweather-key
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── insights/          # Historical weather insights
│   ├── events/            # Match details and events
│   └── about/             # About page
├── components/            # Reusable components
│   ├── alerts/           # Weather alert components
│   ├── events/           # Event-related components
│   ├── maps/             # Map components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── contexts/             # React contexts
└── utils/                # Utility functions
```

## 🌐 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/play-safe)

### Manual Deployment
```bash
npm run build
npm start
```

## 📊 Impact

- ✅ **Improves safety** with timely preventive actions
- ✅ **Reduces economic losses** via better contingency planning  
- ✅ **Delivers peace of mind** through science-backed insights
- ✅ **Keeps communities informed** and safe

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **NASA** for providing free weather and satellite data APIs
- **OpenWeatherMap** for current weather data
- **API-Sports** for football data
- **Google** for Gemini AI capabilities
- **Vercel** for hosting and deployment

---

**Play Safe** - Keeping communities informed and safe. 🌤️⚽

[Live Demo](https://play-safe-one.vercel.app/) | [Documentation](https://github.com/your-username/play-safe/wiki) | [Report Bug](https://github.com/your-username/play-safe/issues)
