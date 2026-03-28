import { useTheme } from '../../hooks/useTheme';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border)] bg-[var(--card-surface)] hover:bg-[var(--card-surface-hover)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ y: -15, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 15, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.15 }}
          className="absolute"
        >
          {theme === 'dark' ? (
            <Moon className="w-5 h-5 text-[var(--accent-primary-light)]" />
          ) : (
            <Sun className="w-5 h-5 text-[var(--accent-primary)]" />
          )}
        </motion.div>
      </AnimatePresence>
    </button>
  );
}
