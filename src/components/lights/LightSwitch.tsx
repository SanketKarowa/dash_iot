import { useState, useEffect } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useMqttSubscription } from '../../hooks/useMqttSubscription';
import { useMqttPublish } from '../../hooks/useMqttPublish';

interface LightSwitchProps {
  name: string;
  commandTopic: string;
  statusTopic: string;
}

export function LightSwitch({ name, commandTopic, statusTopic }: LightSwitchProps) {
  const status = useMqttSubscription(statusTopic);
  const publish = useMqttPublish();
  const [isPending, setIsPending] = useState(false);

  const isOn = status?.toLowerCase() === 'on';

  // Clear pending state when actual status matches our local expectation
  useEffect(() => {
    if (isPending) {
      setIsPending(false);
    }
  }, [status]);

  const handleToggle = (checked: boolean) => {
    setIsPending(true);
    const payload = checked ? 'on' : 'off';
    publish(commandTopic, payload);
    
    // Safety timeout in case MQTT message is lost
    setTimeout(() => setIsPending(false), 3000);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-colors">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
          <Lightbulb 
            className={`w-4 h-4 transition-all duration-500 ${
              isOn 
                ? "text-amber-400 drop-shadow-[0_0_10px_rgba(251,191,36,0.6)] fill-amber-400/30" 
                : "text-amber-700/60 fill-amber-700/10 drop-shadow-[0_0_2px_rgba(217,119,6,0.2)]"
            }`} 
          /> {name}
        </span>
        <span className="text-sm text-[var(--text-secondary)]">
          {isPending ? (
            <span className="flex items-center gap-1.5 text-cyan-500 animate-pulse">Updating...</span>
          ) : (
            `Status: ${status ? (isOn ? 'On' : 'Off') : '---'}`
          )}
        </span>
      </div>
      
      <Switch.Root
        checked={isOn}
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
