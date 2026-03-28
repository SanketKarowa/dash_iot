import { GlassCard } from '../shared/GlassCard';
import { LightSwitch } from './LightSwitch';
import { MasterSwitch } from './MasterSwitch';
import { TOPICS } from '../../config/mqtt';
import { Lightbulb } from 'lucide-react';
import { useMqttSubscription } from '../../hooks/useMqttSubscription';

export function LightControlPanel() {
  const r1 = useMqttSubscription(TOPICS.SUBSCRIBE.RELAY_1_STATUS);
  const r2 = useMqttSubscription(TOPICS.SUBSCRIBE.RELAY_2_STATUS);
  const r3 = useMqttSubscription(TOPICS.SUBSCRIBE.RELAY_3_STATUS);

  const activeCount = [r1, r2, r3].filter(s => s?.toLowerCase() === 'on').length;

  return (
    <GlassCard className="flex flex-col h-full relative overflow-hidden group">
      {/* Decorative background element */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/10 transition-colors duration-500" />
      
      <div className="flex justify-between items-start mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
            <Lightbulb className="w-5 h-5 text-amber-500" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Light Controls</h2>
            <p className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest mt-0.5">Relay Management</p>
          </div>
        </div>

        <div className="bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <span className="text-xs font-bold text-amber-500">
            {activeCount > 0 ? `${activeCount} Active` : 'All Off'}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 relative z-10">
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

      <div className="mt-5 pt-5 border-t border-white/10 relative z-10">
        <MasterSwitch />
      </div>
    </GlassCard>
  );
}
