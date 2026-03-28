import { GlassCard } from '../shared/GlassCard';
import { LedToggle } from './LedToggle';
import { BrightnessSlider } from './BrightnessSlider';
import { NightModeButton } from '../scenes/NightModeButton';
import { Sparkles } from 'lucide-react';

export function LedControlPanel() {
  return (
    <GlassCard className="flex flex-col h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 shadow-[0_0_12px_rgba(139,92,246,0.15)]">
          <Sparkles className="w-5 h-5 text-violet-500" />
        </div>
        <h2 className="text-xl font-semibold text-[var(--text-primary)]">LED & Scene Control</h2>
      </div>
      <div className="flex flex-col gap-4 flex-grow">
        <LedToggle />
        <NightModeButton />
        <BrightnessSlider />
      </div>
    </GlassCard>
  );
}
