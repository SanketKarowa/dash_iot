import { MqttProvider } from './providers/MqttProvider';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { BatteryPanel } from './components/battery/BatteryPanel';
import { MainsIndicator } from './components/mains/MainsIndicator';
import { LightControlPanel } from './components/lights/LightControlPanel';
import { LedControlPanel } from './components/led/LedControlPanel';
import { WeatherWidget } from './components/weather/WeatherWidget';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MqttProvider>
        <DashboardLayout>
          {/* Top level spans full width on large screens */}
          <BatteryPanel />
          
          {/* Next row of cards */}
          <div className="col-span-1 xl:col-span-1 flex flex-col gap-6 h-full">
            <MainsIndicator />
            <div className="flex-grow">
              <WeatherWidget />
            </div>
          </div>
          <div className="col-span-1 xl:col-span-1 h-full">
            <LightControlPanel />
          </div>
          <div className="col-span-1 md:col-span-2 xl:col-span-1">
            <LedControlPanel />
          </div>
        </DashboardLayout>
      </MqttProvider>
    </QueryClientProvider>
  );
}

export default App;
