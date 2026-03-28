import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { useMqttPublish } from '../../hooks/useMqttPublish';
import { TOPICS } from '../../config/mqtt';

export function NightModeButton() {
  const publish = useMqttPublish();

  const handleNightMode = () => {
    publish(TOPICS.PUBLISH.LED_1_CMD_BRIGHTNESS, '1');
    publish(TOPICS.PUBLISH.LED_2_CMD_BRIGHTNESS, '1');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleNightMode}
      className="w-full flex items-center justify-center gap-3 p-4 rounded-xl text-white font-medium shadow-lg transition-all relative overflow-hidden group border border-transparent hover:border-[var(--accent-primary-light)]"
      style={{ background: 'var(--gradient-accent)' }}
    >
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <Moon className="w-5 h-5 text-white animate-pulse" />
      <span>Night Mode</span>
    </motion.button>
  );
}
