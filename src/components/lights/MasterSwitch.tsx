import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Zap, Loader2 } from 'lucide-react';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { TOPICS } from '../../config/mqtt';

export function MasterSwitch() {
  const publish = useMqttPublish();
  const [isPending, setIsPending] = useState(false);

  const handleToggle = (checked: boolean) => {
    setIsPending(true);
    const payload = checked ? 'on' : 'off';
    publish(TOPICS.PUBLISH.RELAY_1_CMD, payload);
    publish(TOPICS.PUBLISH.RELAY_2_CMD, payload);
    publish(TOPICS.PUBLISH.RELAY_3_CMD, payload);
    
    // Safety timeout
    setTimeout(() => setIsPending(false), 2000);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--accent-primary)] bg-[var(--accent-primary-glow)] transition-colors mt-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]" /> Handy-Mains
          <span className="text-xs bg-amber-500 text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">Master</span>
        </span>
        <span className="text-sm text-[var(--text-secondary)]">
          {isPending ? (
            <span className="flex items-center gap-1.5 text-cyan-500 animate-pulse">Broadcasting...</span>
          ) : (
            'Controls all relays'
          )}
        </span>
      </div>
      
      <Switch.Root
        onCheckedChange={handleToggle}
        disabled={isPending}
        className="w-14 h-7 rounded-full bg-slate-800/80 border border-[var(--border)] data-[state=checked]:bg-[var(--accent-primary)] data-[state=checked]:shadow-[0_0_20px_var(--accent-primary-glow),0_0_40px_rgba(34,211,238,0.15)] data-[state=checked]:border-[var(--accent-primary-neon)] transition-all flex items-center px-1 shrink-0 cursor-pointer disabled:opacity-70 disabled:cursor-wait"
      >
        <Switch.Thumb 
          className="flex items-center justify-center w-5 h-5 bg-[var(--text-muted)] data-[state=checked]:bg-white rounded-full transition-transform translate-x-0 data-[state=checked]:translate-x-7 shadow-sm"
        >
          {isPending && <Loader2 className="w-3 h-3 text-slate-500 animate-spin" />}
        </Switch.Thumb>
      </Switch.Root>
    </div>
  );
}
