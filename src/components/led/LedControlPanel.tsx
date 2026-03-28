import { GlassCard } from '../shared/GlassCard';
import { LedToggle } from './LedToggle';
import { BrightnessSlider } from './BrightnessSlider';
import { NightModeButton } from '../scenes/NightModeButton';

export function LedControlPanel() {
  return (
    <GlassCard className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-6 text-[var(--text-primary)]">LED & Scene Control</h2>
      <div className="flex flex-col gap-4 flex-grow">
        <LedToggle />
        <NightModeButton />
        <BrightnessSlider />
      </div>
    </GlassCard>
  );
}
