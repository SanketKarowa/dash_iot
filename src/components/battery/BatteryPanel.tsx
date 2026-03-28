import { BatteryGauge } from './BatteryGauge';
import { GlassCard } from '../shared/GlassCard';
import { useMqttSubscription } from '../../hooks/useMqttSubscription';
import { TOPICS } from '../../config/mqtt';

export function BatteryPanel() {
  const b1 = useMqttSubscription(TOPICS.SUBSCRIBE.BATTERY_1);
  const b2 = useMqttSubscription(TOPICS.SUBSCRIBE.BATTERY_2);
  const b3 = useMqttSubscription(TOPICS.SUBSCRIBE.BATTERY_3);
  const b4 = useMqttSubscription(TOPICS.SUBSCRIBE.BATTERY_4);

  return (
    <GlassCard className="col-span-full">
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-primary)]">Battery Monitoring</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        <BatteryGauge name="LiFePo4_36" voltage={b1 ? parseFloat(b1) : null} min={10.5} max={14.5} />
        <BatteryGauge name="Li-ion_BATT" voltage={b2 ? parseFloat(b2) : null} min={9.0} max={12.6} />
        <BatteryGauge name="Li-ion-18" voltage={b3 ? parseFloat(b3) : null} min={12.5} max={17.0} />
        <BatteryGauge name="Li-ion_mrb" voltage={b4 ? parseFloat(b4) : null} min={10.0} max={12.6} />
      </div>
    </GlassCard>
  );
}
