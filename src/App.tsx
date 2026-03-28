import { MqttProvider } from './providers/MqttProvider';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { BatteryPanel } from './components/battery/BatteryPanel';
import { MainsIndicator } from './components/mains/MainsIndicator';
import { LightControlPanel } from './components/lights/LightControlPanel';
import { LedControlPanel } from './components/led/LedControlPanel';

function App() {
  return (
    <MqttProvider>
      <DashboardLayout>
        {/* Top level spans full width on large screens */}
        <BatteryPanel />
        
        {/* Next row of cards */}
        <div className="col-span-1 xl:col-span-1">
          <MainsIndicator />
        </div>
        <div className="col-span-1 xl:col-span-1">
          <LightControlPanel />
        </div>
        <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <LedControlPanel />
        </div>
      </DashboardLayout>
    </MqttProvider>
  );
}

export default App;
