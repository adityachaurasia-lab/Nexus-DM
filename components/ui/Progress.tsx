'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface ProgressProps {
  value: number;
  variant?: 'default' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
};

export function Progress({ value, variant = 'default', size = 'md', showLabel = false, className }: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn('w-full flex flex-col gap-1.5', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs font-semibold text-[var(--text-secondary)]">
          <span>Progress</span>
          <span>{clampedValue}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cn(
          'w-full bg-[var(--bg-inset)] border border-[var(--border-soft)] rounded-full overflow-hidden',
          sizeClasses[size]
        )}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          className={cn(
            'h-full rounded-full',
            variant === 'gradient' ? 'bg-[var(--gradient-hero)]' : 'bg-[var(--accent-primary)]'
          )}
        />
      </div>
    </div>
  );
}
