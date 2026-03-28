import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock } from 'lucide-react';

export function TimeLabel() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });

  const formattedTime = time.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex flex-col items-end mr-2">
      <div className="flex items-center gap-2 text-[var(--text-primary)] font-mono text-sm sm:text-base font-bold tracking-tight">
        <Clock className="w-4 h-4 text-[var(--accent-primary)] animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.span
            key={formattedTime}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {formattedTime}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-[10px] uppercase font-bold tracking-widest text-[var(--text-secondary)] mt-px">
        {formattedDate}
      </span>
    </div>
  );
}
