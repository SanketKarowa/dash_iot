import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div className={cn("glass-card rounded-2xl p-6 relative overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}
