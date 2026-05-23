import { type ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--bg-inset)] text-[var(--text-secondary)] border-[var(--border-soft)]',
  success: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  warning: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',
  error: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20',
  info: 'bg-[var(--accent-secondary)]/10 text-[var(--accent-secondary)] border-[var(--accent-secondary)]/20',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs gap-1',
  md: 'px-2.5 py-0.5 text-sm gap-1.5',
};

export function Badge({ children, variant = 'default', size = 'sm', dot = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium border rounded-full transition-colors',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full bg-current',
            variant === 'success' && 'animate-pulse'
          )}
        />
      )}
      {children}
    </span>
  );
}
