import { motion } from 'framer-motion';
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

  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 128 128">
          <circle
            cx="64"
            cy="64"
            r={radius}
            stroke="var(--border)"
            strokeWidth="10"
            fill="none"
          />
          <motion.circle
            cx="64"
            cy="64"
            r={radius}
            stroke={color}
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ type: "spring", bounce: 0, duration: 1 }}
            style={{ strokeDasharray: circumference }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-mono text-lg xl:text-xl font-bold text-[var(--text-primary)]">
            {voltage !== null ? `${voltage.toFixed(1)}v` : '---'}
          </span>
        </div>
      </div>
      <div className="text-sm font-medium text-[var(--text-secondary)] whitespace-nowrap">⚡ {name}</div>
      <div className="text-xs text-[var(--text-muted)]">{min}-{max}v</div>
    </div>
  );
}
