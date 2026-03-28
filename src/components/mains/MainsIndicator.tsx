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
    <GlassCard className="flex flex-col justify-center h-fit p-4 lg:p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.15)]">
          <Activity className="w-4 h-4 text-cyan-500" />
        </div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Mains Status</h2>
      </div>
      
      <div className="flex items-center gap-3">
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
