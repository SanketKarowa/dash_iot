import React, { ReactNode } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
