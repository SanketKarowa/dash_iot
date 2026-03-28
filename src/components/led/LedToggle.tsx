import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Lightbulb, Loader2 } from 'lucide-react';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { TOPICS } from '../../config/mqtt';

export function LedToggle() {
  const publish = useMqttPublish();
  const [isOn, setIsOn] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleToggle = (checked: boolean) => {
    setIsPending(true);
    setIsOn(checked);
    const payload = checked ? 'ON' : 'OFF';
    publish(TOPICS.PUBLISH.LED_1_CMD_STATE, payload);
    publish(TOPICS.PUBLISH.LED_2_CMD_STATE, payload);
    
    // Manual mode overrides auto
    if (checked) {
      publish(TOPICS.PUBLISH.LED_1_MODE, 'manual');
      publish(TOPICS.PUBLISH.LED_2_MODE, 'manual');
      publish(TOPICS.PUBLISH.LED_1_CMD_BRIGHTNESS, '100');
      publish(TOPICS.PUBLISH.LED_2_CMD_BRIGHTNESS, '100');
    } else {
      publish(TOPICS.PUBLISH.LED_1_MODE, 'auto');
      publish(TOPICS.PUBLISH.LED_2_MODE, 'auto');
    }

    // Since LED toggle might not have a direct status feedback check yet, 
    // we use a reasonable timeout to clear the loading state.
    setTimeout(() => setIsPending(false), 1500);
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
          /> MRB LED Strip
        </span>
        <span className="text-sm text-[var(--text-secondary)]">
          {isPending ? (
            <span className="flex items-center gap-1.5 text-cyan-500 animate-pulse">Processing...</span>
          ) : (
            `Status: ${isOn ? 'On (Manual)' : 'Off (Auto)'}`
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
