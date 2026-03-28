import { useMqttSubscription } from '../../hooks/useMqttSubscription';
import { TOPICS } from '../../config/mqtt';
import { GlassCard } from '../shared/GlassCard';
import { Activity } from 'lucide-react';
import { cn } from '../shared/GlassCard';

export function MainsIndicator() {
  const mainsStatus = useMqttSubscription(TOPICS.SUBSCRIBE.MAINS);
  
  const isOn = mainsStatus === 'ON';
  const isUnknown = mainsStatus === null;

  return (
    <GlassCard className="flex flex-col justify-center h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">Mains Power</h2>
        <Activity className="w-5 h-5 text-[var(--text-secondary)]" />
      </div>
      
      <div className="flex items-center gap-4">
        <div 
          className={cn(
            "w-4 h-4 rounded-full transition-all duration-300",
            isOn ? "bg-[var(--color-success)] shadow-[0_0_16px_var(--color-success-glow)] animate-pulse" :
            isUnknown ? "bg-[var(--text-muted)]" : "bg-[var(--color-warning)]"
          )}
        />
        <span className="text-2xl font-mono tracking-wider">
          {isOn ? (
            <span className="text-[var(--color-success)] drop-shadow-[0_0_12px_var(--color-success-glow)] font-bold">ON</span>
          ) : isUnknown ? (
            <span className="text-[var(--text-muted)] font-bold">---</span>
          ) : (
            <span className="text-[var(--color-warning)] font-bold">OFF</span>
          )}
        </span>
      </div>
    </GlassCard>
  );
}
