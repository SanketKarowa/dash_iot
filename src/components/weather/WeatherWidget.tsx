import { useWeather } from '../../hooks/useWeather';
import { GlassCard } from '../shared/GlassCard';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudLightning, 
  Snowflake, 
  CloudFog, 
  CloudDrizzle, 
  Loader2, 
  Droplets, 
  Wind,
  MapPin,
  AlertCircle,
  Thermometer,
  Gauge,
  Waves
} from 'lucide-react';
import { cn } from '../../lib/utils';

export function WeatherWidget() {
  const { data: weather, isLoading, isError, error } = useWeather();

  const getWeatherIcon = (code: number, isDay: boolean) => {
    // WMO Weather interpretation codes
    if (code === 0) return <Sun className={cn("w-12 h-12", isDay ? "text-yellow-400 drop-shadow-[0_0_12px_rgba(250,204,21,0.4)]" : "text-gray-300")} />;
    if (code >= 1 && code <= 3) return <Cloud className="w-12 h-12 text-gray-300" />;
    if (code >= 45 && code <= 48) return <CloudFog className="w-12 h-12 text-gray-400" />;
    if (code >= 51 && code <= 57) return <CloudDrizzle className="w-12 h-12 text-blue-300" />;
    if (code >= 61 && code <= 67) return <CloudRain className="w-12 h-12 text-blue-400" />;
    if (code >= 71 && code <= 77) return <Snowflake className="w-12 h-12 text-white" />;
    if (code >= 80 && code <= 82) return <CloudRain className="w-12 h-12 text-blue-500" />;
    if (code >= 85 && code <= 86) return <Snowflake className="w-12 h-12 text-white" />;
    if (code >= 95 && code <= 99) return <CloudLightning className="w-12 h-12 text-yellow-500" />;
    return <Sun className={cn("w-12 h-12", isDay ? "text-yellow-400" : "text-gray-300")} />;
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return "Clear Sky";
    if (code >= 1 && code <= 3) return "Partly Cloudy";
    if (code >= 45 && code <= 48) return "Foggy";
    if (code >= 51 && code <= 57) return "Drizzle";
    if (code >= 61 && code <= 67) return "Rain";
    if (code >= 71 && code <= 77) return "Snow";
    if (code >= 80 && code <= 82) return "Showers";
    if (code >= 85 && code <= 86) return "Snow Showers";
    if (code >= 95 && code <= 99) return "Thunderstorm";
    return "Unknown";
  };

  const getAqiStatus = (aqi: number) => {
    if (aqi <= 20) return { label: 'Excellent', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
    if (aqi <= 40) return { label: 'Good', color: 'text-green-400', bg: 'bg-green-400/10' };
    if (aqi <= 60) return { label: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
    if (aqi <= 80) return { label: 'Poor', color: 'text-orange-400', bg: 'bg-orange-400/10' };
    return { label: 'Very Poor', color: 'text-red-400', bg: 'bg-red-400/10' };
  };

  const getUvStatus = (uv: number) => {
    if (uv <= 2) return { label: 'Low', color: 'text-green-400' };
    if (uv <= 5) return { label: 'Moderate', color: 'text-yellow-400' };
    if (uv <= 7) return { label: 'High', color: 'text-orange-400' };
    if (uv <= 10) return { label: 'Very High', color: 'text-red-400' };
    return { label: 'Extreme', color: 'text-purple-400' };
  };

  if (isLoading) {
    return (
      <GlassCard className="flex flex-col justify-center items-center h-full min-h-[400px]">
        <Loader2 className="w-10 h-10 text-indigo-500 animate-spin" />
        <span className="mt-4 text-[var(--text-muted)] text-sm font-medium">Syncing weather data...</span>
      </GlassCard>
    );
  }

  if (isError) {
    return (
      <GlassCard className="flex flex-col justify-center items-center h-full min-h-[400px]">
        <div className="p-4 rounded-full bg-red-500/10 mb-4">
          <AlertCircle className="w-10 h-10 text-red-400" />
        </div>
        <span className="text-red-400 text-sm font-medium text-center px-6">
          {error instanceof Error ? error.message : "Failed to load weather data"}
        </span>
      </GlassCard>
    );
  }

  if (!weather) return null;

  const aqiInfo = getAqiStatus(weather.aqi);
  const uvInfo = getUvStatus(weather.uvIndex);

  return (
    <GlassCard className="flex flex-col h-full relative overflow-hidden group">
      {/* Dynamic Background Accents */}
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] group-hover:bg-indigo-500/10 transition-colors duration-700" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] group-hover:bg-cyan-500/10 transition-colors duration-700" />
      
      {/* Header section */}
      <div className="flex justify-between items-start mb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
            <MapPin className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">{weather.city}</h2>
            <p className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">{weather.country}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Live Updates</p>
          <div className="flex items-center gap-1.5 justify-end">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(129,140,248,0.8)]" />
            <span className="text-[10px] font-mono text-[var(--text-muted)]">REFRESHED</span>
          </div>
        </div>
      </div>

      {/* Main Temp Row */}
      <div className="flex items-center justify-between mb-5 relative z-10">
        <div className="flex items-start gap-1">
          <span className="text-7xl font-light tracking-tighter text-white font-mono leading-none drop-shadow-2xl">
            {Math.round(weather.temperature)}
          </span>
          <span className="text-2xl text-[var(--text-muted)] font-mono mt-1 font-medium">
            °C
          </span>
        </div>
        <div className="flex flex-col items-center">
          {getWeatherIcon(weather.weatherCode, weather.isDay)}
          <span className="text-sm font-bold text-white mt-2 drop-shadow-md tracking-wide">
            {getWeatherDescription(weather.weatherCode)}
          </span>
        </div>
      </div>

      {/* Detailed Weather Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <Droplets className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">Humidity</p>
            <p className="text-sm font-mono text-white leading-none mt-1">{weather.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Wind className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">Wind</p>
            <p className="text-sm font-mono text-white leading-none mt-1">{weather.windSpeed.toFixed(1)} <span className="text-[10px]">km/h</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          <div className="p-1.5 rounded-lg bg-orange-500/10 text-orange-400">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">UV Index</p>
            <p className={cn("text-sm font-mono leading-none mt-1", uvInfo.color)}>{weather.uvIndex.toFixed(1)} <span className="text-[9px] font-sans font-bold uppercase ml-1 opacity-80">{uvInfo.label}</span></p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm">
          <div className="p-1.5 rounded-lg bg-slate-500/10 text-slate-400">
            <Gauge className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-tighter">Pressure</p>
            <p className="text-sm font-mono text-white leading-none mt-1">{Math.round(weather.pressure)} <span className="text-[10px]">hPa</span></p>
          </div>
        </div>
      </div>

      {/* Air Quality (AQI) Card - Full Width at bottom */}
      <div className="relative z-10">
        <div className="p-4 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-inner">
          <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">Air Quality (AQI)</span>
            </div>
            <span className={cn("text-xs font-black px-2 py-0.5 rounded-full uppercase tracking-tighter", aqiInfo.bg, aqiInfo.color)}>
              {aqiInfo.label}
            </span>
          </div>
          
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <span className="text-3xl font-mono text-white font-bold">{Math.round(weather.aqi)}</span>
              <p className="text-[9px] font-bold text-indigo-400 uppercase mt-0.5">European Index</p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase mb-0.5">PM2.5</p>
                <p className="text-xs font-mono text-white">{weather.pm2_5.toFixed(1)}</p>
              </div>
              <div className="text-right border-l border-white/10 pl-4">
                <p className="text-[9px] font-bold text-[var(--text-muted)] uppercase mb-0.5">PM10</p>
                <p className="text-xs font-mono text-white">{weather.pm10.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
