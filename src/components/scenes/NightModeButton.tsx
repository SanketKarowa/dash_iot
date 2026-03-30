import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { TOPICS } from '../../config/mqtt';
import { GlassCard } from '../shared/GlassCard';

export function NightModeButton() {
  const publish = useMqttPublish();

  const handleNightMode = () => {
    publish(TOPICS.PUBLISH.LED_1_CMD_BRIGHTNESS, '1');
    publish(TOPICS.PUBLISH.LED_2_CMD_BRIGHTNESS, '1');
    publish(TOPICS.PUBLISH.LED_1_MODE, 'manual');
    publish(TOPICS.PUBLISH.LED_2_MODE, 'manual');
  };

  return (
    <motion.button
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleNightMode}
      className="w-full text-left"
    >
      <GlassCard className="group relative overflow-hidden p-0 border border-[var(--border)] hover:border-[var(--accent-primary)] transition-all duration-300">
        <div className="flex items-center justify-between p-4 bg-[var(--bg-elevated)] group-hover:bg-[var(--card-surface-hover)] transition-colors duration-500">
          <div className="flex items-center gap-4">
            <div className="p-2.5 rounded-xl bg-[var(--card-surface-hover)] border border-[var(--border)] group-hover:border-[var(--accent-primary-neon)] transition-all duration-500 shadow-sm">
              <Moon className="w-5 h-5 text-[var(--accent-primary)] group-hover:rotate-12 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-[var(--text-primary)]">
                Night Scene
              </span>
              <span className="text-xs text-[var(--text-secondary)]">Set minimum brightness</span>
            </div>
          </div>
          
          <div className="flex items-center justify-center p-2 rounded-lg bg-[var(--bg-elevated)] group-hover:bg-[var(--accent-primary-glow)] border border-[var(--border)] group-hover:border-[var(--accent-primary-neon)] transition-all duration-500">
             <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-muted)] group-hover:bg-[var(--accent-primary-neon)] transition-colors animate-pulse" />
          </div>
        </div>
      </GlassCard>
    </motion.button>
  );
}
