import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { useMqttSubscription } from '../../hooks/useMqttSubscription';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { Sun } from 'lucide-react';
import { TOPICS } from '../../config/mqtt';

export function BrightnessSlider() {
  const publish = useMqttPublish();
  const feedbackValue = useMqttSubscription(TOPICS.SUBSCRIBE.LED_1_BRIGHTNESS);

  const [localValue, setLocalValue] = useState<number[] | null>(null);

  // When dragging, use local value. Otherwise, derive from MQTT feedback.
  const mqttValue = feedbackValue !== null ? (() => {
    const parsed = parseInt(feedbackValue, 10);
    return !isNaN(parsed) ? [parsed] : [0];
  })() : [0];

  const displayValue = localValue ?? mqttValue;

  const handleValueChange = (newVal: number[]) => {
    setLocalValue(newVal);
  };

  const handleValueCommit = (newVal: number[]) => {
    setLocalValue(null);
    const val = newVal[0].toString();
    publish(TOPICS.PUBLISH.LED_1_CMD_BRIGHTNESS, val);
    publish(TOPICS.PUBLISH.LED_2_CMD_BRIGHTNESS, val);
  };

  return (
    <div className="flex flex-col gap-3 mt-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)]">
      <div className="flex justify-between items-center">
        <span className="font-medium text-[var(--text-primary)] flex items-center gap-2">
          <Sun className="w-4 h-4 text-[var(--accent-primary)]" /> LED Brightness
        </span>
        <span className="font-mono text-sm font-bold text-[var(--text-accent)]">{displayValue[0]}</span>
      </div>
      
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5 mt-2"
        value={displayValue}
        max={255}
        step={1}
        onValueChange={handleValueChange}
        onValueCommit={handleValueCommit}
      >
        <Slider.Track className="relative bg-[var(--card-surface-hover)] flex-grow rounded-full h-[6px] overflow-hidden">
          <Slider.Range className="absolute h-full rounded-full" style={{ background: 'var(--gradient-slider)' }} />
        </Slider.Track>
        <Slider.Thumb
          className="block w-6 h-6 bg-[var(--text-primary)] shadow-[0_0_10px_var(--accent-primary-glow)] border-2 border-[var(--accent-primary)] rounded-full hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-50 transition-colors cursor-grab active:cursor-grabbing"
          aria-label="Brightness"
        />
      </Slider.Root>
      <div className="flex justify-between text-xs text-[var(--text-muted)] px-1">
        <span>0</span>
        <span>255</span>
      </div>
    </div>
  );
}
