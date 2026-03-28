import { Home, Wifi, WifiOff, Loader } from 'lucide-react';
import { useMqttContext } from '../../providers/MqttProvider';
import { ThemeToggle } from '../shared/ThemeToggle';
import { TimeLabel } from '../shared/TimeLabel';

export function Header() {
  const { status } = useMqttContext();

  return (
    <header className="flex items-center justify-between mb-8 px-2">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-[var(--accent-primary-glow)] border border-[var(--border)] shadow-[0_0_16px_var(--accent-primary-glow)]">
          <Home className="w-6 h-6 text-[var(--accent-primary)]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Solar-Home</h1>
          <p className="text-sm font-medium text-[var(--text-secondary)]">IoT Automation Dashboard</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Time and Date Display */}
        <TimeLabel />

        {/* Status indicator */}
        <div className="flex items-center gap-2 bg-[var(--bg-elevated)] px-4 py-2 rounded-full border border-[var(--border)] shadow-sm">
          {status === 'connected' && (
            <>
              <Wifi className="w-4 h-4 text-[var(--color-success)] drop-shadow-[0_0_8px_var(--color-success-glow)]" />
              <span className="text-sm font-medium text-[var(--color-success)] hidden sm:block">Connected</span>
            </>
          )}
          {status === 'disconnected' && (
            <>
              <WifiOff className="w-4 h-4 text-[var(--color-danger)] drop-shadow-[0_0_8px_var(--color-danger-glow)]" />
              <span className="text-sm font-medium text-[var(--color-danger)] hidden sm:block">Offline</span>
            </>
          )}
          {(status === 'connecting' || status === 'reconnecting') && (
            <>
              <Loader className="w-4 h-4 text-[var(--color-warning)] animate-spin" />
              <span className="text-sm font-medium text-[var(--text-muted)] hidden sm:block">
                {status === 'connecting' ? 'Connecting...' : 'Reconnecting...'}
              </span>
            </>
          )}
        </div>
        
        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
