import * as Switch from '@radix-ui/react-switch';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { TOPICS } from '../../config/mqtt';

export function MasterSwitch() {
  const publish = useMqttPublish();

  const handleToggle = (checked: boolean) => {
    const payload = checked ? 'on' : 'off';
    publish(TOPICS.PUBLISH.RELAY_1_CMD, payload);
    publish(TOPICS.PUBLISH.RELAY_2_CMD, payload);
    publish(TOPICS.PUBLISH.RELAY_3_CMD, payload);
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-[var(--accent-primary)] bg-[var(--accent-primary-glow)] transition-colors mt-4">
      <div className="flex flex-col gap-1">
        <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
          🔧 Handy-Mains
          <span className="text-xs bg-[var(--accent-primary)] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">Master</span>
        </span>
        <span className="text-sm text-[var(--text-secondary)]">Controls all relays</span>
      </div>
      
      <Switch.Root
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
