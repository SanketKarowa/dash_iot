import { useState } from 'react';
import * as Switch from '@radix-ui/react-switch';
import { Lightbulb } from 'lucide-react';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { TOPICS } from '../../config/mqtt';

export function LedToggle() {
  const publish = useMqttPublish();
  const [isOn, setIsOn] = useState(false);

  const handleToggle = (checked: boolean) => {
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
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] transition-colors">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[var(--accent-primary)]" /> MRB LED Strip
        </span>
        <span className="text-sm text-[var(--text-secondary)]">Status: {isOn ? 'On (Manual)' : 'Off (Auto)'}</span>
      </div>
      
      <Switch.Root
        checked={isOn}
        onCheckedChange={handleToggle}
        className="w-14 h-7 rounded-full bg-slate-700/50 border border-[var(--border)] data-[state=checked]:bg-[var(--accent-primary)] data-[state=checked]:shadow-[0_0_12px_var(--accent-primary-glow)] transition-all flex items-center px-1 shrink-0 cursor-pointer"
      >
        <Switch.Thumb 
          className="block w-5 h-5 bg-[var(--text-muted)] data-[state=checked]:bg-white rounded-full transition-transform translate-x-0 data-[state=checked]:translate-x-7 shadow-sm"
        />
      </Switch.Root>
    </div>
  );
}
