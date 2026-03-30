import { useMqttSubscription } from '../../hooks/useMqttSubscription';
import { TOPICS } from '../../config/mqtt';
import { GlassCard } from '../shared/GlassCard';
import { Activity } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export function MainsIndicator() {
  const rawStatus = useMqttSubscription(TOPICS.SUBSCRIBE.MAINS);
  const mainsStatus = rawStatus?.toUpperCase();
  
  const isOn = mainsStatus === 'ON';
  const isUnknown = mainsStatus === undefined || mainsStatus === null;

  return (
    <GlassCard className="flex flex-col justify-center h-fit p-4 lg:p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 shadow-[0_0_8px_rgba(6,182,212,0.15)]">
          <Activity className="w-4 h-4 text-cyan-500" />
        </div>
        <h2 className="text-lg font-semibold text-[var(--text-primary)]">Mains Status</h2>
      </div>
      
      <div className="flex items-center gap-3 relative">
        <div className="relative flex items-center justify-center w-6 h-6">
          <AnimatePresence mode="wait">
            {isOn && (
              <motion.div
                key="breathing-glow"
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: [1, 1.6, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-[var(--color-success)] blur-md"
              />
            )}
          </AnimatePresence>
          
          <motion.div 
            animate={isOn ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={cn(
              "w-4 h-4 rounded-full transition-colors duration-500 relative z-10",
              isOn ? "bg-[var(--color-success)] shadow-[0_0_12px_var(--color-success-glow)]" :
              isUnknown ? "bg-[var(--text-muted)]" : "bg-[var(--color-warning)] shadow-[0_0_8px_var(--color-warning-glow)]"
            )}
          />
        </div>

        <span className="text-2xl font-mono tracking-wider ml-1">
          {isOn ? (
            <span className="text-[var(--color-success)] drop-shadow-[0_0_12px_var(--color-success-glow)] font-bold">ON</span>
          ) : isUnknown ? (
            <span className="text-[var(--text-muted)] font-bold">---</span>
          ) : (
            <span className="text-[var(--color-warning)] font-bold">OFF</span>
          )}
        </span>
      </div>
    </GlassCard>
  );
}
