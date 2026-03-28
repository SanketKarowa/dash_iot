import { GlassCard } from '../shared/GlassCard';
import { LightSwitch } from './LightSwitch';
import { MasterSwitch } from './MasterSwitch';
import { TOPICS } from '../../config/mqtt';

export function LightControlPanel() {
  return (
    <GlassCard className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-primary)]">Light Controls</h2>
      <div className="flex flex-col gap-4 flex-grow">
        <LightSwitch 
          name="Indoors"
          commandTopic={TOPICS.PUBLISH.RELAY_1_CMD}
          statusTopic={TOPICS.SUBSCRIBE.RELAY_1_STATUS}
        />
        <LightSwitch 
          name="Outdoors"
          commandTopic={TOPICS.PUBLISH.RELAY_2_CMD}
          statusTopic={TOPICS.SUBSCRIBE.RELAY_2_STATUS}
        />
        <LightSwitch 
          name="Corridors"
          commandTopic={TOPICS.PUBLISH.RELAY_3_CMD}
          statusTopic={TOPICS.SUBSCRIBE.RELAY_3_STATUS}
        />
      </div>
      <div className="mt-4 pt-4 border-t border-[var(--border)]">
        <MasterSwitch />
      </div>
    </GlassCard>
  );
}
