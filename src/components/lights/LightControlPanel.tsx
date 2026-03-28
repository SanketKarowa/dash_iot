import { GlassCard } from '../shared/GlassCard';
import { LightSwitch } from './LightSwitch';
import { MasterSwitch } from './MasterSwitch';
import { TOPICS } from '../../config/mqtt';
import { Lightbulb } from 'lucide-react';

export function LightControlPanel() {
  return (
    <GlassCard className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.15)]">
          <Lightbulb className="w-5 h-5 text-amber-500" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Light Controls</h2>
      </div>
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
