import type { ReactNode } from 'react';
import { Header } from './Header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'var(--gradient-night-glow)' }}></div>
      <div className="relative max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <Header />
        <main className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {children}
        </main>
      </div>
    </div>
  );
}
