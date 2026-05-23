'use client';

import { forwardRef, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'inset';
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const variantClasses = {
  default: 'bg-[var(--bg-surface)] border border-[var(--border-soft)]',
  elevated: 'bg-[var(--bg-elevated)] border-2 border-[var(--border-sharp)]',
  inset: 'bg-[var(--bg-inset)] border border-[var(--border-soft)]',
};

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, variant = 'default', hoverable = false, padding = 'md', className, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverable ? {
          y: -2,
          boxShadow: 'var(--shadow-brutal)',
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        } : undefined}
        className={cn(
          'rounded-lg overflow-hidden',
          'transition-all duration-normal',
          hoverable && 'cursor-pointer',
          variantClasses[variant],
          paddingClasses[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';
