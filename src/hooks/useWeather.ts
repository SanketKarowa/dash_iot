import { useQuery } from '@tanstack/react-query';

interface GeocodeResponse {
  results?: Array<{
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
  }>;
}

interface WeatherResponse {
  current: {
    time: string;
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: number;
    precipitation: number;
    weather_code: number;
    wind_speed_10m: number;
    uv_index: number;
    surface_pressure: number;
  };
  current_units: {
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    uv_index: string;
    surface_pressure: string;
  };
}

interface AirQualityResponse {
  current: {
    european_aqi: number;
    us_aqi: number;
    pm10: number;
    pm2_5: number;
  };
}

export interface ProcessedWeather {
  city: string;
  country: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  isDay: boolean;
  weatherCode: number;
  uvIndex: number;
  pressure: number;
  aqi: number;
  pm10: number;
  pm2_5: number;
  tempUnit: string;
  windUnit: string;
  pressureUnit: string;
}

const fetchWeather = async (cityName: string): Promise<ProcessedWeather> => {
  if (!cityName) throw new Error('City name is required');

  // 1. Geocoding
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
  const geoRes = await fetch(geoUrl);
  if (!geoRes.ok) throw new Error('Failed to fetch location data');
  const geoData: GeocodeResponse = await geoRes.json();

  if (!geoData.results || geoData.results.length === 0) {
    throw new Error(`Location not found: ${cityName}`);
  }

  const location = geoData.results[0];
  const { latitude, longitude } = location;

  // 2. Weather & Air Quality Data (Parallel Fetch)
  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,precipitation,weather_code,wind_speed_10m,uv_index,surface_pressure`;
  const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&current=european_aqi,us_aqi,pm10,pm2_5`;

  const [weatherRes, aqRes] = await Promise.all([
    fetch(weatherUrl),
    fetch(aqUrl)
  ]);

  if (!weatherRes.ok) throw new Error('Failed to fetch weather data');
  if (!aqRes.ok) throw new Error('Failed to fetch air quality data');

  const weatherData: WeatherResponse = await weatherRes.json();
  const aqData: AirQualityResponse = await aqRes.json();

  return {
    city: location.name,
    country: location.country,
    temperature: weatherData.current.temperature_2m,
    humidity: weatherData.current.relative_humidity_2m,
    windSpeed: weatherData.current.wind_speed_10m,
    isDay: weatherData.current.is_day === 1,
    weatherCode: weatherData.current.weather_code,
    uvIndex: weatherData.current.uv_index,
    pressure: weatherData.current.surface_pressure,
    aqi: aqData.current.european_aqi,
    pm10: aqData.current.pm10,
    pm2_5: aqData.current.pm2_5,
    tempUnit: weatherData.current_units.temperature_2m,
    windUnit: weatherData.current_units.wind_speed_10m,
    pressureUnit: weatherData.current_units.surface_pressure,
  };
};

export const useWeather = () => {
  const cityName = import.meta.env.VITE_WEATHER_CITY || 'London';

  return useQuery({
    queryKey: ['weather', cityName],
    queryFn: () => fetchWeather(cityName),
    refetchInterval: 15 * 60 * 1000, // Refetch every 15 minutes
    staleTime: 10 * 60 * 1000, // Data stays fresh for 10 minutes
    retry: 2,
  });
};
