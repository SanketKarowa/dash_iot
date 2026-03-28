import { useState, useRef, useEffect } from 'react';
import * as Slider from '@radix-ui/react-slider';
import { useMqttSubscription } from '../../hooks/useMqttSubscription';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { Sun } from 'lucide-react';
import { TOPICS } from '../../config/mqtt';

export function BrightnessSlider() {
  const publish = useMqttPublish();
  const feedbackValue = useMqttSubscription(TOPICS.SUBSCRIBE.LED_1_BRIGHTNESS);

  const [localValue, setLocalValue] = useState<number[] | null>(null);
  const [isStable, setIsStable] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const stabilityTimerRef = useRef<NodeJS.Timeout | null>(null);
  const dragCountRef = useRef(0);

  // When dragging or in stability grace period, use local value.
  // Otherwise, derive from MQTT feedback.
  const mqttValue = feedbackValue !== null ? (() => {
    const parsed = parseInt(feedbackValue, 10);
    return !isNaN(parsed) ? [parsed] : [0];
  })() : [0];

  const displayValue = !isStable && localValue !== null ? localValue : mqttValue;

  const handleValueChange = (newVal: number[]) => {
    dragCountRef.current += 1;
    // Require a sustained 3 value changes to lock into drag mode.
    // This ignores microscopic trackpad/mouse jitters during a single tap.
    if (dragCountRef.current > 3) {
      setIsDragging(true);
    }

    setIsStable(false);
    setLocalValue(newVal);
    
    // Clear any existing timer if user starts dragging again
    if (stabilityTimerRef.current) {
      clearTimeout(stabilityTimerRef.current);
    }
  };

  const handleValueCommit = (newVal: number[]) => {
    setIsDragging(false);
    const val = newVal[0].toString();
    publish(TOPICS.PUBLISH.LED_1_CMD_BRIGHTNESS, val);
    publish(TOPICS.PUBLISH.LED_2_CMD_BRIGHTNESS, val);

    // Keep the local state for 2 seconds to allow MQTT round-trip time, avoiding jumps
    if (stabilityTimerRef.current) clearTimeout(stabilityTimerRef.current);
    stabilityTimerRef.current = setTimeout(() => {
      setIsStable(true);
      setLocalValue(null);
    }, 2000); 
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stabilityTimerRef.current) clearTimeout(stabilityTimerRef.current);
    };
  }, []);

  const transitionClass = !isDragging ? "transition-[left,right,transform] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]" : "";

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
        onPointerDown={() => { dragCountRef.current = 0; }}
        onPointerUp={() => { setIsDragging(false); }}
      >
        <Slider.Track className="relative bg-[var(--card-surface-hover)] flex-grow rounded-full h-[6px] overflow-hidden">
          <Slider.Range 
            className={`absolute h-full rounded-full ${transitionClass}`} 
            style={{ background: 'var(--gradient-slider)' }} 
          />
        </Slider.Track>
        <Slider.Thumb
          className={`block w-6 h-6 bg-[var(--text-primary)] shadow-[0_0_10px_var(--accent-primary-glow)] border-2 border-[var(--accent-primary)] rounded-full hover:bg-white focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-opacity-50 cursor-grab active:cursor-grabbing ${transitionClass}`}
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
