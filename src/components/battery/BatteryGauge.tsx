import { motion } from 'framer-motion';
import { Battery } from 'lucide-react';
import { getBatteryColor } from '../../utils/batteryColor';

interface BatteryGaugeProps {
  name: string;
  voltage: number | null;
  min: number;
  max: number;
}

export function BatteryGauge({ name, voltage, min, max }: BatteryGaugeProps) {
  const v = voltage ?? min; 
  const percentage = Math.max(0, Math.min(100, ((v - min) / (max - min)) * 100));
  const color = getBatteryColor(v, min, max);

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Vertical Glass Battery Container */}
      <div className="relative flex flex-col items-center">
        {/* Top Terminal */}
        <div className="w-8 h-2.5 rounded-t-md bg-[var(--text-muted)] opacity-50 z-10" />
        
        {/* Main Glass Body */}
        <div 
          className="relative w-20 h-36 rounded-[14px] bg-[var(--bg-elevated)] overflow-hidden flex items-end justify-center p-1.5"
          style={{ 
            border: '1.5px solid var(--border)', 
            boxShadow: 'inset 0 4px 16px rgba(0,0,0,0.6)' 
          }}
        >
          {/* Glossy Glass Highlight (Left side curve) */}
          <div className="absolute inset-y-0 left-0 w-2/5 bg-gradient-to-r from-white/10 to-transparent mix-blend-overlay z-20 pointer-events-none rounded-l-[12px]" />
          
          {/* Container for Liquid & Waves to ensure horizontal clipping without vertical clipping for crests */}
          <div className="absolute bottom-1.5 left-1.5 right-1.5 top-1.5 overflow-hidden rounded-[10px]">
            {/* Animated Liquid Level */}
            <motion.div
              className="w-full absolute bottom-0 left-0 flex flex-col justify-start origin-bottom z-0"
              style={{ 
                backgroundColor: color,
                boxShadow: `0 0 24px 0 ${color}60, inset 0 2px 8px rgba(255,255,255,0.4)`,
                borderRadius: percentage > 95 ? '8px' : '2px 2px 8px 8px'
              }}
              initial={{ height: '0%' }}
              animate={{ height: `${percentage}%` }}
              transition={{ type: "spring", bounce: 0, duration: 1.5, delay: 0.1 }}
            >
              {/* Waves - Refined with blend modes and blur for natural liquid shimmer */}
              <div className="absolute top-0 left-0 w-[200%] h-6 -mt-3.5 z-10 pointer-events-none blur-[1px]">
                {/* Back Wave */}
                <motion.div 
                  className="absolute top-0 left-0 w-full h-full flex" 
                  animate={{ x: ["-50%", "0%"] }} 
                  transition={{ repeat: Infinity, ease: "linear", duration: 5 }}
                >
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-full w-1/2 opacity-20" fill="white" style={{ mixBlendMode: 'overlay' }}>
                    <path d="M 0 10 C 50 20, 50 0, 100 10 C 150 20, 150 0, 200 10 L 200 20 L 0 20 Z" />
                  </svg>
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-full w-1/2 opacity-20" fill="white" style={{ mixBlendMode: 'overlay' }}>
                    <path d="M 0 10 C 50 20, 50 0, 100 10 C 150 20, 150 0, 200 10 L 200 20 L 0 20 Z" />
                  </svg>
                </motion.div>
                
                {/* Front Wave */}
                <motion.div 
                  className="absolute top-1 left-0 w-full h-full flex" 
                  animate={{ x: ["0%", "-50%"] }} 
                  transition={{ repeat: Infinity, ease: "linear", duration: 3 }}
                >
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-full w-1/2 opacity-30" fill="white" style={{ mixBlendMode: 'soft-light' }}>
                    <path d="M 0 10 C 50 20, 50 0, 100 10 C 150 20, 150 0, 200 10 L 200 20 L 0 20 Z" />
                  </svg>
                  <svg viewBox="0 0 200 20" preserveAspectRatio="none" className="h-full w-1/2 opacity-30" fill="white" style={{ mixBlendMode: 'soft-light' }}>
                    <path d="M 0 10 C 50 20, 50 0, 100 10 C 150 20, 150 0, 200 10 L 200 20 L 0 20 Z" />
                  </svg>
                </motion.div>
              </div>

              <div className="w-full h-full bg-gradient-to-b from-white/10 to-black/30 relative overflow-hidden">
                {/* Rising Bubbles - Enhanced Visibility */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute bottom-0 rounded-full bg-white/40"
                    style={{
                      left: `${10 + i * 12}%`,
                      width: `${3 + (i % 4)}px`,
                      height: `${3 + (i % 4)}px`,
                      boxShadow: '0 0 6px rgba(255,255,255,0.3)',
                    }}
                    animate={{
                      y: [0, -160],
                      x: [0, (i % 2 === 0 ? 5 : -5), 0], // Subtle horizontal wobble
                      opacity: [0, 0.7, 0],
                      scale: [0.8, 1.3, 0.5],
                    }}
                    transition={{
                      duration: 2.5 + (i * 0.4) % 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Centered Percentage Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
             <span className="text-xl font-bold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
               {Math.round(percentage)}%
             </span>
          </div>
        </div>
      </div>
      
      {/* Labels below the battery cell */}
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-mono text-xl font-bold text-[var(--text-primary)] tracking-tight">
          {voltage !== null ? `${voltage.toFixed(2)}V` : '---'}
        </span>
        <div className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap flex items-center gap-1.5 mt-1.5">
          <Battery className="w-4 h-4" style={{ color }} /> {name}
        </div>
        <div className="text-xs text-[var(--text-muted)] tracking-wider mt-0.5">{min}-{max}V</div>
      </div>
    </div>
  );
}
